<template>
	<view class="container">
		<view class="head">
			<view v-show="ifScollTop" :class="'indexTopFixedBack'" :style="'height:' + navigationBarHeight + 'px'">
			</view>
			<view v-show="!ifScollTop" class="pageTopForPic" :style="
          'height:' +
          navigationBarHeight +
          'px;line-height:' +
          (navigationBarHeight + statusBarHeight) +
          'px'
        "><text>听智慧-私人定制耳机</text></view>
		</view>
		<view class="content" :style="'margin-top:' + (navigationBarHeight - 1) + 'px'">
			<!-- 背景 -->
			<view style="position: relative">
				<image mode="widthFix" src="https://images.tingzhihui.com/webh5/liswit/indexTop.png" class="indexTop">
				</image>
				<image mode="widthFix" src="https://images.tingzhihui.com/webh5/liswit/indexTopBorder.png"
					class="indexTopBorder"></image>

				<image src="https://images.tingzhihui.com/webh5/liswit/indexTopUser.png" v-if="loginUser"
					class="indexTopUser"></image>
				<view class="userDiv" v-if="loginUser">
					<image mode="aspectFill" :src="headFace" class="userImg" alt="" @tap="jumpMyCenter"></image>
					<view class="welcomeText" @tap="jumpMyCenter">欢迎回来</view>
					<view class="nameText" @tap="jumpMyCenter">{{ userName }}</view>
					<view class="userOrderMsg" v-if="!!orderName" @tap="jumpOrder">
						<image src="https://images.tingzhihui.com/webh5/liswit/indexOrderImg.png" class="indexOrderImg">
						</image>
						您的订单{{ orderName }}
						<image src="https://images.tingzhihui.com/webh5/liswit/goldRightJT.png" class="goldRightJT">
						</image>
					</view>
				</view>
			</view>

			<!-- 商品列表 -->
			<view v-if="shopArray.length">
				<view class="indexEarModule" @tap="jumpGoods(item.id,item.skuList[0].id)" v-for="item in shopArray" :key="item.id">
					<image v-if="item.customized"
						src="https://images.tingzhihui.com/webh5/liswit/individuationGoodsLabel.png"
						class="individuationGoodsLabelImg"></image>

					<image :src="item.original" class="indexEarImg" mode="aspectFill"></image>

					<view class="indexEarName twoLine">{{ item.goodsName }}</view>

					<view class="indexEarPrice">
						<text style="font-size: 26rpx">￥</text>
						{{ formatPrice(1, item.price) }}
					</view>
				</view>
			</view>
			<view v-else style="text-align: center">
				<image class="indexNull" src="https://images.tingzhihui.com/webh5/liswit/indexNull.png"></image>
				<view class="indexNullName">暂无商品</view>
			</view>
		</view>
		<view style="height: 150rpx"></view>
		<view :class="isIphoneX && !isIphoneXII ? 'ifIphoneX' : ''"></view>
		<view :class="isIphoneXII ? 'isIphoneXII' : ''"></view>
		<u-toast ref="uToast"></u-toast>
		<tab :current="0"></tab>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";

	import tab from "@/components/tabbar/tabbar.vue";
	import unlogin from "@/static/images/user-unlogin.png";
	// import { formatPrice } from '@/utils/index.js'
	import {
		getUser
	} from "@/api/user.js";

	import {
		format
	} from "@/utils/mixin.js";
	import {
		list,
		updateInfo,
		goodsList
	} from "@/api/list";
	export default {
		data() {
			return {
				ifScollTop: true,
				statusBarHeight: 0,
				navigationBarHeight: 0,
				shopArray: [],
				total: 0,
				userName: "",
				headFace: "",
				loginUser: false,
			};
		},
		components: {
			tab,
		},
		mixins: [format],
		computed: {
			...mapState({
				platform: (state) => state.app.platform,
				isIphoneX: (state) => state.app.isIphoneX,
				isIphoneXII: (state) => state.app.isIphoneXII,
			}),
		},
		onLoad() {
			console.log("this.isIphoneX");
			console.log(this.isIphoneX);
			console.log("this.isIphoneXII");
			console.log(this.isIphoneXII);
			// 判断当前设备
			uni.getSystemInfo({
				success: (data) => {
					let custom = uni.getMenuButtonBoundingClientRect();
					this.statusBarHeight = data.statusBarHeight;
					//导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度。
					this.navigationBarHeight =
						custom.bottom + custom.top - data.statusBarHeight;
					console.log(this.navigationBarHeight);
				},
			});
			uni.hideTabBar();
			// list({
			//   id: "1594656313760157696",
			// }).then((res) => {
			//   console.log(res);
			// });
			// updateInfo({
			//   id: "1597780061174501376",
			//   duration: 5,
			// }).then((res) => {
			//   console.log(res);
			// });
			// #ifdef H5
			console.log("h5");
			// #endif
			// #ifdef MP
			console.log("小程序");
			// #endif

			this.getList();
			this.getUser();
		},
		// 监听屏幕滚动
		onPageScroll(e) {
			if (e.scrollTop > 0) {
				this.ifScollTop = false;
			} else {
				this.ifScollTop = true;
			}
		},

		onReady() {},

		methods: {
			// 获取商品列表
			async getList() {
				const {
					code,
					result
				} = await goodsList({
					isAuth: "PASS",
					marketEnable: "UPPER",
					recommend: true,
					pageSize: 10,
					pageNumber: 1,
				});
				if (code != 200) return;
				this.total = result.total;
				this.shopArray = result.records;
			},
			// 获取用户信息
			async getUser() {
				try {
					const {
						code,
						result,
						success
					} = await getUser();
					if (success && !!result) {
						// 有用户信息
						(this.userName = !!res.result.nickName ? res.result.nickName : ""),
						(this.headFace = !!res.result.face ? res.result.face : unlogin),
						(this.loginUser = true);
						this.queryLastOrder();
					} else if (success) {
						this.userName = "";
						this.headFace = unlogin;
						this.loginUser = true;
						this.queryLastOrder();
					}
				} catch (ex) {
					if (ex.status == 403 || ex.message == "用户未登录") {
						this.loginUser = false;
					} else {
						this.$u.toast("网络开小差了，请稍后再试");
					}
				}
			},
			// 商品详情
			jumpGoods(id,skuid) {

				uni.navigateTo({
					url: `/pages/goods/goodsDetail?id=${id}&skuid=${skuid}`,
				});
			},
			switch () {},
			change() {},
		},
	};
