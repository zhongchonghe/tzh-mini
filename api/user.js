import http from '@/utils/request';
import api from './apiUrl';

// 获取用户信息
export const getUser = () => {
    return http.get(api.getUser,{});
}
