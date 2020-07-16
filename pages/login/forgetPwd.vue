<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType"  class="u-m-b-60">
			<u-form-item label="手机号码" prop="phone" label-width="150">
				<u-input placeholder="请输入新手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>
			<u-form-item label="验证码" prop="code" label-width="150">
				<u-input placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<u-form-item label="密码" prop="password" label-width="150">
				<u-input :password-icon="true" type="password" v-model="model.password" placeholder="请设置新密码"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" prop="rePassword" label-width="150">
				<u-input :password-icon="true" type="password" v-model="model.rePassword" placeholder="请确认新密码"></u-input>
			</u-form-item>
		</u-form>
		<u-button type="primary" shape="circle" :ripple="true" :disabled="disabled" @click="submit">重置密码</u-button>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agreement: false,
			model: {
				phone: '',
				password: '',
				rePassword: '',
				code: '',
			},
			codeTips: '',
			rules: {
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change','blur'],
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change','blur'],
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
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
						message: '请重新输入密码',
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
			if(vm.model.phone && vm.model.password && vm.model.rePassword && vm.model.code) disabled = false
			return disabled
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			if(this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					// this.$u.api.forgetPwd({username:this.model.phone,password:this.model.password}).then(res => {
					// 	// console.log(res);
					// 	//vuex存储store   token,用来设置authorzation
					// 	this.$u.vuex('vuex_token', res.token);
					// 	this.$u.vuex('vuex_user', res);
					// 	this.$u.route({
					// 		type: 'switchTab',
					// 		url: '/pages/index/index'
					// 	})
					// }).catch(error=>{})
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

