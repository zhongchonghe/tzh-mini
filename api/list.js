import http from '@/utils/request'
import api from './apiUrl'


// 首页商品列表
export const goodsList = data => {
	return http.get(api.queryGoodsList, { ...data }, { 'isToken': false })
}
