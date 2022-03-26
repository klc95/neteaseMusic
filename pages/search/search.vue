<template>
	<view class="search">
		<music-head title="搜索" :icon="true" :iconBlack="true"></music-head>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" 
						   value="搜索歌曲" 
						   v-model="searchWord" 
						   @confirm="handleToSearch(searchWord)"
						   @input="handleToSuggest"
					/>
					<text class="iconfont icon-htmal5icon21"
						  v-show="searchType != 1" 
						  @tap="handleToClose">
					</text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<view>历史记录</view>
							<text class="iconfont icon-lajitong" @tap="handleClear"></text>
						</view>
						<view class="search-history-list">
							<view  v-for="(item, index) in searchHistory" :key="index" @tap="handleToWord(item)">
								{{item}}
							</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
					<!-- <view class="search-hot-item">
						<view class="search-hot-top">1</view>
						<view class="search-hot-word">
							<view>
								少年
								<image src="~@/static/dujia.png" mode=""></image>
							</view>
							<view>一蓑烟雨任平生</view>
						</view>		
						<text class="search-hot-count">66666</text>
					</view> -->
						<view class="search-hot-item" 
							  v-for="(item, index) in searchHot" 
							  :key="index"
							  @tap="handleToWord(item.searchWord)"
						>
							<view class="search-hot-top">{{index + 1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>		
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<!-- <view class="search-result-item">
							<view class="search-result-word">
								<view>少年</view>
								<view>许巍 - 少年</view>
							</view>
							<text class="iconfont icon-bofang"></text>
						</view> -->
						<view class="search-result-item" 
							  v-for="(item, index) in searchList" 
							  :key="index"
							 @tap="handleToDetail(item.id)"
						>
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.artists[0].name}} - {{item.album.name}}</view>
							</view>
							<text class="iconfont icon-bofang"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索“{{searchWord}}”</view>
						<!-- <view class="search-suggest-item">
							<text class="iconfont icon-fangdajing"></text>
							少年
						</view> -->
						<view class="search-suggest-item" 
							  v-for="(item, index) in searchSuggest" 
							  :key="index"
							  @tap="handleToWord(item.keyword)"
						>
							<text class="iconfont icon-fangdajing"></text>
							{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {searchHot, searchWord, searchSuggest} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '',
				searchHistory: [],
				searchType: 1,
				searchList: [],
				searchSuggest: [],
			}
		},
		onLoad() {
			searchHot().then(res => {
				console.log('searchHot', res)
				if(res[1].data.code == '200') {
					this.searchHot = res[1].data.data
					console.log(this.searchHot)
				}
			})
			uni.getStorage({
				key: 'searchHistory',
				success: (res) => {
					this.searchHistory = res.data;
				} 
			})
		},
		methods: {
			handleToWord(word) {
				this.searchWord = word; 
				this.handleToSearch(word);
			},
			handleToSearch(word) {
				this.searchHistory.unshift(word);
				this.searchHistory = [...new Set(this.searchHistory)];
				if(this.searchHistory.length > 10) {
					this.searchHistory.length = 10;
				}
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory,
				})
				this.getSearchList(word);
			},
			handleClear() {
				uni.removeStorage({
					key: 'searchHistory',
					success: (res) => {
						this.searchHistory = [];
					}
				})
			},
			getSearchList(word) {
				searchWord(word).then(res => {
					if(res[1].data.code == '200') {
						this.searchList = res[1].data.result.songs;
						this.searchType = 2;
					}
				})
			},
			handleToClose() {
				this.searchWord = '';
				this.searchType = 1;
			},
			handleToDetail(singId) {
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + singId
				});
			},
			handleToSuggest(ev) {
				let value = ev.target.value;
				// console.log('e.target.value',value);
				if(!value) {
					this.searchType = 1;
					return
				}
				searchSuggest(value).then((res) => {
					console.log(res)
					if(res[1].data.code == '200') {
						this.searchSuggest = res[1].data.result.allMatch;
						this.searchType = 3;
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-search {
		display: flex;
		background: #f7f7f7; 
		height: 73rpx; 
		margin: 28rpx 30rpx 30rpx 30rpx; 
		border-radius: 50rpx; 
		align-items: center;
		text {
			margin:0 27rpx;
		}
		input {
			font-size:26rpx; 
			flex:1;
		}
	}
	.search-history {
		margin: 0 30rpx;
		font-size: 26rpx;
		.search-history-head {
			display: flex; 
			justify-content: space-between;
			margin-bottom: 36rpx; 
		}
		.search-history-list {
			display: flex; 
			flex-wrap: wrap;
			view {
				padding: 20rpx 40rpx; 
				background: #f7f7f7; 
				border-radius: 50rpx; 
				margin-right: 30rpx; 
				margin-bottom: 20rpx;
			}
		}
	}
	.search-hot {
		margin: 30rpx 30rpx; 
		font-size: 26rpx; 
		// color: #bebebe;
		.search-hot-head {
			margin-bottom: 36rpx;
		}
		.search-hot-item {
			display: flex; 
			align-items: center; 
			margin-bottom: 58rpx;
			.search-hot-top {
				width: 60rpx; 
				color: #fb2222; 
				font-size: 34rpx;
				margin-left: 8rpx;
			}
			.search-hot-word {
				flex: 1;
				view:nth-child(1) {
					font-size: 30rpx;
					color: black;
					image {
						width: 48rpx; 
						height: 22rpx;
					}
				}
				view:nth-child(2) {
					font-size: 24rpx;
					color: #c6c6c6;
				}
			}
			.search-hot-count {
				color: #c6c6c6;
			}
		}
	}
	.search-result {
		border-top: 2rpx #e5e5e5 solid;
		padding: 30rpx;
		.search-result-item {
			display: flex; 
			align-items: center; 
			border-bottom: 2rpx #e5e5e5 solid; 
			padding-bottom: 30rpx; 
			margin-bottom: 30rpx;
			.search-result-word {
				flex:1;
				view:nth-child(1) {
					font-size: 28rpx; 
					color: #3e6694;
				}
				view:nth-child(2) {
					font-size:26rpx;
				}
			}
			text {
				 font-size: 50rpx;
			}
		}
	}
	.search-suggest {
		border-top: 2rpx #e4e4e4 solid; 
		padding: 30rpx; 
		font-size: 26rpx;
		.search-suggest-head {
			color: #4574a5; 
			margin-bottom: 40rpx;
		}
		.search-suggest-item {
			color: #5d5d5d; 
			margin-bottom: 70rpx;
			text {
				color: #bdbdbd; 
				font-size: 26rpx; 
				margin-right: 26rpx;
			}
		}
	}
</style>
