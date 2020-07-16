<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#2979ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(obj, index) in orderList[0]" :key="obj.order_id">
								<view class="u-flex u-row-between top">
									<text>订单编号：{{obj.order_id}}</text>
									<u-button size="mini" shape="circle" plain class="copyBtn" @click="copy(obj.order_id)">复制</u-button>
								</view>
								<view class="u-flex u-row-between u-font-26 middle">
									<view>
										<view class="field"><text>收货人：</text>{{obj.ship_name}}</view>
										<view class="field"><text>联系方式：</text>{{obj.ship_mobile}}</view>
										<view class="field"><text>送货地址：</text>{{obj.detail_address}}</view>
									</view>
									<u-icon class="u-p-l-40" name="arrow-right" color="#2979ff" size="32"></u-icon>
								</view>
								<view class="u-flex u-row-between u-font-26 bottom" @click="goDetail(obj)">
									<!-- <u-icon name="checkmark-circle" class="u-p-r-35" :color="`#${obj.check ? '2979ff' : 'eee'}`" size="36"></u-icon> -->
									<view>
										<view class="field"><text>商品种类：</text>{{obj.item.length}}</view>
										<view class="field"><text>支付时间：</text>{{obj.payment_time | date('yyyy-mm-dd MM:ss')}}</view>
										<view class="field"><text>订单总价：</text>￥{{obj.goods_amount}}</view>
									</view>
									<view>
										<u-button type="primary" plain shape="circle" size="mini">发货</u-button>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(obj, index) in  orderList[1]" :key="obj.id">
								<view class="u-flex u-row-between top">
									<text>订单编号：{{obj.order_id}}</text>
									<u-button size="mini" shape="circle" plain class="copyBtn" @click="copy(obj.order_id)">复制</u-button>
								</view>
								<view class="u-flex u-row-between u-font-26 middle">
									<view>
										<view class="field"><text>收货人：</text>{{obj.ship_name}}</view>
										<view class="field"><text>联系方式：</text>{{obj.ship_mobile}}</view>
										<view class="field"><text>送货地址：</text>{{obj.detail_address}}</view>
									</view>
									<u-icon class="u-p-l-40" name="arrow-right" color="#2979ff" size="32"></u-icon>
								</view>
								<view class="u-flex u-row-between u-font-26 bottom" @click="goDetail(obj)">
									<!-- <u-icon name="checkmark-circle" class="u-p-r-35" :color="`#${obj.check ? '2979ff' : 'eee'}`" size="36"></u-icon> -->
									<view class="">
										<view class="field"><text>商品种类：</text>{{obj.item.length}}</view>
										<view class="field"><text>支付时间：</text>{{obj.payment_time | date('yyyy-mm-dd MM:ss')}}</view>
										<view class="field"><text>订单总价：</text>￥{{obj.goods_amount}}</view>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<template v-if="orderList[2].length > 0 ">
								<view class="order" v-for="(obj, index) in  orderList[2]" :key="obj.id">
									<view class="u-flex u-row-between top">
										<text>订单编号：{{obj.order_id}}</text>
										<u-button size="mini" shape="circle" plain class="copyBtn" @click="copy(obj.order_id)">复制</u-button>
									</view>
									<view class="u-flex u-row-between u-font-26 middle">
										<view>
											<view class="field"><text>收货人：</text>{{obj.ship_name}}</view>
											<view class="field"><text>联系方式：</text>{{obj.ship_mobile}}</view>
											<view class="field"><text>送货地址：</text>{{obj.detail_address}}</view>
										</view>
										<u-icon class="u-p-l-40" name="arrow-right" color="#2979ff" size="32"></u-icon>
									</view>
									<view class="u-flex u-row-between u-font-26 bottom" @click="goDetail(obj)">
										<!-- <u-icon name="checkmark-circle" class="u-p-r-35" :color="`#${obj.check ? '2979ff' : 'eee'}`" size="36"></u-icon> -->
										<view class="">
											<view class="field"><text>商品种类：</text>{{obj.item.length}}</view>
											<view class="field"><text>支付时间：</text>{{obj.payment_time | date('yyyy-mm-dd MM:ss')}}</view>
											<view class="field"><text>订单总价：</text>￥{{obj.goods_amount}}</view>
										</view>
									</view>
								</view>
								<u-loadmore :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>
							</template>
							<template v-else>
								<view class="centre">
									<u-empty mode="list" text="您还没有相关的订单"></u-empty>
								</view>
							</template>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				orderList: [[],[],[]],
				list: [{
						state: 1,
						name: '待发货',
						hasQuest: false
					},
					{
						state: 2,
						name: '送货中',
						hasQuest: false
					},
					{
						state: 3,
						name: '已送达',
						hasQuest: false
					},
				],
				totalPage: [0,0,0],
				page: [1,1,1],
				state:[1,2,3],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			console.log('onload')
			this.getOrderList()
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
			reachBottom(e) {
				console.log('reachBottom')
				this.getOrderList();
			},
			// 页面数据
			getOrderList() {
				let selfCurrent = this.swiperCurrent
				let data = {
					page: this.page[selfCurrent],
					state: this.state[selfCurrent]
				}
				console.log(data,'data')
				if(this.totalPage[selfCurrent] && this.page[selfCurrent] > this.totalPage[selfCurrent]) return
				
				this.$set(this.loadStatus,selfCurrent,'loading')
				let result = []
				this.$u.api.orderList(data).then(res => {
					result = res.data
					this.totalPage[selfCurrent] = res.last_page
					this.$set(this.list[selfCurrent], 'hasQuest', true)
					this.$set(this.loadStatus,selfCurrent, this.page[selfCurrent] >= res.last_page ? 'nomore' : 'loadmore')
					result.forEach(item=>{
						this.orderList[selfCurrent].push(item);
					})
					this.page[selfCurrent] ++ 
					
				}).catch(error=>{})
				
			},
			
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				if(!this.list[index].hasQuest) this.getOrderList();
			},
			transition({detail: { dx }}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: {current}}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		// width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
		.u-flex {
			
			
		}
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
		margin: 200rpx auto;
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

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
