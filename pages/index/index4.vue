<template>
	<view class="wrap">
		<u-popup v-model="searchPopup" mode="right"  width="70%">
			<view class="u-font-40 u-text-center u-m-t-40 u-m-b-40">搜索条件</view>
			<u-field
				v-model="keyWord"
				label="地址"
				placeholder="请填写小区或者街道名等"
				type="textarea"
			>
			</u-field>
			<view class="u-text-center u-m-t-20 u-m-b-20 fixed-bottom">
				<u-button size="medium" type="primary" shape="circle" plain @click="search()">确认</u-button>
			</view>
		</u-popup>
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#2979ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y :scroll-top="scrollTop[0]" style="height: 100%;width: 100%;" @scrolltolower="reachBottom" @scroll="scroll">
					<list :list="orderList[0]" :loadStatus="loadStatus[0]" :indexActive="swiperCurrent" @request-data="requestData(swiperCurrent)"></list>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y :scroll-top="scrollTop[1]" style="height: 100%;width: 100%;" @scrolltolower="reachBottom" @scroll="scroll">
					<list :list="orderList[1]" :loadStatus="loadStatus[1]" :indexActive="swiperCurrent" @request-data="requestData(swiperCurrent)"></list>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y :scroll-top="scrollTop[2]" style="height: 100%;width: 100%;" @scrolltolower="reachBottom" @scroll="scroll">
					<list :list="orderList[2]" :loadStatus="loadStatus[2]" :indexActive="swiperCurrent" @request-data="requestData(swiperCurrent)"></list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import list from './list.vue'
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	import {mixinIsGoLogin} from '@/common/new_file.js'
	export default {
		components:{list},
		mixins: [mixinIsGoLogin],
		data() {
			return {
				searchPopup: false,
				keyWord: '',
				list: [{
						state: 1,
						name: '待发货',
					},
					{
						state: 2,
						name: '送货中',
					},
					{
						state: 3,
						name: '已送达',
					},
				],
				orderList: [[],[],[]],
				totalPage: [0,0,0],
				page: [1,1,1],
				state:[1,2,3],
				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
				scrollTop: [0,0,0],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.reloadList(this.swiperCurrent);
		},
		computed: {
			
		},
		onReachBottom(e) {
			this.getOrderList();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 1) {
				this.searchPopup = true
			} else if (e.index === 0) {
				this.searchPopup = !this.searchPopup
			}
		},
		methods: {
			reachBottom(e) {
				//在0.5s后执行一次该函数
				if(this.totalPage[this.swiperCurrent] === 0) return
				setTimeout(() => {
					//TODO这里填写你加载数据的方法
					this.getOrderList();
				}, 500)
			},
			//滚动时触发事件
			scroll: function(e) {
				this.scrollTop[this.swiperCurrent] = e.detail.scrollTop;
			},
			//重新加载列表
			reloadList(i) {
				this.$set(this.orderList,i,[])
				this.$set(this.totalPage,i,0)
				this.$set(this.page,i,1)
				this.$set(this.loadStatus,i,'loadmore')
				this.$set(this.scrollTop,i,0)
				// this.keyWord = ''
				this.getOrderList()
			},
			//发货后重新请求页面数据
			requestData(i){
				this.reloadList(i)
			},
			// tab栏切换重新请求页面数据
			change(index) {
				this.swiperCurrent = index;
				this.reloadList(index);
			},
			search() {
				this.reloadList(this.swiperCurrent);
				this.searchPopup = false;
			},
			// 请求页面数据
			getOrderList() {
				let selfCurrent = this.swiperCurrent
				let data = {
					page: this.page[selfCurrent],
					state: this.state[selfCurrent],
					keyWord: this.keyWord
				}
				console.log(data,'data')
				if(this.totalPage[selfCurrent] && this.page[selfCurrent] > this.totalPage[selfCurrent]) return
				
				this.$set(this.loadStatus,selfCurrent,'loading')
				let result = []
				this.$u.api.orderList(data).then(res => {
					result = res.data
					this.totalPage[selfCurrent] = res.last_page
					this.$set(this.loadStatus,selfCurrent, this.page[selfCurrent] >= res.last_page ? 'nomore' : 'loadmore')
					result.forEach(item=>{
						this.orderList[selfCurrent].push(item);
					})
					this.page[selfCurrent] ++ 
				}).catch(error=>{})
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
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top) - var(--window-bottom));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	.fixed-bottom {
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transition: -50%;
		transform: translateX(-50%);
	}
</style>
