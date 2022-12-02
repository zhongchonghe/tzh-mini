<template>
	<view class="">
		<text>订单1</text>
		<tabbar :current="2"></tabbar>
	</view>
</template>

<script>
	import { orderList } from '@/api/order'
	import { isAuth } from '@/utils/auth'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				page: {
					pageNumber: 1,
					pageSize: 10,
				}
			}
		},
		computed: { ...mapState({ loginBack: state => state.app.loginBack, }), },
		onLoad() {
			uni.hideTabBar()

		},
		onShow() {
			// isAuth()
			this.getList()
		},

		methods: {
			getList() {
				orderList(this.page).then(res => {
					if (res.success) {
						var data = res.result.records
						if (this.data.page == 1 && data.length == 0) {
							this.setData({ ifNull: true, })
						} else {
							this.setData({ ifNull: false, })
						}
						if (res.result.pages == this.data.page) {
							this.setData({ ifEnd: true, })
						}
						for (let i = 0; i < data.length; i++) {
							if (data[i].orderStatus == 'UNPAID') {
								//待支付 orderListIcon1
								data[i].statu = 1
							} else if (data[i].orderStatus == 'PAID') {
								//已付款 orderListIcon2
								data[i].statu = 2
							} else if (data[i].orderStatus == 'UNDELIVERED') {
								//待发货 orderListIcon3
								data[i].statu = 3
							} else if (data[i].orderStatus == 'DELIVERED') {
								//已发货 orderListIcon4
								data[i].statu = 4
							} else if (data[i].orderStatus == 'COMPLETED') {
								//已完成 orderListIcon5
								data[i].statu = 5
							} else if (data[i].orderStatus == 'TO_TAKE_EAR_PRINT' || data[i].orderStatus == 'DEPOSIT_PAID') {
								//待取耳印 orderListIcon6
								data[i].statu = 6
							} else if (data[i].orderStatus == 'TO_PAY_BALANCE') {
								//待付尾款 orderListIcon7
								data[i].statu = 7
							} else if (data[i].orderStatus == 'CUSTOMIZING') {
								//定制中 orderListIcon8
								data[i].statu = 8
							} else if (data[i].orderStatus == 'TAKE') {
								//待核验 orderListIcon9
								data[i].statu = 9
							} else if (data[i].orderStatus == 'CANCELLED') {
								//已取消 orderListIcon10
								data[i].statu = 10
							} else if (data[i].orderStatus == '???????????') {
								//已退款 orderListIcon11
								data[i].statu = 11
							}
							var num = 0
							for (let j = 0; j < data[i].orderItems.length; j++) {
								num = num + parseInt(data[i].orderItems[j].num)
							}
							data[i].num = num
						}
						if (type != 0 && this.data.orderList.length > 0) {
							data = this.data.orderList.concat(data)
						}
						this.setData({
							isLoading: false,
							orderList: data,
						})
						//Request URL: https://apiwx1.dev.tingzhihui.com:8888/buyer/cashier/tradeDetail?orderType=TRADE&sn=T202201141481817229870759936&clientType=PC
					}
				}).catch(ex => {
					if (ex.status == 403 || ex.message == '用户未登录') {
						console.log('用户未登录')

						// if (this.data.loginBack) {
						// 	this.setData({ loginBack: false, })
						// 	wx.switchTab({ url: '/pages/index/index', })
						// } else {
						// 	wx.navigateTo({ url: '../login/login', })
						// }
						if (this.loginBack) {
							this.$store.dispatch('setLoginBack', false)

							uni.switchTab({ url: '/pages/index/index', })
						} else {
							uni.navigateTo({ url: '/pages/login/login', })
						}

					} else {
						console.log(ex.message)
						app.showMsg(ex.message)
					}
				})
			}
		},
	}
</script>

<style>
</style>
