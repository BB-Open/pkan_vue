<template>
  <div class="select">
    <form>
    <label aria-label="Wählen Sie die Sortierreihenfolge der Suchergebnisse.">Sortieren nach:<br/>
      <b-form-select v-model="selected" :options="vocab_ordering" class="mb-3" :key="namespace + property + 'select'"/>
    </label>
    </form>
  </div>
</template>

<script>
  import SocketPromise from "../mixins/SocketPromise";
  import {BFormSelect} from 'bootstrap-vue/src/components/form-select/form-select';
  import {EV} from "../configs/events";
  import {REQUEST_VOCAB} from "../configs/socket";

  export default {
    name: "Ordering",
    components: {
      BFormSelect,

    },
    data() {
      return {
        namespace: 'Search',
        vocab_ordering: [],
        property: 'order_by'
        // Ordering Select
      }
    },
    computed: {
      selected: {
        set(selected) {
          this.$store.ep_commit(this.namespace, this.property, selected);
          this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, selected);
        },
        get() {
          return this.$store.state[this.namespace][this.property];
        }
      }
    },
    mixins: [
      SocketPromise
    ],

    mounted() {
      // Force the initialization
      this.get_vocab_ordering();
      this.$forceUpdate()
    },
    methods: {
      get_vocab_ordering() {
        let request = Object.assign({}, {vocab: 'ordering'});
        return this.sendPromise(REQUEST_VOCAB, request)
          .then(
            this.handle_result_ordering.bind(this)
          )
      },
      handle_result_ordering(data) {
        // read result from request
        this.vocab_ordering = [];
        data.vocab.forEach(function (field) {
          this.vocab_ordering.push({
            value: field.id,
            text: field.text
          })
        }, this);

      },
    }
  }
</script>

<style scoped>
  .select {
    padding-left: 10px;
    padding-right: 10px;
  }

  .select label {
    font-size: 1rem;
  }

  .select label select {
    font-size: 1rem;
  }
</style>
