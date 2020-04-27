<template>
  <form class="SearchSelector boxed_selector" @submit.prevent="">
    <label>{{ title }}:<br/>
      <div class="hidden_help_text">Kriterien filtern</div>
      <input type="text" v-model="search_string" :placeholder="title + ' durchsuchen'"
             @change="filter_criteria"></label>
    <div class="criteria_buttons">
      <button v-for="item in display_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove, criteria_button_unselected: !data_store[item].check_remove && !data_store[item].check_add}"
              v-bind:alt="get_item_alt(item)" :id="item">
        <span v-if="data_store[item].check_add">Ausgewählt: </span><span v-if="data_store[item].check_remove">Ausgenommen: </span>{{
        data_store[item].text }}
      </button>
      <button v-for="item in additional_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove, criteria_button_unselected: !data_store[item].check_remove && !data_store[item].check_add}"
              v-if="show_more || data_store[item].check_add || data_store[item].check_remove"
              v-bind:alt="get_item_alt(item)" :id="item">
        {{ data_store[item].text }}
      </button>
    </div>


    <div>
      <button @click="show_more = !show_more" v-if="additional_values.length > 0" class="selectorbutton">
        <template v-if="!show_more">ᐁ Mehr</template>
        <template v-if="show_more">ᐃ Weniger</template>
      </button>
      <br v-if="additional_values.length > 0"/>
      <button @click="reset_button" class="selectorbutton" :aria-label="'Zurück setzen für ' + title">
        <template>Zurück setzen</template>
      </button>
    </div>
    <!--this is just for seeing some results-->
  </form>
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
        vocab: {},
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
        this.refocus_button(item)
      },
      set_values_for_widget() {
        let value_neg = this.values_stored.value_neg;
        let value_pos = this.values_stored.value_pos;


        if (this.values !== undefined) {
          this.values.forEach(
            function (item) {
              if (value_neg.includes(item)) {
                this.data_store[item] = {
                  check_add: false,
                  check_remove: true,
                };
              } else if (value_pos.includes(item)) {
                this.data_store[item] = {
                  check_add: true,
                  check_remove: false,
                };
              } else {
                this.data_store[item] = {
                  check_add: false,
                  check_remove: false,
                }
              }
              ;

              this.data_store[item].text = this.vocab[item]
            }, this)
        }
        this.display_values = this.values.slice(0, this.number_displayed);
        this.additional_values = this.values.slice(this.number_displayed, this.values.length)
        this.$forceUpdate()
      },
      filter_criteria() {
        let vocab_keys = Object.keys(this.vocab);
        if (this.search_string === '' || this.search_string === undefined) {
          this.values = vocab_keys;
        } else {
          let search = this.search_string.toLowerCase();
          this.values = [];
          vocab_keys.forEach(
            function (item) {
              let store = this.data_store[item];
              let compare = store.text.toLowerCase();
              if (compare.includes(search)) {
                this.values.push(item)
              } else if (store.check_remove || store.check_add) {
                this.values.push(item)
              }
            }, this)
        }
        this.set_values_for_widget()
      },
      reset_button() {
        this.values_stored = {
          value_pos: [],
          value_neg: []
        };

        this.save();
        this.reload_widget()
      },
      save() {
        this.$store.ep_commit(this.store_namespace, this.property, this.values_stored);
        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, {});
      },

      reload_widget() {
        this.init_values();
        this.values = Object.keys(this.vocab);
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
        this.vocab = {};
        data.vocab.forEach(function (field) {
          this.vocab[field.id] = field.text
        }, this);
        this.values = Object.keys(this.vocab);
        this.set_values_for_widget();
      },
      get_item_alt(item) {
        if (this.data_store[item].check_add) {
          return 'In Suche aufgenommen'
        } else if (this.data_store[item].check_remove) {
          return 'Von Suche ausgenommen'
        }
        return ''
      },

      refocus_button(item) {
        document.getElementById(item).focus()
      }
    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
    },
  }
</script>

<style scoped>

  .button_add {
    background-color: #ffffff;
    color: #161616;
    border: 2px solid #99CC66;
  }

  .button_remove {
    background-color: #ffffff;
    color: #161616;
    border: 2px solid #C73C35;
  }

  .SearchSelector {
    padding-top: 8px;
  }

  .SearchSelector label {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .SearchSelector input {
    padding-top: 4px;
    padding-bottom: 4px;
    width: 100%;
  }

  .criteria_buttons {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .criteria_button_unselected {
    background-color: white;
    color: #161616;
    border: 2px solid #C0C0C0;
  }

  .criteria_button_unselected:hover,
  .criteria_button_unselected:focus,
  .button_add:hover,
  .button_add:focus,
  .button_remove:hover,
  .button_remove:focus {
    color: #161616;
    background-color: #eeeeee;
  }

</style>
