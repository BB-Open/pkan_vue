<template>
  <div class="download_section">
    <div class="download_controls_container">
      <form @submit.prevent="" class="file_select">
        <label aria-label="Wählen sie ein Dateiformat für den Download">Dateiformat:<br/>
          <b-form-select :options="vocab_format" class="mb-3" key="format_select" v-model="file_format"/>
        </label>
        <button class="hidden_help_text" type="submit" @click="">Speichern</button>
      </form>
    </div>
    <div class="download_url_container">
      <a :href="download_url">Daten herunterladen</a>
    </div>
  </div>
</template>

<script>
  import {server_settings} from "../configs/server_settings";
  import {BFormSelect} from 'bootstrap-vue/src/components/form-select/form-select';

  export default {
    name: "DownloadControl",
    components: {
      BFormSelect,
    },
    props: ['id'],
    created() {
      this.vuex_ns = 'Search';
      this.vocab_format = [{
        value: 'rdf/xml',
        text: 'Nach RDF/XML exportieren'
      }, {
        value: 'rdf/json',
        text: 'Nach RDF/JSON exportieren'
      }, {
        value: 'rdf/ttl',
        text: 'Nach RDF/TTL exportieren'
      }];
    },
    data() {
      return {
        file_format: 'rdf/xml',
        download_type: 'tree',
        count: '3',
      }
    },
    computed: {
      download_url: {
        set(selected) {

        },
        get() {
          let url = server_settings.RDF_DOWNLOAD_URL + '?';
          if (this.id !== undefined && this.id !== null && this.id !== '') {
            url += 'id=' + this.id + '&';
          }
          url += 'format=' + this.file_format + '&';
          return url;
        }
      }
    },
  }
</script>

<style scoped>

  label {
    margin-right: 15px;
    float: left;
  }

  .download_url_container {
    clear: both;
    padding-top: 8px;
  }

  .mb-3 {
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
