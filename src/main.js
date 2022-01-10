import Vue from 'vue'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import animate from 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import VueAnalytics from 'vue-analytics'
import VueAnime from 'vue-animejs';

import App from './App.vue'

import VueRouter from 'vue-router'

import router from './router';

// import '@/permission';

Vue.prototype.$echarts = echarts;

Vue.use(VueRouter)

Vue.use(ElementUI, { locale });

Vue.use(animate)

Vue.use(VueAnime)

Vue.use(VueAnalytics, {
  id: 'UA-162454738-1',
  disableScriptLoader: true,
  router,
  autoTracking: {
    screenview: true
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
