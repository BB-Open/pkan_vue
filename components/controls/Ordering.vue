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

  export default {
    name: "Ordering",
    props : ['vuex_ns', 'vuex_prop'],
    components: {
      BFormSelect,

    },
    data() {
      return {
        vocab_ordering: [],
      }
    },
    computed: {
      selected: {
        set(selected) {
          this.$store.ep_set(this.vuex_ns, this.vuex_prop, selected);
        },
        get() {
          return this.$store.ep_get(this.vuex_ns , this.vuex_prop);
        },
        vocab_ordering: function () {
          return this.$store.ep_get('vocabularies/vocabularies', this.vuex_ns )
        }
      }
    },
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
