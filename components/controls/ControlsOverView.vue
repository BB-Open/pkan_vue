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
  import {REQUEST_VOCAB} from "../configs/socket";
  import SocketPromise from "../mixins/SocketPromise";
  import {dateTime2dateStr} from "../mixins/utils";

  export default {
    name: "ControlsOverView",
    data() {
      return {
        namespace: 'Search',
        keyword_fields: ['textline_keywords'],
        search_selector_fields: ['category', 'file_format', 'publisher', 'license', 'keywords'],
        raw_fields: ['sparql', ],
        date_range_fields: ['last_change'],
        display_green: [],
        display_red: [],
        vocab_terms: {},
        vocabs_to_request: ['category', 'file_format', 'publisher', 'license', 'keywords']
      }
    },
    mixins: [
      SocketPromise
    ],

    mounted() {
      // Force the initialization
      this.request_vocabs();
      this.init_events();
      this.reload_widget()
    },
    methods: {
      reload_widget() {
        this.set_values_for_widget()
      },
      request_vocabs() {
        this.vocabs_to_request.forEach(function (item) {
          let request = Object.assign({}, {vocab: item});
          return this.sendPromise(REQUEST_VOCAB, request)
            .then(
              this.handle_result_vocab.bind(this)
            )
        }, this)
      },
      handle_result_vocab(data){
        data.vocab.forEach(function (field) {
          this.vocab_terms[field.id] = field.text
        }, this);
        this.reload_widget()
      },
      set_values_for_widget() {
        this.display_green = [];
        this.display_red = [];
        this.keyword_fields.forEach(function (field) {
          this.add_strings(field)
        }, this);
        this.date_range_fields.forEach(function (field){
          this.add_date_range(field)
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
            this.display_green.push(this.term_to_str(str))
          }, this);
          red.forEach(function (str) {
            this.display_red.push(this.term_to_str(str))
          }, this);
        }
      },
      add_date_range(field){
        let value = this.$store.state[this.namespace][field];
        let start = value[0];
        let end = value[1];
        let res = '';
        if (start !== null && start !== undefined) {
          start = dateTime2dateStr(start);
          res = res + 'Von: ' + start + ' '
        }
        if (end !== null && end !== undefined) {
          end = dateTime2dateStr(end);
          res = res + 'Bis: ' + end;
        }
        if (res !== '') {
          this.display_green.push(res)
        }

      },
      term_to_str(str){
        if (str in this.vocab_terms) {
          return this.vocab_terms[str]
        }
        return str
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
    margin-left: 10px;
    padding: 5px;
  }

  .box_area {
    justify-content: flex-start;
    padding-right: 0px;
    padding-left: 0px;
  }

  @media (max-width: 640px) {
    .search_box {
      margin-left: 5px;
    }
  }

</style>
