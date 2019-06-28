<template>

</template>

<script>
  import {dateStr2dateTime, str2FloatTuple} from '../components/mixins/utils';

  export default {
    name: 'Landing',

    mounted: function () {
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
            this.$store.ep_commit('GlobalState', field, dateStr2dateTime(field_value));
          }
        }, this);
        str_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            this.$store.ep_commit('GlobalState', field, field_value);
          }
        }, this);
        int_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            this.$store.ep_commit('GlobalState', field, parseInt(field_value));
          }
        }, this);
        tuple_float_fields.forEach(function (field) {
          let field_value = query[field];
          if (field_value !== undefined) {
            let value = str2FloatTuple(field_value);
            this.$store.ep_commit('GlobalState', field, value);
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
