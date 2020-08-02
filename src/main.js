import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { router } from './_helpers'
import { store } from './_store';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use("moment");

export const mediaListBus = new Vue();


axios.defaults.baseURL = "https://localhost:44341/api"

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
