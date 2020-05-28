<template>
      <button v-bind:class="{ button_add: item.state === INCLUDE,
                              button_remove: item.state === EXCLUDE,
                              criteria_button_unselected: item.state === NEUTRAL}"
              :id="item.id" @click='button_clicked(item)'>
        <div class="twocolumncontent">
          <div class="search_selector_iconcontainer">
            <i class="fa fa-check-circle search_selector_icon" aria-label="Ausgewählt" v-if="item.state === INCLUDE"></i>
            <i class="fa fa-times-circle search_selector_icon" aria-label="Ausgenommen" v-if="item.state === EXCLUDE"></i>
            <i class="fa fa-circle-o search_selector_icon" aria-label="Neutral" v-if="item.state === NEUTRAL"></i>
          </div>
          <div class="search_selector_label">{{item.text}}</div>
        </div>
      </button>
</template>

<script>
  import {NEUTRAL, INCLUDE, EXCLUDE} from '../configs/socket';
  import {write_aria_assertive} from '../mixins/utils';

    export default {
    name: 'SearchSelectorButton',
    props: {
      item : { type: Object,
               required: true
      },
      search_ns: { type: String,
        required: true
      },
      search_prop: { type: String,
        required: true
      }
    },
    created() {
      this.INCLUDE = INCLUDE
      this.EXCLUDE = EXCLUDE
      this.NEUTRAL = NEUTRAL
    },
      methods : {
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
          this.aria_criteria_button(item, new_state)
        },
        aria_criteria_button(item, state) {
          let msg
          if (state === EXCLUDE) {
            msg = 'Ausgenommen '
          } else if (state === INCLUDE) {
            msg = 'Ausgewählt '
          } else {
            msg = 'Neutral '
          }
          msg += this.item.text;
          write_aria_assertive(this, msg)
        },
      }
  }
</script>

<style scoped>


  .SearchSelector label {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .SearchSelector input {
    padding-top: 4px;
    padding-bottom: 4px;
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
