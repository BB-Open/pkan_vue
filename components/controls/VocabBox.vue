<template>
  <div class="category box_area">
    <div v-for="item in this.vocab" class="box">
      <button
        @click="handle_click(item.text)"
        class="lightbutton button vocabbutton"
        type="button">
        <i :class="item.icon_class + ' bb-ifa hidesmallscreen'" v-if="item.icon_class"/><br v-if="item.icon_class" class="hidesmallscreen"/>
        {{item.text}}
      </button>
    </div>
  </div>
</template>

<script>
    import {REQUEST_VOCAB} from "../configs/socket";
    import SocketPromise from "../mixins/SocketPromise";
    import {DETAIL_SEARCH_URL} from "../configs/routing";

    export default {
        name: "VocabBoxes",
      data() {
        return {
          vocab: [],
          namespace: 'Vocab Boxes',
        }
      },
      mixins: [
        SocketPromise
      ],
      props: {'vocab_name': String,
        'clean_value': Boolean,
        'search_field': String},
      mounted() {
        // Force the initialization
        this.get_vocab();
      },
      methods: {
        get_vocab() {
          let request = Object.assign({}, {vocab: this.vocab_name});
          return this.sendPromise(REQUEST_VOCAB, request)
            .then(
              this.handle_result.bind(this)
            )
        },
        handle_result(data) {
          // read result from request
          this.vocab = data.vocab;
        },
        handle_click(value) {
          let value_clean;
          if (this.clean_value === true) {
            value_clean = {
              'value_pos': [value],
              'value_neg': []
            };
          } else {
            value_clean = value
          }
          this.$store.ep_commit('Search', this.search_field, value_clean);
          this.$router.push(DETAIL_SEARCH_URL);
        },
      }
    }
</script>

<style scoped>

  .vocabbutton {
    width: 100%;
    height: 100%;
    padding: 15px;
  }

</style>
