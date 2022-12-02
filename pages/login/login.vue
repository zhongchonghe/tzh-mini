<template>
  <view>
    <!-- listen_store/pages/login/login.wxml -->

    <view class="loginLabel">
      <image
        src="https://images.tingzhihui.com/webh5/liswit/ListenWisdom.png"
        class="ListenWisdom"
      ></image>
    </view>
    <view class="inputDivWisdom">
      <image
        src="https://images.tingzhihui.com/webh5/liswit/loginPhone.png"
        class="loginPhone"
      ></image>
      <input
        class="inputSty"
        placeholder="请输入手机号"
        maxlength="11"
        @input="inputUsername"
      />
    </view>
    <view class="errLabel"><text v-if="errName">请输入11位手机号</text></view>
    <view class="inputDivWisdom">
      <image
        src="https://images.tingzhihui.com/webh5/liswit/loginCode.png"
        class="loginCode"
      ></image>
      <input
        class="inputPass"
        placeholder="请输入验证码"
        maxlength="8"
        @input="inputPassword"
      />
      <text @tap="getCode" :class="codeIf ? 'getCode' : 'getCodeGray'">{{
        codeGet
      }}</text>
      <!-- getCode  getCodeGray -->
    </view>
    <view class="errLabel"><text v-if="errPass">请输入正确的验证码</text></view>

    <button
      :class="canLogin ? 'loginButton' : 'loginButtonGray'"
      open-type="getUserInfo"
      @getuserinfo="loginWithCode"
    >
      登录/注册
    </button>
    <!-- <button class="loginButton" bindtap="requestSubscribe">测试</button>
<button class="loginButton" bindtap="requestSubscribe2">测试2</button> -->
    <view class="loginExplain">
      <image
        @tap="bindAgreeChange"
        :src="
          'https://images.tingzhihui.com/webh5/liswit/' +
          (isAgree ? 'selBlackGold' : 'noSelBlackGold') +
          '.png'
        "
        class="selBlackGold"
      ></image>
      我已阅读并同意
      <text style="color: #eb7823" data-name="USER_AGREEMENT" @tap="getProtocol"
        >《用户协议》</text
      >
      和
      <text style="color: #eb7823" data-name="PRIVACY_POLICY" @tap="getProtocol"
        >《隐私政策》</text
      >
    </view>
    <button class="longinWithWeixin" @tap="jumpPhoneFun">
      <image
        class="longinWeixinIcon"
        src="https://images.tingzhihui.com/webh5/liswit/weChart.png"
      ></image>
      微信授权登录
    </button>

    <!-- <button type="default" open-type="getPhoneNumber">获取手机号</button> -->
    <u-popup :show="jumpPhone" @close="close" :round="10" mode="bottom">
      <view class="popBot">
        <view>
          <view class="getUserMsgLabel">
            <image
              class="roundLogoImg"
              src="https://images.tingzhihui.com/webh5/liswit/smallLogo.png"
              mode="aspectFill"
              role="img"
            ></image>
            听智慧申请
          </view>
          <view class="authorizedLabel"
            >请授权获取您微信手机号，以便快速为您绑定会员帐号。</view
          >
          <view class="agreeButtonDiv">
            <image
              class="agreeButtonIcon"
              :src="
                'https://images.tingzhihui.com/webh5/liswit/' + selGou + '.png'
              "
              @tap="bindAgreeChange"
            ></image>

            阅读并同意
            <navigator
              url="../register/registerProtocol"
              class="agreeButtonJump"
              data-name="USER_AGREEMENT"
              @tap="getProtocol"
              >《用户协议》</navigator
            >
          </view>
          <button
            class="agreeButton"
            open-type="getPhoneNumber"
            @getphonenumber="bindGetUserInfo"
          >
            微信一键登录
          </button>
        </view>
      </view>
    </u-popup>
    <!-- <view class="jumpBack" v-if="jumpPhone">
			<view class="closeDiv" @tap="closePhoneJump"></view>
			<view class="jumpInPhone">
				<view class="loading"></view>

				<view>
					<view class="getUserMsgLabel">
						<image class="roundLogoImg" src="https://images.tingzhihui.com/webh5/liswit/smallLogo.png" mode="aspectFill" role="img"></image>
						听智慧申请
					</view>
					<view class="authorizedLabel">请授权获取您微信手机号，以便快速为您绑定会员帐号。</view>
					<view class="agreeButtonDiv">
						<image class="agreeButtonIcon" :src="
                'https://images.tingzhihui.com/webh5/liswit/' + selGou + '.png'
              " @tap="bindAgreeChange"></image>
						
						阅读并同意
						<navigator url="../register/registerProtocol" class="agreeButtonJump" data-name="USER_AGREEMENT" @tap="getProtocol">《用户协议》</navigator>
					</view>
					<button class="agreeButton" open-type="getPhoneNumber" @getphonenumber="bindGetUserInfo">
						微信一键登录
					</button>
				</view>
			</view>
		</view> -->

    <!-- <view class="jumpBack" v-if="jumpShow">
			<view class="mainBack">
				<view class="jumpLabel">请授权以下权限：</view>
				<view class="cueDiv">请在弹出的页面勾选“总是保持本次选择，不再询问”</view>
				<view class="serCueMsgDiv" @tap="requestSubscribe">服务提醒授权</view>
				<view class="serCueMsgDiv" @tap="requestSubscribe2">到店提醒授权</view>
				<view class="bottonTrueDiv" @tap="jumpNextPage">确定</view>
			</view>
		</view> -->

    <view class="JumpShadeDiv" v-if="jumpProtocol">
      <view class="articleDiv">
        <view class="articleTitle">{{ protocol.name }}</view>
        <view class="articleContent">
          <rich-text :nodes="protocol.content"></rich-text>
        </view>
        <image
          src="https://images.tingzhihui.com/webh5/liswit/articleX.png"
          class="articleX"
          @tap="closeJumpProtocol"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import { userLogin } from "@/api/user";
