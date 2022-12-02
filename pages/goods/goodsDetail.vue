<template>
	<view>
		商品详情
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			console.log(e)
		}
	}
</script>

<style lang="scss" scoped>
	.goodsBottomDiv {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 130rpx;
		line-height: 130rpx;
		background: white;
	}

	.toBuyWithPrice {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translate(0, -50%);
		display: inline-block;
		width: 620rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: linear-gradient(90deg, #44495D, #252531);
		box-shadow: 0rpx 15rpx 20rpx 0rpx rgba(59, 63, 81, 0.2);
		border-radius: 49rpx;
		padding: 0 33rpx;
		text-align: left;
		font-size: 40rpx;
		color: #F6C49F;
		overflow: hidden;
	}

	.toBuyImg {
		position: absolute;
		right: 0;
		top: 0;
		width: 222rpx;
		height: 100%;
	}

	.detailShareDiv {
		display: inline-block;
		width: 110rpx;
		height: 100%;
		text-align: center;
		font-size: 20rpx;
		color: #6B7189;
		line-height: 1.2;
	}

	.shareIcon {
		width: 42rpx;
		height: 42rpx;
		margin: 30rpx auto 0 auto;
	}

	.priceSign {
		font-size: 26rpx;
	}

	.priceDecimal {
		font-size: 30rpx;
	}

	.pristinePrice {
		margin-left: 8rpx;
		font-size: 22rpx;
		text-decoration: line-through;
		color: #8B8F9D;
	}

	.JumpShopDetailDiv {
		position: absolute;
		bottom: 160rpx;
		left: 0;
		right: 0;
		width: 100%;
		height: 70%;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 30rpx 30rpx 0rpx 30rpx;
	}

	.JumpShopBottomDiv {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 160rpx;
		width: 100%;
		background-color: white;
		border: 1px solid #EEEEEE;
	}

	.toBuyButton {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 670rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: linear-gradient(90deg, #44495D, #252531);
		box-shadow: 0rpx 16rpx 27rpx 0rpx rgba(59, 63, 81, 0.26);
		border-radius: 49rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #F6C49F;
		text-align: center;
	}

	.jumpGoodsMsgDiv {
		position: absolute;
		left: 50%;
		top: 30rpx;
		transform: translate(-50%, 0);
		width: 100%;
		height: 210rpx;
		padding: 1rpx 70rpx 1rpx 272rpx;
		background: white;
		z-index: 10;
		overflow: hidden;
	}

	.jumpGoodsImg {
		position: absolute;
		left: 30rpx;
		top: 0;
		width: 210rpx;
		height: 210rpx;
		border-radius: 14rpx;
	}

	.jumpGoodsName {
		position: relative;
		height: 73rpx;
		width: 100%;
		line-height: 36rpx;
		margin: 0 0 10rpx 0;
		font-size: 30rpx;
		color: #161628;
		overflow: hidden;
	}

	.jumpGoodsPrice {
		margin-top: 10rpx;
		font-size: 38rpx;
		font-weight: bold;
		color: #161628;
	}

	.jumpPriceSign {
		font-size: 30rpx;
	}

	.jumpGoodsSelSpec {
		font-size: 24rpx;
		color: #8B8F9D;
		height: 61rpx;
		line-height: 30rpx;
		overflow: hidden;
	}

	.goodsSpecDiv {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.goodsSpecScroll {
		position: relative;
		padding: 210rpx 0 50rpx 0;
		max-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}


	.goodsSpecLabel {
		position: relative;
		margin: 30rpx 0 0 0;
		font-size: 28rpx;
		font-weight: bold;
		color: #161628;
	}

	.SpecNoSel {
		margin: 34rpx 20rpx 0 0;
		display: inline-block;
		height: 64rpx;
		line-height: 64rpx;
		padding: 0 70rpx;
		color: #161628;
		background: #F2F4F9;
		border-radius: 32rpx;
		font-size: 24rpx;
	}

	.SpecSel {
		margin: 34rpx 20rpx 0 0;
		display: inline-block;
		height: 64rpx;
		line-height: 64rpx;
		padding: 0 70rpx;
		color: #161628;
		background: #F6C49F;
		border-radius: 32rpx;
		font-size: 24rpx;
	}

	.goodsDestine {
		position: relative;
		width: 750rpx;
		left: -30rpx;
		min-height: 120rpx;
		background: #FFF7EF;
		padding: 15rpx 137rpx 15rpx 80rpx;
		margin-top: 30rpx;
	}

	.destineCoinImg {
		position: absolute;
		right: 0;
		bottom: 0;
		height: 150rpx;
		width: 137rpx;
	}

	.shoppingCart {
		position: fixed;
		right: 0;
		bottom: 140rpx;
		width: 130rpx;
		height: 130rpx;
	}

	.shoppingCart2 {
		position: fixed;
		right: 100rpx;
		bottom: 140rpx;
		width: 130rpx;
		height: 130rpx;
	}

	.goodsNumDiv {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
		width: 280rpx;
		text-align: right;
	}

	.goods- {
		display: inline-block;
		position: relative;
		width: 20rpx;
		height: 50rpx;
		padding: 20rpx 40rpx;
		vertical-align: top;
	}

	.goods-::after {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		content: "";
		width: 20rpx;
		height: 6rpx;
		background: #161628;
		border-radius: 3rpx;
	}

	.goodsNum {
		display: inline-block;
		position: relative;
		width: 100rpx;
		height: 100%;
		background: #F2F4F9;
		border-radius: 4rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #161628;
		text-align: center;
		margin: auto;
	}

	.goodsAdd {
		display: inline-block;
		position: relative;
		width: 20rpx;
		height: 50rpx;
		padding: 20rpx 40rpx;
		vertical-align: top;
	}

	.goodsAdd::before {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		content: "";
		width: 6rpx;
		height: 20rpx;
		background: #161628;
		border-radius: 3rpx;
	}

	.goodsAdd::after {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		content: "";
		width: 20rpx;
		height: 6rpx;
		background: #161628;
		border-radius: 3rpx;
	}

	.buyNumDiv {
		position: relative;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #161628;
		margin-top: 50rpx;
	}

	.garyAM {}

	.garyAM::after {
		background: #f2f4f9;
	}

	.garyAM::before {
		background: #f2f4f9;
	}

	.noQuantity {
		background: #F2F4F9;
		color: #c2c4ca;
	}

	.goodJumpX {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		width: 24rpx;
		height: 24rpx;
		padding: 10rpx;
		z-index: 100;
	}
</style>
