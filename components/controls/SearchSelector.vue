<template>
  <div class="SearchSelector boxed_selector">
    <form  @submit.prevent="">
      <label class="biglabel">{{ title }}:<br/>
      </label>
      <button class="hidden_help_text" type="submit" @click="">Speichern</button>
    </form>
    <div class="visible_buttons">
      <search-selector-button v-for="item in visible_buttons" v-bind:key="item.id"
                              :item='item'
                              :search_ns ="search_ns"
                              :search_prop ="search_prop"
      >
      </search-selector-button>
      <search-selector-button v-for="item in hidden_buttons" v-bind:key="item.id"
                              :item='item'
                              :search_ns ="search_ns"
                              :search_prop ="search_prop"
              v-if="show_more || item.state === INCLUDE || item.state === EXCLUDE">
      </search-selector-button>
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
  import {EXCLUDE, INCLUDE, NEUTRAL} from '../configs/socket';
  import {sync} from 'vuex-pathify';
  import {write_aria_assertive, write_aria_polite} from '../mixins/utils';
  import Vocab from '../mixins/Vocab';
  import SearchSelectorButton from './SearchSelectorButton';


  export default {
    name: 'SearchSelector',
    props: ['title', 'options', 'vocab_prop', 'vocab_ns', 'search_ns', 'search_prop'],
    mixins :[Vocab],
    created() {
        this.INCLUDE = INCLUDE;
        this.EXCLUDE = EXCLUDE;
        this.NEUTRAL = NEUTRAL
    },
    components: {SearchSelectorButton},
      data() {
      return {
        show_more: false,
        number_displayed: 8,
        polite: '',
        assertive: '',
      }
    },
    computed: {
      buttons: {
        get: function () {
          let buttons = this.vocab;
          if (buttons === undefined) {
            return []
          }
          return buttons
        }},
      buttons_list: {
        get: function () {
          let states = this.$store.ep_get(this.search_ns, this.search_prop);
          let result = [];
          let button;
//          let vocab = this.vocab
          this.buttons.forEach((item) => {
              button = Object.assign({}, item);
              if (item.id in states) {
                button['state'] = states[item.id]
              } else {
                button['state'] = this.NEUTRAL
              }
              result.push(button)
            }
          );
          return result
        },

      },
      visible_buttons: function () {
        return this.buttons_list.slice(0, this.number_displayed)
      },
      hidden_buttons: function () {
        return this.buttons_list.slice(this.number_displayed)
      },
      search_string: sync('search_detail/:search_prop'),
    },
    methods: {
      reset_button() {
        this.$store.commit(this.search_ns + '/'+ 'RESET_FILTER', {filter: this.search_prop});
        write_aria_polite(this, this.title + ' wurde zurück gesetzt.');
        return {}
      },
      aria_button(item) {
        let msg = document.getElementById(item).innerHTML;
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


</style>
