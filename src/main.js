// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {WEBSOCKET_URL} from './config';
// static (non reactive data)
import VueStatic from 'vue-static'
// Logging related
import VueLogger from 'vuejs-logger';
// utilizing websockets
import VueSocketIO from 'vue-socket.io';
// use the namespaced variant which states clearer which properties are non reactive
Vue.use(VueStatic, {namespaced: true});
const isProduction = process.env.NODE_ENV === 'production';
const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);
// socketIO connection
Vue.use(new VueSocketIO({
  debug: true,
  connection: WEBSOCKET_URL,
}));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
