import http from '@/utils/request';
import api from './apiUrl';


export const list = (data) => {
    return http.get(api.list,{...data});
};
export const updateInfo = (data) => {
    return http.post(api.update,{...data});
};

// 首页商品列表
export const goodsList = (data) => {
    return http.get(api.queryGoodsList,{...data});
}