export default {
  data() {
    return { jumpPhone: false, selGou: "", code: "" };
  },
  onLoad() {
    this.loginWeiXin();
  },
  onShow() {
    this.$store.dispatch("setLoginBack", true);
  },
  methods: {
    loginWeiXin() {
      uni.login({
        success: (res) => {
          this.code = res.code;
          console.log(res.code);
        },

        fail: function (e) {},
      });
    },
    jumpPhoneFun() {
      this.jumpPhone = true;
    },
    close() {
      this.jumpPhone = false;
      // console.log('close');
    },
    bindGetUserInfo(e) {
      console.log(e);
      console.log("============");
      if (this.code) {
        this.oneKeyLogin(e, this.code);
      }
    },
    bindAgreeChange(e) {
      console.log(e);
    },
    oneKeyLogin(e, ev) {
      const uuid = this.wxuuid(32);

      if (!e.detail.encryptedData) {
        return;
      }
      //   if (!this.data.isAgree) {
      //     app.showMsg("请先阅读并同意用户隐私协议");
      //     return;
      //   }
      const params = {
        code: ev,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        image:
          "https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132",
        nickName: "%E5%BE%AE%E4%BF%A1%E7%94%A8%E6%88%B7",
      };
      userLogin(params, {
        "Content-Type": "application/json;charset=UTF-8",
        uuid: uuid,
        clientType: "WECHAT_MP",
      }).then((res) => {
        console.log(res);
        this.jumpPhone = false
        uni.setStorageSync("accessToken", res.result.accessToken);
        uni.setStorageSync("refreshToken", res.result.refreshToken);
        uni.setStorageSync("uuid", uuid);
        uni.navigateBack();

      });
    },
    wxuuid(len) {
      var num = "";
      var userNum = "0123456789abcdefghijkmlnopqrstuvwxyz";
      for (var i = 0; i < len; i++) {
        num = num + userNum.charAt(parseInt(Math.random() * 36) - 1);
      }
      return num;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./login.css";
</style>
