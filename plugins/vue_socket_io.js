require("babel-polyfill");

import VueSocketIO from "vue-socket.io";
import Vue from "vue";
import { server_settings } from "../components/configs/server_settings";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: server_settings.WEBSOCKET_URL
  })
);
