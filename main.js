import App from './App'

import Vue from 'vue'
import store from './store'
import uView from "uview-ui";
import tabbar from './components/tabbar/tabbar'

Vue.use(uView);
Vue.use('tab-bar',tabbar)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
