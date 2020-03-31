<template>
  <div class="picker">
    <div class="DateSelector">
      <label>{{ this.label }}</label><br/>
      <label for="start_input">Von: </label>
      <datepicker v-model="value_start" :placeholder="'Datum wählen ' + format" :key="namespace + property + 'datepicker_start'"
                  :monday-first="true" :language="lang" input-class="date_input" calender-class="calender_input"
                  :format="format" :typeable="true" id="start_input"></datepicker>
      <label for="end_input">Bis:</label>
      <datepicker v-model="value_end" :placeholder="'Datum wählen ' + format" :key="namespace + property + 'datepicker_end'"
                  :monday-first="true" :language="lang" input-class="date_input" calender-class="calender_input"
                  :format="format" :typeable="true" id="end_input"></datepicker>
      <button type="button" class="button" @click="reset()" aria-label="Hier setzen sie die Datumsfelder zurück.">Zurück setzen</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {DATE_DISPLAY_FORMAT} from '../mixins/utils';
  import {EV} from "../configs/events";
  import {de} from 'vuejs-datepicker/dist/locale'

  export default {
    name: 'DatePicker',
    components: {
      Datepicker
    },
    props: ['label', 'namespace', 'property'],
    data() {
      return {
        format: DATE_DISPLAY_FORMAT,
        lang: de,
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
        return this.$store.state[this.namespace][this.property]
      },
      set_picked_date(date_start, date_end) {

        this.$store.ep_commit(this.namespace, this.property, [date_start, date_end]);

        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, [date_start, date_end]);
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