</script>

<style scoped lang="scss">
	.head {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.topNeatBangFixed {
		position: fixed;
		background: white;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 100;
		color: black;
	}

	.indexTopFixedBack {
		background-image: url("https://images.tingzhihui.com/webh5/liswit/indexTopFixed.png");
		background-repeat: no-repeat;
		background-size: 101% 101%;
	}

	.pageTopForPic {
		position: fixed;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: black;
		background: #ffffff;
	}

	.content {

		// margin-bottom: 100px;
		.indexTop {
			width: 100%;
			height: 330rpx;
			z-index: 1;
		}

		.indexTopBorder {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			z-index: 5;
		}
	}

	.indexEarModule {
		position: relative;
		width: 690rpx;
		min-height: 538rpx;
		max-height: 578rpx;
		margin: 30rpx auto 0 auto;
		padding-bottom: 1rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		/* overflow: hidden; */
		background-color: white;

		.individuationGoodsLabelImg {
			position: absolute;
			left: 23rpx;
			top: -6rpx;
			width: 160rpx;
			height: 56rpx;
			z-index: 10;
		}

		.indexEarImg {
			width: 100%;
			height: 388rpx;
			background-color: #b4b4b4;
			border-radius: 20rpx 20rpx 0 0;
		}

		.indexEarName {
			margin-top: 20rpx;
			font-size: 34rpx;
			max-height: 80rpx;
			line-height: 40rpx;
			overflow: hidden;
			padding: 0 10px;
		}

		.indexEarPrice {
			margin-top: 5rpx;
			margin-bottom: 30rpx;
			padding: 0 10px;
			font-size: 34rpx;
			font-weight: bold;
		}
	}

	.indexNull {
		position: relative;
		margin-top: 80rpx;
		width: 330rpx;
		height: 330rpx;
	}

	.indexNullName {
		position: relative;
		top: -30rpx;
		font-size: 30rpx;
		color: #6b7189;
	}

	.indexTopUser {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
		width: 630rpx;
		height: 127rpx;
		z-index: 4;
	}

	.userDiv {
		position: absolute;
		top: 215rpx;
		left: 50%;
		transform: translate(-50%, 0);
		width: 630rpx;
		height: 76rpx;
		padding-left: 120rpx;
		z-index: 6;
	}

	.userImg {
		position: absolute;
		left: 30rpx;
		bottom: 0;
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
		background-color: #f2f4f9;
		border: 1rpx solid #f2f4f9;
	}

	.welcomeText {
		margin-top: 7rpx;
		font-size: 24rpx;
		color: #b56b47;
	}

	.nameText {
		font-size: 26rpx;
		font-weight: bold;
		color: #161628;
	}

	.userOrderMsg {
		position: absolute;
		right: 16rpx;
		top: 50%;
		transform: translate(0, -50%);
		color: #b56b47;
		font-size: 24rpx;
		height: 24rpx;
		line-height: 26rpx;
	}

	.indexOrderImg {
		width: 25rpx;
		height: 25rpx;
		vertical-align: middle;
	}

	.goldRightJT {
		position: relative;
		top: 5rpx;
		width: 20rpx;
		height: 20rpx;
		vertical-align: top;
	}
</style>
