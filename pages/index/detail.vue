<template>
	<view class="wrap">
		<!-- <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map> -->
		<view class="item">
			<view class="u-flex u-row-between top" @click="makePhone(detailData.ship_mobile)">
				<view>
					<text class="name">{{ detailData.ship_name }}</text>
					<text class="phone">{{ detailData.ship_mobile }}</text>
				</view>
				<u-icon name="phone" :size="40" color="#999999"></u-icon>
			</view>
			<view class="u-flex u-row-between bottom" @click="goMap(totalAddress)">
				<text>{{totalAddress}}</text>
				<u-icon name="map" :size="40" color="#999999"></u-icon>
			</view>
			<u-line></u-line>
			<view class="u-flex u-row-between top">
				<text>商品名称</text>
				<text>商品规格</text>
				<text>商品单位</text>
				<text>商品数量</text>
			</view>
			<view class="u-flex u-row-between top" @click="" v-for="(item,key) in detailData.item" :key="item.id">
				<text>{{item.name}}</text>
				<text>{{item.addon ? JSON.stringify(item.addon) : ''}}</text>
				<text>{{item.unit ? JSON.stringify(item.unit) : ''}}</text>
				<text>{{item.nums}}</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import pathPlanning from '@/js_sdk/path-planning.js';
	export default {
		data() {
			return {
				detailData: {},
				// totalAddress: '',
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					// #ifdef APP-PLUS
					iconPath: '/static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '/static/location.png',
					// #endif
				}, {
					latitude: 39.90,
					longitude: 116.39,
					// #ifdef APP-PLUS
					iconPath: '/static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '/static/location.png',
					// #endif
				}]
			}
		},
		onLoad(option) {
			console.log(option)
			const orderId = option.order_id
			this.getDetail(orderId)
		},
		computed: {
			totalAddress() {
				return this.detailData.detail_address + this.detailData.ship_address
			}
		},
		methods: {
			getDetail(id) {
				this.$u.api.orderDetail({
					order_id: id
				}).then(res => {
					this.detailData = res.order
					// this.totalAddress = this.detailData.detail_address + this.detailData.ship_address
				}).catch(error => {})
			},
			makePhone(phone) {
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
			},
			goMap(address) {
				// #ifdef APP-PLUS
				pathPlanning(address)
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;
		.top {
			padding: 20rpx 0;
			.phone {
				margin-left: 60rpx;
			}
		
		}
		.bottom {
			margin-top: 20rpx;
			padding: 20rpx 0;
			color: $u-tips-color;
		}
	}
</style>
