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
						<list :list="orderList[0]" :loadStatus="loadStatus[0]" :indexActive="swiperCurrent" @request-data="requestData"></list>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<list :list="orderList[1]" :loadStatus="loadStatus[1]" :indexActive="swiperCurrent"></list>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<list :list="orderList[2]" :loadStatus="loadStatus[2]" :indexActive="swiperCurrent"></list>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import list from './list.vue'
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		components:{list},
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
				forbidBottomScroll: false
			};
		},
		onLoad() {
			console.log('onload')
			this.getOrderList()
		},
		computed: {
			
		},
		methods: {
			reachBottom(e) {
				console.log('reachBottom')
				// if(!this.forbidBottomScroll) 
				this.getOrderList();
			},
			requestData(from){
				this.getOrderList(from);
				// if(from) this.forbidBottomScroll = true
			},
			// 页面数据
			getOrderList(from) {
				let selfCurrent = this.swiperCurrent
				if(from){
					this.page[selfCurrent] = 1
					this.$set(this.orderList, selfCurrent, [])
				}
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
</style>
