import Vue from 'vue';

import Datepicker from 'vuejs-datepicker';

if (Vue.prototype.$isServer) {
}
else {
  Vue.directive('Datepicker', Datepicker)
}
