<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item label="手机号码" prop="phone" label-width="150">
				<u-input placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input :password-icon="true" type="password" v-model="model.password" placeholder="6-12位,数字和字母组合"></u-input>
			</u-form-item>
		</u-form>
		<view class="agreement u-row-between">
			<view class="u-flex">
				<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
				<view class="agreement-text">
					勾选代表同意的版权协议
				</view>
			</view>
			<!-- <view class="forgetPwd" @click="forgetPwd">忘记密码?</view> -->
		</view>
		<u-button type="primary" shape="circle" :ripple="true" :disabled="disabled" @click="submit">提交</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agreement: false,
			model: {
				phone: '',
				password: ''
			},
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
			},
			check: false,
			errorType: ['toast'],
		};
	},
	onLoad() {

	},
	computed: {
		disabled: (vm) => {
			let disabled = true
			if(vm.model.phone && vm.model.password) disabled = false
			return disabled
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		forgetPwd() {
			this.$u.route('pages/login/forgetPwd')
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if(!this.agreement) return this.$u.toast('请勾选协议');
					console.log('验证通过');
					// this.$u.api.login({username:this.model.phone,password:this.model.password}).then(res => {
					// 	console.log(res)
					// })
					this.$u.api.login({username:this.model.phone,password:this.model.password}).then(res => {
						// console.log(res);
						//vuex存储store   token,用来设置authorzation
						this.$u.vuex('vuex_token', res.token);
						this.$u.vuex('vuex_user', res);
						this.$u.route({
							type: 'switchTab',
							url: '/pages/index/index'
						})
					}).catch(error=>{})
				} else {
					console.log('验证失败');
				}
			});
		},
		// 勾选版权协议
		checkboxChange(e) {
			this.agreement = e.value;
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
	.forgetPwd {
		color: $u-type-primary;
	}
}
</style>
