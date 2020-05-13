<template>
  <div class="picker boxed_selector">
    <div class="DateSelector">
      <form @submit.prevent="">
        <label class="biglabel">{{ label }}</label><br/>
        <label for="start_input" :aria-label="'Startdatum wählen ' + format">Von: </label>
        <client-only>
        <datepicker v-model="value_start" :placeholder="'Datum wählen ' + format"
                    :key="vuex_ns + vuex_ns + 'datepicker_start'"
                    :monday-first="true" :language="lang" input-class="date_input" calender-class="calender_input"
                    :format="format" :typeable="true" id="start_input"></datepicker>
        </client-only>
        <label for="end_input" :aria-label="'Enddatum wählen ' + format">Bis:</label>
        <client-only><datepicker v-model="value_end" :placeholder="'Datum wählen ' + format"
                    :key="vuex_ns + vuex_ns + 'datepicker_end'"
                    :monday-first="true" :language="lang" input-class="date_input" calender-class="calender_input"
                    :format="format" :typeable="true" id="end_input"></datepicker>
        </client-only>
        <button type="button" class="button" @click="reset()" aria-label="Zurück setzen für die Datumsfelder">Zurück
          setzen
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  let Datepicker = {};
  let locale = {};
  if (Vue.prototype.$isServer === false) {
      console.log('isServer');
      Datepicker = require('vuejs-datepicker/dist/vuejs-datepicker');
      locale = require('vuejs-datepicker/dist/locale/translations/de');
  }
  import {DATE_DISPLAY_FORMAT} from '../mixins/utils';
  import {EV} from "../configs/events";

  export default {
    name: 'DatePicker',
    components: {
      Datepicker
    },
    props: ['label', 'vuex_ns', 'vuex_prop'],
    data() {
      return {
        format: DATE_DISPLAY_FORMAT,
        lang: locale,
      };
    },
    computed: {
      value_start: {
        set: function (value) {
          this.set_picked_date(value, this.value_end);
        },
        get: function () {
          return this.picked_date()[0]
        }
      },
      value_end: {
        set: function (value) {
          this.set_picked_date(this.value_start, value);
        },
        get: function () {
          return this.picked_date()[1]
        }
      },
    },

    methods: {
      picked_date() {
        return this.$store.ep_get(this.vuex_ns, this.vuex_prop)
      },
      set_picked_date(date_start, date_end) {
        this.$store.ep_set(this.vuex_ns, this.vuex_prop, [date_start, date_end]);
      },
      reset() {
        this.set_picked_date(null, null)
      }

    }
  };
</script>

<style scoped>
  .DateSelector {
    padding-top: 8px;
  }

  .DateSelector label {
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
