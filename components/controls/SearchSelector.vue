<template>
  <div class="SearchSelector boxed_selector">
  <form  @submit.prevent="">
    <label class="biglabel">{{ title }}:<br/>
      <div class="hidden_help_text">Kriterien filtern</div>
      <input type="text" v-model="search_string" :placeholder="title + ' durchsuchen'"
             @change="filter_criteria" @keyup="filter_criteria"></label></form>
    <div class="criteria_buttons">
      <button v-for="item in display_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove, criteria_button_unselected: !data_store[item].check_remove && !data_store[item].check_add}"
              :id="item">
        <div class="twocolumncontent">
          <div class="search_selector_iconcontainer"><i class="fa fa-circle-o search_selector_icon" aria-label="Neutral" v-if="!data_store[item].check_remove && !data_store[item].check_add"></i>
            <i class="fa fa-times-circle search_selector_icon" aria-label="Ausgenommen" v-if="data_store[item].check_remove"></i>
            <i class="fa fa-check-circle search_selector_icon" aria-label="Ausgewählt" v-if="data_store[item].check_add"></i></div>
          <div class="search_selector_label">{{data_store[item].text}}</div>
        </div>
      </button>
      <button v-for="item in additional_values" @click="button_clicked(item)"
              v-bind:class="{ button_add: data_store[item].check_add, button_remove: data_store[item].check_remove, criteria_button_unselected: !data_store[item].check_remove && !data_store[item].check_add}"
              v-if="show_more || data_store[item].check_add || data_store[item].check_remove"
              :id="item">
        <div class="twocolumncontent">
          <div class="search_selector_iconcontainer"><i class="fa fa-circle-o search_selector_icon" aria-label="Neutral" v-if="!data_store[item].check_remove && !data_store[item].check_add"></i>
            <i class="fa fa-times-circle search_selector_icon" aria-label="Ausgenommen" v-if="data_store[item].check_remove"></i>
            <i class="fa fa-check-circle search_selector_icon" aria-label="Ausgewählt" v-if="data_store[item].check_add"></i></div>
          <div class="search_selector_label">{{data_store[item].text}}</div>
        </div>
      </button>
    </div>


    <div>
      <button @click="more_less_clicked()" v-if="additional_values.length > 0" class="selectorbutton" :id="'moreless'+title">
        <template v-if="!show_more">ᐁ Mehr</template>
        <template v-if="show_more">ᐃ Weniger</template>
      </button>
      <br v-if="additional_values.length > 0"/>
      <button @click="reset_button" class="selectorbutton" :aria-label="'Zurücksetzen für ' + title">
        <template>Zurücksetzen</template>
      </button>
    </div>
    <!--this is just for seeing some results-->
  </div>
</template>

<script>
  import {get_flask_data, remove_element_from_array, write_aria_assertive, write_aria_polite} from '../mixins/utils';
  import {EV} from "../configs/events";
  import {REQUEST_VOCAB} from "../configs/socket";

  export default {
    name: 'SearchSelector',
    props: ['title', 'options', 'vuex_prop', 'vuex_ns'],
    components: {},
    data() {
      return {
        values: [],
        vocab: {},
//        data_store: {},
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
    computed : {
      data_store : function () {
        return this.$store.ep_get(this.vuex_ns, this.vuex_prop)
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
        this.$forceUpdate();
        this.reread_criteria_button(item)
      },
      async set_values_for_widget() {
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
        this.reload_widget();
        write_aria_polite(this.title + ' wurde zurück gesetzt.')
      },
      save() {
        this.$store.ep_set(this.vuex_ns, this.vuex_prop, this.values_stored);
        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, {});
      },

      reload_widget() {
        this.init_values();
        this.values = Object.keys(this.vocab);
        this.set_values_for_widget()
      },
      init_values() {
        this.values_stored = this.$store.state[this.vuex_ns][this.vuex_prop]
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.reload_widget()
        });
      },
      async get_vocab() {
        var response = await get_flask_data(this, REQUEST_VOCAB, {vocab: this.options.vocab_name})
        return await this.handle_result_vocab(response)
      },
      async handle_result_vocab(data) {
        // read result from request
        this.vocab = {};
        data.vocab.forEach(function (field) {
          this.vocab[field.id] = field.text
        }, this);
        this.values = Object.keys(this.vocab);
        await this.set_values_for_widget();
      },
      get_item_alt(item) {
        if (this.data_store[item].check_add) {
          return 'In Suche aufgenommen'
        } else if (this.data_store[item].check_remove) {
          return 'Von Suche ausgenommen'
        }
        return ''
      },
      reread_button(item) {
        // make sure, html is refreched first
        this.$nextTick(function () {
          let text = document.getElementById(item).innerHTML;
          write_aria_assertive(text)})
      },
      reread_criteria_button(item) {
        // make sure, html is refreched first
        this.$nextTick(function () {
          let text = '';
          if (this.data_store[item].check_remove){
            text = 'Ausgenommen '
          } else if (this.data_store[item].check_add){
            text = 'Ausgewählt '
          } else {
            text = 'Neutral '
          }
          text += this.data_store[item].text;
          write_aria_assertive(text)})
      },
      more_less_clicked() {
        this.show_more = !this.show_more;
        this.reread_button('moreless' + this.title)
      }
    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
    },
  }
</script>

<style scoped>



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
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
  }

  .search_selector_icon {
    line-height: 1.5rem;
    font-size: 1.5rem;
    padding-right: 10px;
  }
  .search_selector_label{
    color: black;
    margin-bottom: auto;
    margin-top: auto;
    width: 90%;
  }
  .search_selector_iconcontainer {
    width: 10%;
    min-width: 20px;
  }

  .twocolumncontent {
    margin-bottom: 0;
  }
</style>
