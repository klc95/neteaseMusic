import { baseUrl } from "./config.js"

	
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

export function list(id) {
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${id}`,
		method: 'GET',
		data: {},
	});
}