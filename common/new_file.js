export const mixinIsGoLogin = {
	onShow() {
		this.isGoLogin()
	},
	methods: {
		isGoLogin() {
			console.log('mixin')
			// if(JSON.stringify(this.vuex_user) === '{}') {
			// 	this.$u.route('/pages/login/index')
			// }
		}
		
	}
}