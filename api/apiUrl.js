//  api地址
export default {
    login: '/buyer/mini-program/auto-login',
    queryGoodsList: '/buyer/goods',
    loginOut: '/buyer/members/logout',
    keepLogin: '/buyer/members/refresh/',
    queryGood: '/buyer/goods/sku/',
    buyNow: '/buyer/trade/carts',
    affirmOrder: '/buyer/trade/carts/checked',
    cartThings: '/buyer/trade/carts/all',
    ALLcheck: '/buyer/trade/carts/sku/checked',
    changeStore: '/buyer/trade/carts/store/',
    changeSku: '/buyer/trade/carts/sku/checked/',
    changeSkuNum: '/buyer/trade/carts/sku/num/',
    disposeAddr: '/buyer/memberAddress',
    selAddrToBuy: '/buyer/trade/carts/shippingAddress',
    changeAddr: '/buyer/orders/update/consignee/',
    queryAddrByID: '/buyer/memberAddress/get/',
    queryToHomeTime: '/buyer/workOrder/getToHomeReserveTime',
    queryToShopTime: '/buyer/workOrder/getToStoreReserveTime',
    queryShopListByCity: '/buyer/shop/list',
    createOrder: '/buyer/trade/carts/create/trade',
    pay: '/buyer/cashier/pay/',
    orderList: '/buyer/orders',
    orderDetail: '/buyer/orders/',
    shopDetail: '/buyer/shop/detail/',
    getUser: '/buyer/members',
    changeUser: '/buyer/members/editOwn',
    delAddr: '/buyer/memberAddress/delById/',
    getLastOrder: '/buyer/orders/latest/ing',
    saveChangeWord: '/buyer/workOrder/update/',
    queryChangeOrder: '/buyer/workOrder/byOrderSn/',
    saveChangeGetEar: '/buyer/workOrder/update/',
    saveReceipt: '/buyer/trade/carts/select/receipt',
    getReceipt: '/buyer/trade/receipt/',
    saveAssess: '/buyer/memberEvaluation/batch',
    verificationToHome: '/buyer/trade/carts/toHome/check',
    queryProtocol: '/buyer/article/type/',
    loginWithCode: '/buyer/mini-program/sms-login',
    addrQueryIDByName: '/common/region/region/adCode',
    queryAllCity: '/common/region/queryCityList',
    upFile: '/common/upload/file',
    upFileForSmall: '/common/upload/file/applets',
    getLoginCode: '/common/sms/'
}