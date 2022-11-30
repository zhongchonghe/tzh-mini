<template>
	<view class="">
		<text>订单</text>
		<tabbar :current="2"></tabbar>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.hideTabBar()
		}
	}
</script>

<style>
</style>