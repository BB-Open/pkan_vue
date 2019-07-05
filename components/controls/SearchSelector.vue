<template>
  <div class="SearchSelector">
    <h2>{{ title }}</h2>
    <input type="text" v-model="search_string" placeholder="Kriterien durchsuchen" @change="filter_criteria">
    <div class="criteria_buttons">
      <button v-for="item in display_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove}">
        {{ item }}
      </button>
      <button v-for="item in additional_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove}"
              v-if="show_more || data_store[item].check_add || data_store[item].check_remove">
        {{ item}}
      </button>
    </div>


    <div>
      <button @click="show_more = !show_more" v-if="additional_values.length > 0" class="button">
        <template v-if="!show_more">ᐁ Mehr</template>
        <template v-if="show_more">ᐃ Weniger</template>
      </button><br/>
      <button @click="reset_button" v-if="additional_values.length > 0" class="button">
        <template>Zurück setzen</template>
      </button>
    </div>
    <!--this is just for seeing some results-->
  </div>
</template>

<script>
  import {remove_element_from_array} from '../mixins/utils';
  import {EV} from "../configs/events";
  import SocketPromise from '../../components/mixins/SocketPromise';
  import {REQUEST_VOCAB} from "../configs/socket";


  // todo, this is just an viewable prototype, has to be included to States and Backend and Eventhandling
  export default {
    name: 'SearchSelector',
    props: ['title', 'options', 'property', 'store_namespace'],
    components: {},
    mixins: [
      SocketPromise
    ],
    data() {
      return {
        values: [],
        vocab: [],
        data_store: {},
        number_displayed: 8,
        values_stored:
          {
            'value_pos': [],
            'value_neg': []
          },
        show_more: false,
        display_values: [],
        additional_values: [],
        search_string: '',
      }
    },
    mounted() {
      this.get_vocab();

      // Force the initialization

      if (this.options.number_displayed !== undefined) {
        this.number_displayed = this.options.number_displayed
      }


      this.init_values();
      this.init_events();

    }
    ,
    methods: {
      button_clicked(item) {
        // todo: in second loop are items inverted. Why?
        let store = this.data_store[item];
        let value_neg = this.values_stored.value_neg.slice();
        let value_pos = this.values_stored.value_pos.slice();
        if (store.check_add === false && store.check_remove === false) {
          store.check_add = true;
          store.check_remove = false;
          value_neg = remove_element_from_array(value_neg, item);
          value_pos.push(item)
        } else if (store.check_remove === false && store.check_add === true) {
          store.check_add = false;
          store.check_remove = true;
          value_pos = remove_element_from_array(value_pos, item);
          value_neg.push(item)
        } else if (store.check_remove === true && store.check_add === false) {
          store.check_add = false;
          store.check_remove = false;
          value_pos = remove_element_from_array(value_pos, item);
          value_neg = remove_element_from_array(value_neg, item);
        }
        this.data_store[item] = store;

        this.values_stored = {
          value_pos: value_pos,
          value_neg: value_neg
        };

        this.save();
        this.$forceUpdate()
      },
      set_values_for_widget() {
        let value_neg = this.values_stored.value_neg;
        let value_pos = this.values_stored.value_pos;
        if (this.vocab !== undefined) {
          this.values = this.vocab;
          this.vocab.forEach(
            function (item) {
              if (value_neg.includes(item)) {
                this.data_store[item] = {
                  check_add: false,
                  check_remove: true,
                };
              } else if (value_pos.includes(item)){
                this.data_store[item] = {
                  check_add: true,
                  check_remove: false,
                };
              } else {
              this.data_store[item] = {
                check_add: false,
                check_remove: false,
              }};
            }, this)
        }
        this.display_values = this.values.slice(0, this.number_displayed);
        this.additional_values = this.values.slice(this.number_displayed, this.values.length)
        this.$forceUpdate()
      },
      filter_criteria() {
        if (this.search_string === '' || this.search_string === undefined) {
          this.values = this.vocab
        } else {
          let search = this.search_string.toLowerCase();
          this.values = [];
          this.vocab.forEach(
            function (item) {
              let compare = item.toLowerCase();
              let store = this.data_store[item];
              if (compare.includes(search)) {
                this.values.push(item)
              } else if (store.check_remove || store.check_add) {
                this.values.push(item)
              }
            }, this)
        }
        this.set_values_for_widget()
      },
      reset_button(){
        this.values_stored = {
          value_pos: [],
          value_neg: []
        };

        this.save();
        this.reload_widget()
      },
      save(){
        this.$store.ep_commit(this.store_namespace, this.property, this.values_stored);
        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, {});
      },

      reload_widget(){
        this.init_values();
        this.set_values_for_widget()
      },
      init_values() {
        this.values_stored = this.$store.state[this.store_namespace][this.property]
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.reload_widget()
        });
      },
      get_vocab() {
        let request = Object.assign({}, {vocab: this.options.vocab_name});
        return this.sendPromise(REQUEST_VOCAB, request)
          .then(
            this.handle_result_vocab.bind(this)
          )
      },
      handle_result_vocab(data) {
        // read result from request
        this.vocab = data.vocab;

        this.set_values_for_widget();
      },

    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
    },
  }
</script>

<style scoped>

  .button_add {
    background-color: #4CAF50;
  }

  .button_remove {
    background-color: #e50018;
  }

</style>
