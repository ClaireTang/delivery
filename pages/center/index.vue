<template>
	<view>
		<view class="u-flex user-box u-p-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1" v-if="JSON.stringify(vuex_user) !== '{}'">
				<view class="u-font-18 u-p-b-20">{{vuex_user.username}}</view>
				<view class="u-font-14 u-tips-color">手机号：{{vuex_user.mobile}}</view>
			</view>
			<view v-else>
				<view class="u-font-18 u-p-b-20 no-login" @click="login">
					未登陆
				</view>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="edit-pen" title="修改密码" @click="fixPwd"></u-cell-item>
			</u-cell-group>
		</view>
		
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view> -->
		
		<view class="u-m-t-20">
			<u-cell-group>
				<!-- #ifdef APP-PLUS -->
				<u-cell-item icon="zhuanfa" title="退出" @click="quit"></u-cell-item>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<u-cell-item icon="reload" title="退出登录" @click="H5Clear"></u-cell-item>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<!-- <navigator target="miniProgram" open-type="exit">退出小程序</navigator> -->
				<!-- #endif -->
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				pic:'/static/delivery.jpg',
				show:true
			}
		},
		methods: {
			fixPwd() {
				this.$u.route('pages/login/fixPwd')
			},
			login() {
				this.$u.route('pages/login/index')
			},
			clearCache() {
				uni.clearStorage()
				this.$u.vuex('vuex_user', {})
				this.$u.vuex('vuex_token', '')
			},
			H5Clear() {
				this.clearCache()
				this.login()
			},
			quit() {
				let _this = this
				uni.showModal({
				    title: '提示',
				    content: '确认退出登录吗?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							_this.clearCache()
							// uni.navigateBack({delta: 2})
							// #ifdef APP-PLUS  
							plus.runtime.quit()
							// #endif
							// #ifdef H5
							_this.login()
							// #endif
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $u-bg-color;
}
.no-login {
	color: $u-type-primary;
}
.user-box{
	background-color: #fff;
}
</style>
