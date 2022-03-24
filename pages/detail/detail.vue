<template>
	<view class="detail"> 
		<view class="fixbg"></view>
		<music-head title="与你无关" icon="true" color="white"></music-head>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image src="../../static/wangyiyunyinyue.png" mode=""></image>
					<text class="iconfont icon-zanting"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item">测试文字</view>
						<view class="detail-lyric-item active">测试文字测试文字</view>
						<view class="detail-lyric-item">测试文字测试文字</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button  class="detail-share" open-type="share">
					<text class="iconfont icon-fenxiang"></text>分享给微信好友
				<!-- #endif -->
				</button>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
</style>
