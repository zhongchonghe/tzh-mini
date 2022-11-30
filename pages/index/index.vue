<template>
	<view>
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
		<view class="content" :style="'margin-top:'+(navigationBarHeight-1 )+'px'">
			<!-- 背景 -->
			<view style="position: relative">
				<image mode="w" src="https://images.tingzhihui.com/webh5/liswit/indexTop.png" class="indexTop"></image>
				<image mode="wi" src="https://images.tingzhihui.com/webh5/liswit/indexTopBorder.png"
					class="indexTopBorder"></image>
			</view>
		</view>
		<tabbar :current="0"></tabbar>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
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

			};
		},
		computed: {
			...mapState({
				platform: (state) => state.app.platform,
			}),
		},
		onLoad() {
			// 获取状态栏高度
			// uni.getSystemInfo({
			//   success: (res) => {
			//     this.statusBarHeight = res.statusBarHeight;
			//     console.log(this.statusBarHeight);
			//     let custom = wx.getMenuButtonBoundingClientRect();
			// 	this.custom = custom;
			// 	this.customBar = custom.bottom + custom.top - res.statusBarHeight;

			//   },
			// });
			uni.getSystemInfo({
				success: (data) => {
					let custom = wx.getMenuButtonBoundingClientRect();
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
			goodsList({
				isAuth:"PASS" ,
      marketEnable:"UPPER" ,
      recommend:true ,
      pageSize:10 ,
      pageNumber: 1
			}).then((res) => {
				console.log(res);
				this.shopArray = res.data;
			});
		},
		// 监听屏幕滚动
		onPageScroll(e) {
			if (e.scrollTop > 0) {
				this.ifScollTop = false;
			} else {
				this.ifScollTop = true;
			}
		},

		methods: {
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
</style>
