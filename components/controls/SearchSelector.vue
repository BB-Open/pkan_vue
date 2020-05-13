<template>
  <div class="SearchSelector boxed_selector">
    <form  @submit.prevent="">
      <label class="biglabel">{{ title }}:<br/>
        <div class="hidden_help_text">Kriterien filtern</div>
<!--      <input type="text" v-model="search_string" :placeholder="title + ' durchsuchen'"
             @change="filter_criteria" @keyup="filter_criteria">
-->
      </label>
    </form>
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
  import {NEUTRAL, INCLUDE, EXCLUDE, REQUEST_VOCAB} from '../configs/socket';
  import {sync} from 'vuex-pathify';
  import {VUEX_NAMESPACE as global_ns} from '../../store/globalstate'
  import {write_aria_assertive, write_aria_polite} from '../mixins/utils';
  import Vocab from '../mixins/Vocab';



    export default {
    name: 'SearchSelector',
    props: ['title', 'options', 'vocab_prop', 'vocab_ns', 'search_ns', 'search_prop'],
    mixins :[Vocab],
    data() {
      return {
        INCLUDE: INCLUDE,
        EXCLUDE: EXCLUDE,
        NEUTRAL: NEUTRAL,
        show_more: false,
        number_displayed: 8,
        polite: '',
        assertive: '',
      }
    },
    created() {
      this.global_ns = global_ns
    },
    computed: {
      visible_buttons: function () {
        return this.buttons_list.slice(0, this.number_displayed)
      },
      hidden_buttons: function () {
        return this.buttons_list.slice(this.number_displayed)
      },
      buttons: {
        get: function () {
          let buttons = this.$store.ep_get(this.vocab_ns, this.vocab_prop)
          if (buttons === undefined) {
            return []
          }
          return buttons
        }},
      buttons_dict: {
          get: function () {
          let result = {}
          this.buttons.forEach((item) => {
            result[item.id] = item
            }
          )
          return result
          }
      },
      buttons_list: {
        get: function () {
          let states = this.$store.ep_get(this.search_ns, this.search_prop)
          let result = []
          let button
//          let vocab = this.vocab
          this.buttons.forEach((item) => {
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
          { filter: this.search_prop, category:item.id, new_state: new_state})
        this.$store.ep_set(this.global_ns, 'aria_assertive', item.id)
        this.aria_criteria_button(item, new_state)
      },
      reset_button() {
        this.$store.commit(this.search_ns + '/'+ 'RESET_FILTER', {filter: this.search_prop})
        write_aria_polite(this, this.title + ' wurde zurück gesetzt.')

        return {}
      },
/*      get_item_alt(item) {
        /*        if (this.data_store[item].check_add) {
          return 'In Suche aufgenommen'
        } else if (this.data_store[item].check_remove) {
          return 'Von Suche ausgenommen'
        }
        return ''
      },
*/
      aria_button(item) {
        let msg = document.getElementById(item).innerHTML;
        write_aria_assertive(this, msg)
      },
      aria_criteria_button(item, state) {
          let msg
          if (state === EXCLUDE){
            msg = 'Ausgenommen '
          } else if (state === INCLUDE){
            msg = 'Ausgewählt '
          } else {
            msg = 'Neutral '
          }
          msg += this.buttons_dict[item.id].text ;
          write_aria_assertive(this, msg)
      },
      more_less_clicked() {
        this.show_more = !this.show_more;
        this.aria_button('moreless' + this.title)
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
