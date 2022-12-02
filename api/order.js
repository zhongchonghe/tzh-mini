import http from '@/utils/request';
import api from './apiUrl';


// 获取订单列表
export const orderList = (data) => {
    return http.get(api.orderList,{...data});
}
