<script>
	import { apiBaseUrl } from '@/common/config.js'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			var server = `${apiBaseUrl}merapi/Upgrade/getAllVersion`; //检查更新地址  
			var req = { //升级检测数据  
				"type": 'delivery',
				"appid": plus.runtime.appid,
				"version": plus.runtime.version
			};
			console.log(req)
			// uni.showToast({
			// 	title: req,
			// 	duration: 4000
			// })
			uni.request({
				url: server,
				data: req,
				success: (res) => {
					// uni.showToast({
					// 	title: res,
					// 	duration: 4000
					// })
					console.log(res)
					if (res.statusCode == 200 && res.data.status === 1) {
						uni.showModal({ //提醒用户更新  
							title: "更新提示",
							content: res.data.note,
							success: (res2) => {
								if (res2.confirm) {
									plus.runtime.openURL(res.data.url);
								}
							}
						})
					}
				}
			})
			// #endif 
			// if(JSON.stringify(this.$store.state.vuex_user) === '{}') {
			// 	this.$u.route('/pages/login/index')
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
