<template>
	<view class="detail"> 
		<view class="fixbg" :style="{'background-image': 'url('+ songDetail.al.picUrl +')'}"></view>
		<music-head :title="songDetail.name" icon="true" color="white"></music-head>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handleToPlay">
					<image :src="songDetail.al.picUrl" :class="{'detail-play-run': isPlayRotate}" mode=""></image>
					<text class="iconfont" :class="iconPlay"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{transform: 'translateY(' +  - (lyricIndex - 1) * 82  + 'rpx)'}">
						<!-- <view class="detail-lyric-item">测试文字</view> -->
						<view class="detail-lyric-item" 
							  v-for="(item, index) in songLyric" 
						      :key="index"
							  :class="{ active: lyricIndex == index}"
						>
							{{item.lyric}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button  class="detail-share" open-type="share">
					<text class="iconfont icon-fenxiang"></text>分享给微信好友
				<!-- #endif -->
				</button>
				<!-- <view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也喜欢</view>
					<view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								石白其-蓝
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view> -->
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也喜欢</view>
					<view class="detail-like-item" 
						  v-for="(item,index) in songSimi" 
						  :key="index" 
						  @tap="handleToSimi(item.id)"
					>
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70" src="../../static/dujia.png" mode=""></image>
								<image v-if="item.privilege.maxbr == 999000" src="../../static/sq.png" mode=""></image>
								{{item.artists[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<!-- <view class="detail-comment">
					<view class="detail-comment-title">精彩评论</view>
					<view class="detail-comment-item">
						<view class="detail-comment-img">
							<image src="../../static/wangyiyunyinyue.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-head">
								<view class="detail-comment-name">
									<view>是啊冗的冗</view>
									<view>2020年1月2日</view>
								</view>
								<view class="detail-comment-like">
									56026 <text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view>
				</view> -->
				<view class="detail-comment">
					<view class="detail-comment-title">精彩评论</view>
					<view class="detail-comment-item" v-for="(item, index) in songComment" :key="index">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-head">
								<view class="detail-comment-name">
									<view>{{item.user.nickname}}</view>
									<view>{{item.time | formatTime}}</view>
								</view>
								<view class="detail-comment-like">
									{{item.likedCount | formatCount}}
									<text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {songDetail, songSimi, songComment, songLyric, songUrl} from '../../common/api.js'
	export default {
		data() {
			return {
				songDetail: {
					al: {
						picUrl: '' // 先设置默认值，防止数据未出来时报错
					} 
				},
				songSimi: [],
				songComment: [],
				songLyric: [],
				lyricIndex : 0,
				iconPlay: 'icon-zanting',
				isPlayRotate: true,
				isLoading: true,
			}
		},
		onLoad(options) {
			console.log('options.songId',options.songId);
			this.getMusic(options.songId)
		},
		onUnload(){
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioMannager.destroy();   // 销毁bgAudioMannager实例
			// #endif
		},
		onHide(){
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioMannager.destroy();
			// #endif
		},
		methods: {
			getMusic(songId) {
				this.$store.commit('NEXT_ID', songId); // 获取下一首歌的songId
				uni.showLoading({
					title: '加载中...'
				})
				this.isLoading = true;
				Promise.all([songDetail(songId), songSimi(songId), songComment(songId), songLyric(songId), songUrl(songId)]).then(res => {
					console.log('Promise.all', res);
					if(res[0][1].data.code == '200'){
						this.songDetail = res[0][1].data.songs[0];
					}
					if(res[1][1].data.code == '200'){
						this.songSimi = res[1][1].data.songs;
					}
					if(res[2][1].data.code == '200'){
						this.songComment = res[2][1].data.hotComments;
					}
					if(res[3][1].data.code == '200'){
						let lyric = res[3][1].data.lrc.lyric;
						console.log('lyric', lyric)
						let result = [];
						let re = /\[([^\]]+)\]([^[]+)/g;
						lyric.replace(re,($0,$1,$2)=>{
							// console.log('$0', $0) 时间与歌词
							console.log('$1', $1) // 时间
							console.log('$2', $2) // 歌词
							result.push({ "time": this.formatTimeToSec($1) , "lyric": $2 });
						}); 
						this.songLyric = result;
						console.log('this.songLyric', this.songLyric);
					}
					if(res[4][1].data.code == '200'){
						// console.log('res[4][1].data', res[4][1].data)					
						// #ifdef MP-WEIXIN
						this.bgAudioMannager = uni.getBackgroundAudioManager();
						this.bgAudioMannager.title = this.songDetail.name;
						// #endif
						
						// #ifdef H5
						if(!this.bgAudioMannager){
							this.bgAudioMannager = uni.createInnerAudioContext();
						}
						this.iconPlay = 'icon-yunhang';
						this.isPlayRotate = false;
						// #endif
						
						this.bgAudioMannager.src = res[4][1].data.data[0].url || '';
						this.listenLyricIndex();
						this.bgAudioMannager.onPlay(()=>{
							this.iconPlay = 'icon-zanting';
							this.isPlayRotate = true;	
							this.listenLyricIndex();
						});
						this.bgAudioMannager.onPause(()=>{
							this.iconPlay = 'icon-yunhang';
							this.isPlayRotate = false;
						});
						this.bgAudioMannager.onEnded(() => {
							this.getMusic(this.$store.nextId);
						})
					}	
					this.isLoading = false;
					uni.hideLoading();
				})
			},
			formatTimeToSec(time){
				var arr = time.split(':');
				return (Number(arr[0]* 60) + Number(arr[1])).toFixed(1);
			},
			handleToPlay() {
				if(this.bgAudioMannager.paused) {
					this.bgAudioMannager.play();
				} else {
					this.bgAudioMannager.pause();
				}
			},
			listenLyricIndex(){
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					for(var i = 0;i < this.songLyric.length;i++){
						if(this.bgAudioMannager.currentTime > this.songLyric[this.songLyric.length-1].time){ 
							this.lyricIndex = this.songLyric.length-1;
							break;
						}
						if(this.bgAudioMannager.currentTime > this.songLyric[i].time &&
						   this.bgAudioMannager.currentTime < this.songLyric[i+1].time){
							this.lyricIndex = i; 
						}
					}
				}, 500);
			},
			cancelLyricIndex(){
				clearInterval(this.timer);
			},
			handleToSimi(songId){
				this.getMusic(songId);
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail-play {
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size:cover; 
		margin:210rpx auto 44rpx auto;
		position: relative;
		image {
			width: 370rpx;
			height: 370rpx;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			animation: 10s linear infinite move; 
			animation-play-state: paused;
		}
		.detail-play-run{ 
			animation-play-state: running;
		}
		text {
			width: 100rpx;
			height: 100rpx;
			font-size: 100rpx;
			color: white;	
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
		view {
			position: absolute; 
			width:200rpx; 
			height:300rpx; 
			position: absolute; 
			left:60rpx; 
			right:0;  
			margin:auto; 
			top:-170rpx; 
			background:url(~@/static/needle.png); 
			background-size:cover;
		}
	} 
	@keyframes move{
		from{ transform : rotate(0deg);}
		to{ transform : rotate(360deg);}
	}
	.detail-lyric {
		height:246rpx; 
		line-height: 82rpx; 
		font-size:32rpx; 
		text-align: center; 
		color:#949495; 
		overflow: hidden;
		.detail-lyric-wrap{ 
			transition: .5s;
			.detail-lyric-item{
				height:82rpx;
				
			}
			.detail-lyric-item.active{
				color:white;
		    }
		}
	}
	.detail-share {
		width: 330rpx; 
		height: 72rpx; 
		margin:0 auto; 
		background: rgba(0,0,0,0.4); 
		text-align: center; 
		line-height: 72rpx; 
		font-size: 26rpx; 
		color:white; 
		border-radius: 36rpx;
		text{ 
			margin-right: 15rpx;
		}
	}
	.detail-like {
		margin: 0 32rpx;
		.detail-like-head {
			font-size: 36rpx; 
			color: white; 
			margin: 50rpx 0;
		}
		.detail-like-item {
			 display: flex; 
			 margin-bottom: 38rpx; 
			 align-items: center;
			.detail-like-img {
				width: 82rpx; 
				height: 82rpx; 
				border-radius: 15rpx; 
				overflow: hidden; 
				margin-right: 20rpx;
				image {
					width: 100%; 
					height: 100%;
				}
			}
			.detail-like-song {
				flex: 1;
				view {
					width: 70vw;
					white-space: nowrap; 
					overflow: hidden; 
					text-overflow: ellipsis;
				}
				view:nth-child(1) {
					color:white; 
					font-size: 30rpx; 
					margin-bottom: 10rpx;
				}
				view:nth-child(2) {
					font-size: 22rpx; 
					color: #a2a2a2; 
					image {
						width: 34rpx; 
						height: 22rpx; 
						margin-right: 10rpx;
					}
				}
			}
			text {
				font-size: 50rpx; 
				color: #877764;
			}
		}
		
	}
	.detail-comment {
		margin: 0 32rpx;
		.detail-comment-tilte {
			font-size: 36rpx; 
			color: white; 
			margin: 50rpx 0;
		}
		.detail-comment-item {
			display: flex; 
			margin-bottom:28rpx;
			.detail-comment-img {
				width: 66rpx; 
				height: 66rpx; 
				border-radius: 50%; 
				overflow: hidden; 
				margin-right: 18rpx;
				image {
					width:100%; 
					height:100%
				}
			}
			.detail-comment-content {
				flex:1; 
				color: #cac9cd;
				.detail-comment-head {
					display: flex;
					justify-content: space-between;
					.detail-comment-name {
						view:nth-child(1) { 
							font-size:24rpx;
						}
						view:nth-child(2){ 
							font-size:20rpx;
						}
					}
					.detail-comment-like {
						font-size:30rpx;
					}
				}
				.detail-comment-text {
					line-height: 40rpx; 
					color:white; 
					font-size:28rpx; 
					margin-top:16rpx; 
					border-bottom:1px #595860 solid; 
					padding-bottom: 40rpx;
				}
			}
		}
	}
</style>
