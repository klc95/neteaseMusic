<template>
	<view class="music-head" :style="{color: color}">
		<view class="music-head-icon" v-if="icon" :class="{'music-head-iconBlack': iconBlack}">
			<text class="iconfont icon-zuojiantou" @tap="handleToBack"></text> | <text class="iconfont icon-shouye" @tap="handleToIndex"></text>
		</view>
		{{ title }}
	</view>
</template>

<script>
	export default {
		name:"music-head",
		data() {
			return {
				
			};
		},
		props: ['title', 'icon', 'color', 'iconBlack'],
		methods: {
			handleToBack(){
				uni.navigateBack();
			},
			handleToIndex(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.music-head { 
		height: 75px; 
		text-align: center; 
		line-height: 80px; 
		font-size: 16px; 
		color: black; 
		overflow: hidden; 
		position: relative;
	}
	.music-head-icon { 
		width: 97px; 
		height: 31px; 
		background: rgba(0,0,0,0.4); 
		border-radius: 15px; 
		position: absolute; 
		left: 10px; 
		top: 25px; 
		line-height: 31px; 
		display: flex; 
		justify-content: space-evenly; 
		color:white;}
		
	.music-head-iconBlack{
		color: black; 
		background: white; 
		border: 1px black solid;}
</style>
