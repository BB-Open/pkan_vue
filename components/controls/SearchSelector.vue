<template>
  <div class="SearchSelector">
    <h2>{{ title }}</h2>
    <div v-for="item in values">
      <b-form-checkbox :checked="data_store[item].check" :indeterminate="data_store[item].check_false"
                       @change="checkbox_changed(item)">
        {{ item}}
      </b-form-checkbox>
    </div>

    <!--this is just for seeing some results-->
    <h2>Your selections</h2>
    <h3>Selected positive:</h3>
    <ul>
      <li v-for="item in values_add">
        {{ item }}
      </li>
    </ul>
    <h3>Selected negative:</h3>
    <ul>
      <li v-for="item in values_remove">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  import BFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
  import {remove_element_from_array} from '../mixins/utils';

  // todo, this is just an viewable prototype, has to be included to States and Backend and Eventhandling
  export default {
    name: 'SearchSelector',
    props: ['title', 'options'],
    components: {
      BFormCheckbox,
    },
    data() {
      return {
        values: [],
        data_store: {},
        number_displayed: 8,
        values_add: [],
        values_remove: [],
      }
    },
    mounted() {
      // Force the initialization
      if (this.options.values !== undefined) {
        this.values = this.options.values;
        this.options.values.forEach(
          function (item) {
            this.data_store[item] = {
              check: false,
              check_false: false,
            };
          }, this)
      }

      if (this.options.number_displayed !== undefined) {
        this.number_displayed = this.options.number_displayed
      }
    }
    ,
    methods: {
      checkbox_changed(item) {
        // todo: in second loop are items inverted. Why?
        let store = this.data_store[item];
        if (store.check === false && store.check_false === false) {
          store.check = true;
          store.check_false = false;
          this.values_remove = remove_element_from_array(this.values_remove, item);
          this.values_add.push(item)
        } else if (store.check_false === false && store.check === true) {
          store.check = false;
          store.check_false = true;
          this.values_add = remove_element_from_array(this.values_add, item);
          this.values_remove.push(item)
        } else if  (store.check_false === true && store.check === false){
          store.check = false;
          store.check_false = false;
          this.values_add = remove_element_from_array(this.values_add, item);
          this.values_remove = remove_element_from_array(this.values_remove, item);
        }
        this.data_store[item] = store;
      },

    },
  }
</script>

<style scoped>

</style>
