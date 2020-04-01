import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification'

import {router} from './helpers';
import {store} from './store';
import App from './App';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@/assets/scss/main.scss';


Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
Vue.config.silent = true;
