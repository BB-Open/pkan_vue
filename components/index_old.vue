<template>
<h1>huhu</h1>
</template>

<script>
  import {dateStr2dateTime, str2FloatTuple} from './mixins/utils';
  import {DEFAULT_URL} from "./configs/routing";

  export default {
    name: 'Landing',

    serverPrefetch() {
      this.init_from_query()
    },

    mounted () {
      // Force the initialization
       this.init_from_query()
    },
    methods: {
      init_from_query() {
        let query = this.$route.query;

        let date_fields = [];
        let str_fields = [];
        let int_fields = [];
        let tuple_float_fields = [];

        date_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            this.$store.ep_set('GlobalState', field, dateStr2dateTime(field_value));
          }
        }, this);
        str_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            this.$store.ep_set('GlobalState', field, field_value);
          }
        }, this);
        int_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            this.$store.ep_set('GlobalState', field, parseInt(field_value));
          }
        }, this);
        tuple_float_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            let value = str2FloatTuple(field_value);
            this.$store.ep_set('GlobalState', field, value);
          }
        }, this);

        // Redirect to real view and choose default view.
        this.$router.push(DEFAULT_URL);

      }
    }
  }
</script>

<style scoped>

</style>
