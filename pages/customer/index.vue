<template>
<view class="">
	<text>客服</text>
	<tabbar :current="1"></tabbar>
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