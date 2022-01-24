import Vue from "vue";
import App from "@/views/App/index.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import '@/assets/vuesax.css'

Vue.use(Vuesax)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
