import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import App from './App.vue'
import router from './router.js'
import BaiduMap from 'vue-baidu-map'
import Axios from 'axios'


Vue.prototype.$api = Axios
Axios.defaults.baseURL = 'http://192.168.50.143:99'
// Axios.defaults.headers.post['Content-Type'] = 'application/json';


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


Vue.use(ElementUI);
Vue.use(BaiduMap, { ak: 'ZR5QNTGMEwa1j7HiPjg3BRw82zLAcnOV' });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
