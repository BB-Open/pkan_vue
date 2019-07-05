<template>
  <div class="textsearch">
    <textarea class="textsearch_area" v-model="search_string" :placeholder="place_holder" :rows="rows"></textarea>
    <button
      @click="filter_criteria()"
      class="button textsearch_button"
      type="button">{{button_label}}
    </button>
  </div>
</template>

<script>
  import {EV} from "../configs/events";

  export default {
    name: 'SearchField',
    props: ['property', 'initial_value', 'place_holder', 'store_namespace', 'next_view', 'rows', 'button_label'],
    components: {},
    data() {
      return {
        search_string: '',
      }
    },
    mounted() {
      // Force the initialization

      if (this.initial_value === '' || this.initial_value === undefined) {
        this.search_string = ''
      } else {
        this.search_string = this.initial_value
      }
      this.init_events();
    }
    ,
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
    },
    methods: {
      filter_criteria() {
        if (this.search_string === '' || this.search_string === undefined) {
          this.search_string = '';
          this.save();
        } else {
          this.save();
          if (this.$route.path !== this.next_view) {
            this.$router.push(this.next_view);
          }
        }
      },
      load_value_from_state() {
        this.search_string = this.$store.state[this.store_namespace][this.property]
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.load_value_from_state()
        });
      },
      save() {
        this.$store.ep_commit(this.store_namespace, this.property, this.search_string);
        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, {});
      }

    },
  }
</script>

<style scoped>
  .textsearch {
    width: 100%;
    display: flex;
    flex-direction: row;

  }

  .textsearch_area {
    width: 80%;
    padding: 0.5em 1em;
    margin: 2px;
    min-width: 400px;
  }

  .textsearch_button {
    width: 20%;
    min-width: 50px;
  }

</style>
