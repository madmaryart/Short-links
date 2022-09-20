import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    order: 'asc_short',
    offset: 0,
    limit: 10,
    statObjFull: [],
    statObj: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    setNewOrder(state, newOrder){
      state.order = newOrder
    },
    setNewOffset(state, newOffset){
      state.offset = newOffset
      console.log(state.offset)
    },
    setNewLimit(state, selected){
      state.limit = selected
      console.log(state.limit)
    },
    auth_request(state, token){
      state.status = 'loading'
      state.token = token
    },
    squeez_request(state, longLink, token){
      state.longLink = longLink
      state.token = token 
    },
    stat_request(state, token){
      state.token = token
    },
    count_request(state, token){
      state.token = token
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user  
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://79.143.31.216/login', data: qs.stringify(user), headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer" + ' ' + token
          console.log(resp)
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://79.143.31.216/register?username=' + user.name + '&password=' + user.password, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = "Bearer" + ' ' + localStorage.getItem('token')
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
     },
     logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
     },
     squeeze({commit}, longLink){
      return new Promise((resolve) => {
        commit('squeez_request')
        axios.defaults.headers.common['Authorization'] = "Bearer" + ' ' + localStorage.getItem('token')
        axios({url: 'http://79.143.31.216/squeeze?link=' + longLink, method: 'POST' })
        .then(resp => { 
          const respObj = resp.data.short
          console.log(respObj)
          resolve(resp)
        })  
      })
    },
    stat({commit, state}){
      return new Promise((resolve) => {
        commit('stat_request')
        axios.defaults.headers.common['Authorization'] = "Bearer" + ' ' + localStorage.getItem('token')  
        axios({url: 'http://79.143.31.216/statistics?offset=0&limit=0', method: 'GET' })
        .then(resp => {
          this.state.statObjFull = resp.data
        })
        axios({url: 'http://79.143.31.216/statistics?offset=' + state.offset + '&limit=' + state.limit + '&order=' + state.order, method: 'GET' })
        .then(resp => { 
         console.log(resp.data)
          this.state.statObj = resp.data
          resolve(resp)
        })  
      })
    },    
  }
})

export default store
