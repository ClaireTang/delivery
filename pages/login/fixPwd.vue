<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" class="u-m-b-60">
			<u-form-item label="旧密码" prop="oldPassword" label-width="150">
				<u-input :password-icon="true" type="password" v-model="model.oldPassword" placeholder="请输入旧密码"></u-input>
			</u-form-item>
			<u-form-item label="新密码" prop="password" label-width="150">
				<u-input :password-icon="true" type="password" v-model="model.password" placeholder="请设置新密码"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" prop="rePassword" label-width="150">
				<u-input :password-icon="true" type="password" v-model="model.rePassword" placeholder="请确认新密码"></u-input>
			</u-form-item>
		</u-form>
		<u-button type="primary" shape="circle" :ripple="true" :disabled="disabled" @click="submit">修改密码</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agreement: false,
			model: {
				oldPassword: '',
				password: '',
				rePassword: '',
			},
			codeTips: '',
			rules: {
				oldPassword: [
					{
						required: true,
						message: '请输入旧密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				password: [
					{
						required: true,
						message: '请输入新密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				rePassword: [
					{
						required: true,
						message: '请重新输入确认密码',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return value === this.model.password;
						},
						message: '两次输入的密码不相等',
						trigger: ['change','blur'],
					}
				],
			},
			errorType: ['toast'],
		};
	},
	onLoad() {

	},
	computed: {
		disabled: (vm) => {
			let disabled = true
			if(vm.model.oldPassword && vm.model.password && vm.model.rePassword) disabled = false
			return disabled
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					// this.$u.api.login({username:this.model.phone,password:this.model.password}).then(res => {
					// 	console.log(res)
					// })
					this.$u.api.editLoginPass({oldPassword:this.model.oldPassword,newPassword:this.model.password}).then(res => {
						// console.log(res);
						uni.showToast({
							title:'修改成功'
						})
						this.$u.route({
							type: 'switchTab',
							url: '/pages/center/index'
						})
					}).catch(error=>{})
				} else {
					console.log('验证失败');
				}
			});
		},
		
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}
</style>

