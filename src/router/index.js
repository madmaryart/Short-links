import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginComp.vue'
import Register from '../views/RegistrView.vue'
import MainView from '../views/MainView.vue'
import store from '/store'




Vue.use(VueRouter)








const routes = [
  
  {
    path: '/',
      redirect: '/login',
  },
  {
      path: '/login',
      name: 'login',
     
      component: Login
  },
  {
    path: '/main',
    name: 'main',
    meta: { 
      requiresAuth: true
    },
    component: MainView
  }, 
  

  {
    path: '/register',
    name: 'register',
    component: Register
  },
]

const router = new VueRouter({
  routes,

})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
