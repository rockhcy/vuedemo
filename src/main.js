import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
