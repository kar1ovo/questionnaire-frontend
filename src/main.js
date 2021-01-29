import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import './plugins/vant.js'

Vue.config.productionTip = false;

Vue.use(Vant);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
