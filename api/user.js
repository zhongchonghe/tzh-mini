import http from '@/utils/request'
import api from './apiUrl'

// 获取用户信息
export const getUser = () => {
	return http.get(api.getUser)
}
// 用户登录
export const userLogin = (data, opt) => {
	return http.get(api.login, { ...data }, { header: { ...opt } })
}