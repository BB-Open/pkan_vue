<template>
  <div class="SearchSelector boxed_selector">
  <form  @submit.prevent="">
    <label class="biglabel">{{ title }}:<br/>
      <div class="hidden_help_text">Kriterien filtern</div>
      <input type="text" v-model="search_string" :placeholder="title + ' durchsuchen'"
             @change="filter_criteria" @keyup="filter_criteria"></label></form>
    <div class="visible_buttons">
      <button v-for="item in visible_buttons" @click="button_clicked(item)"
              v-bind:class="{ button_add: item.state === INCLUDE,
                              button_remove: item.state === EXCLUDE,
                              criteria_button_unselected: item.state === NEUTRAL}"
              :id="item">
        <div class="twocolumncontent">
          <div class="search_selector_iconcontainer">
            <i class="fa fa-check-circle search_selector_icon" aria-label="Ausgewählt" v-if="item.state === INCLUDE"></i>
            <i class="fa fa-times-circle search_selector_icon" aria-label="Ausgenommen" v-if="item.state === EXCLUDE"></i>
            <i class="fa fa-circle-o search_selector_icon" aria-label="Neutral" v-if="item.state === NEUTRAL"></i>
          </div>
          <div class="search_selector_label">{{item.text}}</div>
        </div>
      </button>
      <button v-for="item in hidden_buttons" @click="button_clicked(item)"
              v-bind:class="{ button_add: item.state === INCLUDE,
                              button_remove: item.state === EXCLUDE,
                              criteria_button_unselected: item.state === NEUTRAL}"
              v-if="show_more || item.state === INCLUDE || item.state === EXCLUDE"
              :id="item">
        <div class="twocolumncontent">
          <div class="search_selector_iconcontainer">
            <i class="fa fa-check-circle search_selector_icon" aria-label="Ausgewählt" v-if="item.state === INCLUDE"></i>
            <i class="fa fa-times-circle search_selector_icon" aria-label="Ausgenommen" v-if="item.state === EXCLUDE"></i>
            <i class="fa fa-circle-o search_selector_icon" aria-label="Neutral" v-if="item.state === NEUTRAL"></i>
          </div>
          <div class="search_selector_label">{{item.text}}</div>
        </div>
      </button>
    </div>
    <div>
      <button @click="more_less_clicked()" v-if="hidden_buttons.length > 0" class="selectorbutton" :id="'moreless'+title">
        <template v-if="!show_more">ᐁ Mehr</template>
        <template v-if="show_more">ᐃ Weniger</template>
      </button>
      <br v-if="hidden_buttons.length > 0"/>
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
  import {NEUTRAL, INCLUDE, EXCLUDE, REQUEST_VOCAB} from '../configs/socket';
  import {sync} from 'vuex-pathify';
  import {VUEX_NAMESPACE} from '../../store/vocabularies';

  export default {
    name: 'SearchSelector',
    props: ['title', 'options', 'buttons_prop', 'buttons_ns', 'search_ns', 'search_prop'],
    components: {},
    data() {
      return {
        INCLUDE: INCLUDE,
        EXCLUDE: EXCLUDE,
        NEUTRAL: NEUTRAL,
        show_more: false,
        number_displayed: 8,
      }
    },
    computed: {
      visible_buttons: function () {
        return this.buttons.slice(0, this.number_displayed)
      },
      hidden_buttons: function () {
        return this.buttons.slice(this.number_displayed)
      },
      buttons: {
        get: function () {
          let buttons = this.$store.ep_get(this.buttons_ns, this.buttons_prop)
          if (buttons === undefined) {
            return []
          }
          let states = this.$store.ep_get(this.search_ns, this.search_prop)
          let result = []
          let button
          buttons.forEach((item) => {
              button = Object.assign({}, item)
              if (item.id in states) {
                button['state'] = states[item.id]
              } else {
                button['state'] = NEUTRAL
              }
              result.push(button)
            }
          )
          return result
        },
      },
      search_string: sync('search_detail/:search_prop'),
    },
    serverPrefetch() {
      if (this.options.number_displayed !== undefined) {
        this.number_displayed = this.options.number_displayed
      }
    },
    mounted() {
      if (this.options.number_displayed !== undefined) {
        this.number_displayed = this.options.number_displayed
      }
    },
    methods: {
      button_clicked(item) {
        let old_state_map = this.$store.get(this.search_ns + '/' + this.search_prop)
        let old_state = old_state_map[item.id]
        let new_state
        if (old_state === undefined ){
          new_state = INCLUDE
        } else if (old_state === INCLUDE ){
          new_state = EXCLUDE
        } else {
          new_state = old_state + 1
        }
        this.$store.commit(this.search_ns + '/'+ 'SET_FILTER_STATE',
          { prop: this.search_prop, filter:item.id, new_state: new_state})
      },
      async set_values_for_widget() {
        /*        let do_exclude = this.values_stored.do_exclude;
        let do_include = this.values_stored.do_include;

        if (this.values !== undefined) {
          this.values.forEach(
            function (item) {
              if (do_exclude.includes(item)) {
                this.data_store[item] = {
                  check_add: false,
                  check_remove: true,
                };
              } else if (do_include.includes(item)) {
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
*/
      },
      filter_criteria() {
        return {}
        /*        let vocab_keys = Object.keys(this.vocab);
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
*/
      },
      reset_button() {
        /*        this.values_stored = {
          do_include: [],
          do_exclude: []
        };

        this.save();
        this.reload_widget();
        write_aria_polite(this.title + ' wurde zurück gesetzt.')
*/
        return {}
      },
      save() {
        /*        this.$store.ep_set(this.buttons_ns, this.buttons_prop, this.values_stored);
        this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, {});
*/
      },

      reload_widget() {
        /*        this.init_values();
        this.values = Object.keys(this.vocab);
        this.set_values_for_widget()
*/
      },
      init_values() {
//        this.values_stored = this.$store.ep_get(this.buttons_ns, this.buttons_prop)
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.$log.debug('reset field from state');
          this.reload_widget()
        });
      },
      get_item_alt(item) {
        /*        if (this.data_store[item].check_add) {
          return 'In Suche aufgenommen'
        } else if (this.data_store[item].check_remove) {
          return 'Von Suche ausgenommen'
        }
        return ''
*/
      },
      reread_button(item) {
        // make sure, html is refreched first

        let text = document.getElementById(item).innerHTML;
        write_aria_assertive(text)
      },
      reread_criteria_button(item) {
        return {}
        // make sure, html is refreched first
        /*          let text = '';
          if (this.data_store[item].check_remove){
            text = 'Ausgenommen '
          } else if (this.data_store[item].check_add){
            text = 'Ausgewählt '
          } else {
            text = 'Neutral '
          }
          text += this.data_store[item].text;
          write_aria_assertive(text)
*/
      },
      more_less_clicked() {
        this.show_more = !this.show_more;
        this.reread_button('moreless' + this.title)

      }

    }
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
