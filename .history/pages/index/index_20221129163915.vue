<template>
	<view class="content">
		<text>首页</text>
	</view>
</template>

<script>
// 引入mapState
import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		// 使用mapState
		computed: {
			...mapState({
				// 箭头函数可使代码更简练
				count: state => state.count
			})
		},
		onLoad() {
		
			
			
		 // #ifdef H5
		console.log("h5");
		// #endif
		// #ifdef MP
		console.log("小程序");
		// #endif
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
