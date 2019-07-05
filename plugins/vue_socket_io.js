import VueSocketIO from 'vue-socket.io';
import Vue from 'vue';
import {WEBSOCKET_URL} from "../components/configs/server_settings";

Vue.use(new VueSocketIO({
  debug: true,
  connection: WEBSOCKET_URL,
}));
