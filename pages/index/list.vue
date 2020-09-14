<template>
	<view class="page-box">
		<template v-if="list.length > 0 ">
			<view class="order" v-for="(obj, index) in  list" :key="obj.id">
				<view class="u-flex u-row-between top">
					<view>
						<!-- <u-icon name="checkmark-circle" class="u-p-r-35" :color="`#${obj.check ? '2979ff' : 'eee'}`" size="36"></u-icon> -->
						<text>订单编号：{{obj.order_id}}</text>
					</view>
					<u-button size="mini" shape="circle" plain class="copyBtn" @click="copy(obj.order_id)">复制</u-button>
				</view>
				<view class="u-flex u-row-between u-font-26 middle" @click="goDetail(obj)">
					<view>
						<view class="field"><text>收货人：</text>{{obj.ship_name}}</view>
						<view class="field"><text>联系方式：</text>{{obj.ship_mobile}}</view>
						<view class="field"><text>送货地址：</text>{{obj.detail_address}}</view>
					</view>
					<u-icon class="u-p-l-40" name="arrow-right" color="#2979ff" size="32"></u-icon>
				</view>
				<view class="u-flex u-row-between u-font-26 bottom">
					<view class="">
						<view class="field"><text>商品种类：</text>{{obj.item.length}}</view>
						<view class="field"><text>支付时间：</text>{{obj.payment_time | date('yyyy-mm-dd hh:MM:ss')}}</view>
						<view class="field"><text>订单总价：</text>￥{{obj.goods_amount}}</view>
					</view>
					<view>
						<u-button v-if="indexActive === 0" type="primary" plain shape="circle" size="mini" @click='editOrderStatus({"order_id":obj.order_id,"state":2})'>发货</u-button>
						<u-button v-if="indexActive === 1" type="primary" plain shape="circle" size="mini" @click='editOrderStatus({"order_id":obj.order_id,"state":3})'>已送达</u-button>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
		</template>
		<template v-else>
			<view class="centre">
				<u-empty mode="list" text="您还没有相关的订单"></u-empty>
			</view>
		</template>
	</view>
</template>

<script>
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		name: 'list',
		props:{
			indexActive: {
				type: Number,
				default: 0
			},
			list:{
				type: Array,
				default: []
			},
			loadStatus: {
				type: String,
				default: 'loadmore'
			}
		},
		data() {
			return {
			};
		},
		onLoad() {
			
		},
		computed: {
			
		},
		methods: {
			//复制订单号
			copy(value){
				// #ifdef APP-PLUS || MP-WEIXIN
				uni.setClipboardData({
					data:value,				//要被复制的内容
					success:()=>{			//复制成功的回调函数
					  uni.showToast({		//提示
						title:'复制成功'
					  })
					}
				});
				// #endif
				
				// #ifdef H5
				const result = h5Copy(value)
				if (result === false) {
				   this.$u.toast('不支持')
				} else {
				    this.$u.toast('复制成功')
				}
				// #endif
			},
			editOrderStatus(data) {
				this.$u.api.editOrderStatus(data).then(res => {
					this.$u.toast('已操作成功！')
					this.$emit('request-data','edit')
				}).catch(error=>{})
			},
			goDetail(obj) {
				console.log(obj)
				this.$u.route({
					url: 'pages/index/detail',
					params: {
						order_id: obj.order_id
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.order {
		background-color: #ffffff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
		.field {
			line-height: 1.6;
			text {
				color: $u-content-color;
			}
		}
		.top {
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid $u-border-color;
			.copyBtn {
				margin: 0;
			}
		}
		.middle {
			padding: 10rpx 0;
			border-bottom: 2rpx solid $u-border-color;
		}
		.bottom {
			padding-top: 10rpx;
		}
	}
	.centre {
		text-align: center;
		padding: 200rpx 0;
		font-size: 32rpx;
	
		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
	
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>
