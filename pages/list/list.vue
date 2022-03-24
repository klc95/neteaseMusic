<template>
	<view class="list">
		<view class="fixbg" :style="{backgroundImage:'url('+ playlist.coverImgUrl +')'}"></view>
		<music-head title="歌单" icon="true"></music-head>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont icon-yousanjiao">{{playlist.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name}}</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode=""></image>
							{{playlist.creator.nickname}}
						</view>
						<view>{{playlist.description}}</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button  class="list-share" open-type="share">
					<text class="iconfont icon-fenxiang"></text>分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-title">
						<text class="iconfont icon-yunhang"></text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<!-- <view class="list-music-item" @tap="handleToDetail">
						<view class="list-music-top">1</view>
						<view class="list-music-song">
							<view>与我无关</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								阿冗 - 与我无关
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view> -->
					<view class="list-music-item" @tap="handleToDetail" v-for="(item,index) in playlist.tracks" :key="index">
						<view class="list-music-top">{{index + 1}}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png" mode=""></image>
								<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image>
								{{item.ar[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { list } from '../../common/api.js'
	export default {
		data() {
			return {
				playlist: {
					coverImgUrl: '',
					creator: {
						avatarUrl: ''
					},
					trackCount: '',
				},
				privileges: [],
				isLoading: true,
			}
		},
		onLoad(options) {
			// console.log(options.id) 
			uni.showLoading({
				title: '加载中...'
			})
			list(options.id).then(res => {
				console.log('list', res);
				if(res[1].data.code == '200') {
					this.playlist = res[1].data.playlist;
					this.privileges = res[1].data.privileges;
					this.isLoading = false;
					uni.hideLoading();
				}
			})
		},
		methods: {
			handleToDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-head { 
		display: flex; 
		margin: 30rpx;
		.list-head-img {
			width: 265rpx; 
			height: 265rpx; 
			border-radius: 15rpx; 
			margin-right: 40rpx; 
			overflow: hidden; 
			position: relative;
			image { 
				width: 100%; 
				height: 100%;
			}
			text { 
				position: absolute; 
				font-size: 26rpx; 
				color: white; 
				right: 8rpx; 
				top: 8rpx;
			}
		}
		.list-head-text { 
			flex: 1; 
			font-size:24rpx; 
			color:black;
			image{ 
				width: 52rpx; 
				height: 52rpx; 
				border-radius: 50%;
			}
			view:nth-child(1){ 
				font-size: 34rpx; 
				color: balck;
			}
			view:nth-child(2){ 
				display: flex; 
				align-items: center; 
				margin: 30rpx 0;
				text{ 
					margin-left: 15rpx;
				}
			}
			view:nth-child(3){ 
				line-height: 38rpx;
			}
		}
		
	}
	.list-share { 
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
	.list-music { 
		background: white; 
		border-radius: 50rpx; 
		overflow: hidden; 
		margin-top: 45rpx;
		.list-music-title { 
			height:58rpx; 
			line-height: 58rpx; 
			margin:30rpx 30rpx 70rpx 30rpx;
			text:nth-child(1){ 
				font-size:58rpx;
			}
			text:nth-child(2){ 
				font-size:34rpx; 
				margin:0 10rpx 0 25rpx;
			}
			text:nth-child(3){ 
				font-size:28rpx; 
				color:#b2b2b2;
			}
		}
		.list-music-item { 
			display: flex; 
			margin:0 30rpx 70rpx 44rpx; 
			align-items: center;
			.list-music-top { 
				width: 56rpx; 
				font-size: 28rpx; 
				color: #979797;
			}
			.list-music-song { 
				flex:1; 
				line-height: 40rpx;
				view:nth-child(1) { 
					font-size:30rpx; 
					width:70vw; 
					white-space: nowrap; 
					overflow: hidden; 
					text-overflow: ellipsis;
				}
				view:nth-child(2) { 
					font-size: 22rpx; 
					color: #a2a2a2; 
					width: 70vw; 
					white-space: nowrap; 
					overflow: hidden; 
					text-overflow: ellipsis;
					image {
						width: 34rpx; 
						height: 22rpx; 
						margin-right: 10rpx; 
						flex-shrink: 0;
					}
				}
			}
			text { 
				font-size: 50rpx; 
				color: #c8c8c8;
			}
		}
	}
</style>
