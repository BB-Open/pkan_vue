<template>
  <div>
    <h2>Aktuelle Suche:</h2>
    <div class="box_area">
      <div v-for="item in display_green" class="green search_box">{{item}}</div>
      <div v-for="item in display_red" class="red search_box">{{item}}</div>
    </div>
  </div>
</template>

<script>
  import {EV} from "../configs/events";

  export default {
    name: "ControlsOverView",
    data() {
      return {
        namespace: 'Search',
        keyword_fields: ['keywords'],
        search_selector_fields: ['category'],
        raw_fields: ['sparql'],
        display_green: [],
        display_red: []
      }
    },

    mounted() {
      // Force the initialization
      this.init_events();
      this.reload_widget()
    },
    methods: {
      reload_widget() {
        this.set_values_for_widget()
      },
      set_values_for_widget() {
        this.display_green = [];
        this.display_red = [];
        this.keyword_fields.forEach(function (field) {
          this.add_strings(field)
        }, this);
        this.search_selector_fields.forEach(function (field) {
          this.add_fields(field)
        }, this);
        this.raw_fields.forEach(function (field) {
          this.add_raw(field)
        }, this);
      },
      add_strings(field) {
        let value = this.$store.state[this.namespace][field];
        let string_values = value.split(' ');
        string_values.forEach(function (str) {
          if (str !== "") {
            this.display_green.push(str)
          }
        }, this);
      },
      add_raw(field) {
        let value = this.$store.state[this.namespace][field];

        if (value !== "" && value !== undefined && value !== null) {
          this.display_green.push(field +': ' +value)
        }
      },

      add_fields(field) {
        let value = this.$store.state[this.namespace][field];
        if (value !== null && value !== undefined) {
          let green = value.value_pos;
          let red = value.value_neg;
          green.forEach(function (str) {
            this.display_green.push(str)
          }, this);
          red.forEach(function (str) {
            this.display_red.push(str)
          }, this);
        }
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.reload_widget()
        });
        this.$EventBus.$on(EV.CHANGED_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.reload_widget()
        });
      },

    }
    ,
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
      this.$EventBus.$off(EV.CHANGED_SEARCH_TERMS)
    }
    ,
  }
</script>

<style scoped>
  .green {
    background-color: #4CAF50;
  }

  .red {
    background-color: #e50018;
  }

  .search_box {
    padding: 10px;
  }

  .box_area {
    justify-content: flex-start;
    padding-right: 0px;
    padding-left: 0px;
  }

</style>
