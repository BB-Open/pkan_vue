import Vue from 'vue';


if (Vue.prototype.$isServer) {
}
else {
  let Datepicker = require('vuejs-datepicker').Datepicker;
  Vue.directive('Datepicker', Datepicker)
}
