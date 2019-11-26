<template>
  <div class="download_section">
  <div class="download_controls_container">
    <div class="file_select">
      <label>Dateiformat:<br/>
        <b-form-select v-model="file_format" :options="vocab_format" class="mb-3" key="format_select"/></label>
      <label>Download Art:<br/>
        <b-form-select v-model="download_type" :options="vocab_type" class="mb-3" key="download_type_select"/></label>
      <label v-if="this.download_type=='graph'">Anzahl der Schritte:<br/>
        <b-form-select v-model="count" :options="vocab_count" class="mb-3" key="count_select"/></label>
    </div>
  </div>
  <div class="download_url_container">
    <a :href="download_url">Daten herunterladen</a>
  </div>
  </div>
</template>

<script>
    import {RDF_DOWNLOAD_URL} from "../configs/server_settings";
    import {BFormSelect} from 'bootstrap-vue/src/components/form-select/form-select';

    export default {
      name: "DownloadControl",
      components: {
        BFormSelect,

      },
      props: ['id'],
      data() {
        return {
          namespace: 'Search',
          vocab_format: [{
            value: 'rdf/xml',
            text: 'Nach RDF/XML exportieren'
          }, {
            value: 'rdf/json',
            text: 'Nach RDF/JSON exportieren'
          }, {
            value: 'rdf/ttl',
            text: 'Nach RDF/TTL exportieren'
          }],
          file_format: 'rdf/xml',
          download_type: 'tree',
          vocab_type: [{
            value: 'tree',
            text: 'Baum [Unterelemente ausgehend von diesem Element]'
          }, {
            value: 'graph',
            text: 'Graph [Unter- und Oberelemente von diesem Element]'
          }
          ],
          count: '3',
          vocab_count: ['1', '2', '3', '4', '5']
          // Ordering Select
        }
      },
      computed: {
        download_url: {
          set(selected) {

          },
          get() {
            let url = RDF_DOWNLOAD_URL + '?' ;
            if (this.id !== undefined && this.id !== null && this.id !=='') {
              url += 'id=' + this.id + '&';
            }
            url += 'format=' + this.file_format + '&';
            url += 'type=' + this.download_type + '&';
            url += 'count=' + this.count + '&';
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
</style>
