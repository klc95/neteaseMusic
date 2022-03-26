import { baseUrl } from "./config.js"

// 首页数据	
export function topList() {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUrl}/topList/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				resolve(result);
			},
			fail: () => {},
			complete: () => {}
		});
	});
}

// 列表页数据
// http://localhost:3000/playlist/detail?id=19723756
export function list(id) {
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${id}`,
		method: 'GET',
		data: {},
	});
}

// 详情页 
// http://localhost:3000/song/detail?ids=1927693793
export function songDetail(songId){ // 歌曲的详情信息
	return uni.request({
		url : `${baseUrl}/song/detail?ids=${songId}`,
		method : 'GET'
	})
}

// http://localhost:3000/simi/song?id=1927693793 
export function songSimi(songId){ // 相关歌曲
	return uni.request({
		url : `${baseUrl}/simi/song?id=${songId}`,
		method : 'GET'
	})
}

// http://localhost:3000/comment/music?id=1927693793
export function songComment(songId){ // 评论
	return uni.request({
		url : `${baseUrl}/comment/music?id=${songId}`,
		method : 'GET'
	})
}

// http://localhost:3000/lyric?id=1927693793
export function songLyric(songId){ // 歌词
	return uni.request({
		url : `${baseUrl}/lyric?id=${songId}`,
		method : 'GET'
	})
}

// http://localhost:3000/song/url?id=1927693793
export function songUrl(songId){ // 歌曲地址
	return uni.request({
		url : `${baseUrl}/song/url?id=${songId}`,
		method : 'GET'
	})
}

//  热词
export function searchHot() {
	return uni.request({
		url: `${baseUrl}/search/hot/detail`,
		method: 'GET',
		data: {},
	});
}

// http://localhost:3000/search?keywords=少年 搜索结果
export function searchWord(word) {
	return uni.request({
		url: `${baseUrl}/search/?keywords=${word}`,
		method: 'GET',
		data: {},
	});
}

// http://localhost:3000/search/suggest?keywords=少年&type=mobile 下拉提示的接口
export function searchSuggest(word) {
	return uni.request({
		url: `${baseUrl}/search/suggest/?keywords=${word}&type=mobile`,
		method: 'GET',
		data: {},
	});
}