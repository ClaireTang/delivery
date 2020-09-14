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
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			    uni.request({  
			        url: server,  
			        data: req,  
			        success: (result) => {  
			            var data = result.data;  
			            if (data.update && data.wgtUrl) {  
			                uni.downloadFile({  
			                    url: data.wgtUrl,  
			                    success: (downloadResult) => {  
			                        if (downloadResult.statusCode === 200) {  
			                            plus.runtime.install(downloadResult.tempFilePath, {  
			                                force: false  
			                            }, function() {  
			                                console.log('install success...');  
			                                plus.runtime.restart();  
			                            }, function(e) {  
			                                console.error('install fail...');  
			                            });  
			                        }  
			                    }  
			                });  
			            } else if(data.update && data.pkgUrl) {
							uni.showModal({ //提醒用户更新
								title: "更新提示",
								content: data.note,
								success: (res2) => {
									if (res2.confirm) {
										plus.runtime.openURL(data.pkgUrl);
									}
								}
							})
						}
			        }  
			    });  
			});
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
