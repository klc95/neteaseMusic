<script>
	import "./static/iconfont/iconfont.css"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: calc(100vh - 70px);
	}	
	.fixbg { 
		width:100%; 
		height: 100vh; 
		position: fixed; 
		background-size:cover; 
		background-position: center 0; 
		filter: blur(10px);
		transform: scale(1.2);
	}

</style>
