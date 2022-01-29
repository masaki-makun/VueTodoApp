import Vue from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret,faTrashAlt,faCheckSquare,faCheck } from '@fortawesome/free-solid-svg-icons';
Vue.component('fa-icon', FontAwesomeIcon);

library.add(faUserSecret,faTrashAlt,faCheckSquare,faCheck);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
