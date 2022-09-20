import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuex from 'vuex'
import Axios from 'axios'
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'




Vue.prototype.$store = store;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}



Vue.use(vuex)
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,

 
  render: h => h(App)
}).$mount('#app')
