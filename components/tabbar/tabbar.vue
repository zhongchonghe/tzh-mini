<template>
	<view v-if="isShow">
		<u-tabbar :value="current?current:0" @change="changeTab" :fixed="true" :placeholder="false"
			:safeAreaInsetBottom="true" :border="false">
			<u-tabbar-item v-for="(item,index) in list" :key="index" :text="item.text">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.iconPath"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.selectedIconPath"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			current: Number,
		},
		data() {
			return {
				isShow: true,
				list: [{
						selectedIconPath: "../../static/tabbar/indexOn.png",
						iconPath: "../../static/tabbar/index.png",
						text: '首页',
						customIcon: false,
						pagePath: "pages/index/index",
					},
					{
						selectedIconPath: "../../static/tabbar/customServiceOn.png",
						iconPath: "../../static/tabbar/customService.png",
						text: '客服',
						customIcon: false,
						pagePath: "pages/customer/index",
					},
					{
						selectedIconPath: "../../static/tabbar/orderOn.png",
						iconPath: "../../static/tabbar/order.png",
						text: '订单',
						customIcon: false,
						pagePath: "pages/order/index",
					}
				],
			}
		},
		created() {
			//隐藏原生tabbar
			uni.hideTabBar()
			// #ifdef H5
			// 去掉tabBar
			this.isShow = false
			// #endif
		},
		methods: {
			changeTab(e) {
				console.log(e)
				uni.switchTab({
					url: '/' + this.list[e].pagePath,
				})
			}
		}
	}
</script>

<style scoped>
	.u-page__item__slot-icon {
		width: 20px !important;
		height: 20px !important;
	}
</style>
