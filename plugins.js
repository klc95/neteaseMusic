export default {
	install(Vue) {
		Vue.filter('formatCount', function(value) {
			if(value > 10000 && value <= 100000000) {
				value /= 10000;
				return value.toFixed(1) + '万';
			} else if (value > 100000000) {
				value /= 100000000
				return  value.toFixed(1) + '亿';
			} else {
				return value;
			}
		})
	}
}