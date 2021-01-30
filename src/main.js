import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "./plugins/vant.js";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(Vant);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
