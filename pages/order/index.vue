<template>
	<view class="content">
		<view  class="pageTopForPic" :style="
          'height:' +
          navigationBarHeight +
          'px;line-height:' +
          (navigationBarHeight + statusBarHeight) +
          'px'
        "><text>订单</text></view>
        <view v-if="orderList.length" style="">
            <view class="orderModule" @tap="jumpDetail" v-for="(item) in orderList" :key="item.sn">
                <image :src="'https://images.tingzhihui.com/webh5/liswit/orderListIcon' + item.statu + '.png'" class="orderLabelImg" v-if="item.statu != 9"></image>

                <view class="orderCode">订单号：{{ item.sn }}</view>

                <view class="orderGoodsDiv">
                    <view style="position: relative" v-for="(ele) in (item.orderItems.slice(0,3))" :key="ele.sn">
                        <image src="https://images.tingzhihui.com/webh5/liswit/individuationGoodsLabelS.png" class="individuationGoodsLabelS" v-if="ele.customized"></image>
                        <image :src="ele.image? ele.image : 'https://images.tingzhihui.com/webh5/liswit/defaultPicF.png'" class="orderGoodsImg"></image>
                    </view>

                    <view class="orderGoodsName twoLine" v-if="item.orderItems.length == 1">{{ item.groupName }}</view>
                    <view class="orderGoodsPrice">
                        <text class="orderGoodsPriceChangeSmall">￥</text>
                        {{ formatPrice(1, item.flowPrice) }}
                        <view class="orderGoodsNum">共{{ item.num }}件</view>
                    </view>
                </view>

                <view class="orderGoodsTimeDiv">
                    <image src="https://images.tingzhihui.com/webh5/liswit/orderCutLine.png" class="orderCutLineImg"></image>
                    下单时间：{{ item.createTime }}
                    <view
                        class="orderToPay"
                        @tap.stop.prevent="toPay"
                        :data-statu="item.statu"
                        :data-id="item.sn"
                        :data-type="item.orderType"
                        :data-way="!!item.takeEarPrintWay ? item.takeEarPrintWay : ''"
                        v-if="item.statu == 1 || item.statu == 7"
                    >
                        去支付
                        <image src="https://images.tingzhihui.com/webh5/liswit/blackRightJT.png" class="toPayRightJTImg"></image>
                    </view>
                    <view class="orderSeeDetail" v-if="item.statu != 1 && item.statu != 7">查看详情</view>
                </view>
            </view>
        </view>

        <view v-else style="text-align: center">
            <image class="indexNull" src="https://images.tingzhihui.com/webh5/liswit/orderNull.png"></image>
            <view class="indexNullName">您还未购买任何商品</view>
        </view>

        <!-- <view class="weui-loadmore" style="margin-top: 50%" v-if="isLoading">
            <view class="weui-loading"></view>
            <view class="weui-loadmore__tips">正在加载</view>
        </view> -->

        <view class="JumpShadeDiv" style="padding-top: 65%; text-align: center" v-if="isPay">
            <view class="weui-loading"></view>
            <view class="payWaitTip">支付中...</view>
        </view>

        <view style="height: 150rpx"></view>
        <view :class="isIphoneX && !isIphoneXII ? 'ifIphoneX' : ''"></view>

        <view :class="isIphoneXII ? 'isIphoneXII' : ''"></view>
		<tab :current="2"></tab>

    </view>
</template>

<script>
	import tab from '@/components/tabbar/tabbar.vue'
	import { orderList } from '@/api/order'
	import { isAuth } from '@/utils/auth'
	import { mapState } from 'vuex'
	import { format } from '@/utils/mixin.js'

	const orderStatus=['UNPAID','PAID','UNDELIVERED','DELIVERED','COMPLETED','TO_TAKE_EAR_PRINT','TO_PAY_BALANCE','CUSTOMIZING','TAKE','CANCELLED','???????????','DEPOSIT_PAID']
	export default {
		data() {
			return {
				page: {
					pageNumber: 1,
					pageSize: 10,
				},
				orderList: [],

			}
		},
		components: { tab, },
		mixins: [format],

		computed: { ...mapState({ 
			loginBack: state => state.app.loginBack,
			statusBarHeight: state => state.app.statusBarHeight,
			navigationBarHeight: state => state.app.navigationBarHeight,
		
		
		}), },
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
						this.orderList.push(...res.result.records)
						this.orderList.map(item => {
							let idx = orderStatus.indexOf(item.orderStatus)
							if (idx!=-1) {
								if (idx==11) {
									item.statu = 6
								}else{
									item.statu = idx+1
								}
							}
							item.num = item.orderItems.reduce((total, item) => {
								return total + parseInt(item.num)
							}, 0)
						})
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
			},
			jumpDetail(){

			}
		},
	}
</script>

<style>
page{
	background: #f2f4f9
}
</style>
<style  scoped>

@import './order.css';
</style>
