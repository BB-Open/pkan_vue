import VueSocketIO from 'vue-socket.io';
import {WEBSOCKET_URL} from '../components/config';
import Vue from 'vue';

Vue.use(new VueSocketIO({
  debug: true,
  connection: WEBSOCKET_URL,
}));
