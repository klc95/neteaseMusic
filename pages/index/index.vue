<template>
	<view class="content">
		<music-head title="网易云音乐"></music-head>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" value="搜索歌曲" />
				</view>
				<view class="index-list">
					<!-- <view class="index-list-item">
						<view class="index-list-img">
							<image src="../../static/logo.png" mode=""></image>
							<text>刚刚更新</text>
						</view>
						<view class="index-list-text">
							<view>1.夜曲 - 周杰伦</view>
							<view>2.童话 - 光良</view>
							<view>3.江南 - 林俊杰</view>
						</view>
					</view> -->
					<view class="index-list-item" @tap="handleToList(item.id)" v-for="(item,index) in topList" :key="index">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>	
						</view>
						<view class="index-list-text">
							<view v-for="(item,index) in item.tracks" :key="index">{{index + 1}}.{{item.first}}-{{item.second}}</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { topList } from '../../common/api.js'
	export default {
		data() {
			return {
				topList: []
			}
		},
		onLoad() {
			topList().then((res)=>{
				console.log(res)
				if(res.length){
					setTimeout(()=>{
						this.topList = res;
					}, 1000);
				}
			});
		},
		methods: {
			handleToList(id){
				console.log('handleToList', id)
				uni.navigateTo({
					url: `/pages/list/list?id=${id}`
				});
			},
			handleToSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-search{ 
		display: flex;
		align-items: center;
		background:#f7f7f7; 
		height:73rpx; 
		margin:70rpx 30rpx 30rpx 30rpx; 
		border-radius: 50rpx; 
		text{
			margin:0 27rpx;
		};
		input{ 
			font-size:26rpx; 
		}
	}
	.index-list{
		margin: 0 30rpx;
		.index-list-item {
			margin-bottom: 30rpx;
			display: flex;
			.index-list-img{ 
				width: 212rpx; 
				height: 212rpx; 
				margin-right: 20rpx; 
				border-radius: 15rpx; 
				overflow: hidden; 
				position: relative;
				image{ 
					width: 100%; 
					height: 100%;
				}
				text{  
					font-size: 22rpx; 
					color: white; 
					position: absolute;
					bottom: 5rpx; 
					left: 15rpx;
				}
			}
			.index-list-text {
				flex:1; 
				font-size: 24rpx; 
				line-height: 68rpx;
				// width: 70vw;
				white-space: nowrap; 
				overflow: hidden; 
				text-overflow: ellipsis;
			}
		}
	}
</style>
