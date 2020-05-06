<template>
  <div class="ordering select">
    <form @submit.prevent="">
      <label aria-label="Wählen Sie die Sortierreihenfolge der Suchergebnisse.">Sortieren nach:<br/>
        <b-form-select v-model="selected" :options="vocab_ordering" class="mb-3"
                       :key="vuex_ns + vuex_prop + 'select'"/>
      </label>
    </form>
  </div>
</template>

<script>
  import {BFormSelect} from 'bootstrap-vue/src/components/form-select/form-select';
  import {EV} from "../configs/events";
  import {REQUEST_VOCAB} from "../configs/socket";
  import {get_flask_data} from '../mixins/utils';

  export default {
    name: "Ordering",
    props : ['vuex_ns', 'vuex_prop'],
    components: {
      BFormSelect,

    },
    data() {
      return {
        vocab_ordering: [],
        // Ordering Select
      }
    },
    computed: {
      selected: {
        set(selected) {
          this.$store.ep_set(this.vuex_ns, this.vuex_prop, selected);
          this.$EventBus.$emit(EV.CHANGED_SEARCH_TERMS, selected);
        },
        get() {
          return this.$store.ep_get(this.vuex_ns , this.vuex_prop);
        },
        vocab_ordering: function () {
          return this.$store.ep_get('vocabularies/vocabularies', this.vuex_ns )
        }
      }
    },
    serverPrefetch() {
      return this.get_vocab_ordering();
    },
    mounted() {
      // Force the initialization
      this.get_vocab_ordering();
    },
    methods: {
      async get_vocab_ordering() {
        var response = await get_flask_data(this,  REQUEST_VOCAB,  {vocab: 'ordering'})
        return await this.handle_result_ordering(response)
      },
      handle_result_ordering(data) {
        // read result from request
//        this.vocab_ordering = [];
        data.vocab.forEach(function (field) {
          this.$store.ep_set('vocabularies/vocabularies', this.vuex_ns, {
            value: field.id,
            text: field.text
          })
/*          this.vocab_ordering.push({
            value: field.id,
            text: field.text
          })
*/        }, this);

      },
    }
  }
</script>

<style scoped>
  .select {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 0.2em;
  }

  .select label {
    font-size: 1rem;
  }

  .select label select {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    .select {
      padding: 0;

    }
  }
</style>
