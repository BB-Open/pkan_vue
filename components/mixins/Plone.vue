

<script>
  import {format_plone_date, get_plone_data} from './utils';
  import {server_settings} from "../configs/server_settings";

  export default {
    name: 'Plone',
    props: {
      'vuex_ns': { type: String, required: true},
      'vuex_prop': { type: String, required: true},
      'portal_type': String,
      'max_number': String,
      'sort_on': String,
      'tag': String,
      'sort_order': String,
      'display_date':
        {
          type: Boolean,
          default:
            false
        }
    },
    created() {
      this.base_data_url = server_settings.PLONE_URL + '/@search?fullobjects=1';
    },
    computed : {
      plone_res_raw : function () {
        let result = this.$store.ep_get(this.vuex_ns, this.vuex_prop);

        if (result === undefined) {
          result = this.set_plone()
        }

        return result
      },
      plone_res : function () {
        let result = this.plone_res_raw;
        if (result.items === undefined) {
          result.items = []
        }
        if (this.display_date) {
          result.items.forEach(
            function (item) {
              item.date_text = 'Veröffentlicht am ' + format_plone_date(item.effective);
            }, this)
        }
        return result
      },
      plone_res_first : function () {
        return this.plone_res.items[0]
      }
    },
    methods :{
      async set_plone () {
        let url = this.generate_data_url();
        var response = await get_plone_data(this, url);
        this.$store.ep_set(this.vuex_ns, this.vuex_prop, response);
        return response
      },
      generate_data_url() {
        let data_url = this.base_data_url;

        if (this.portal_type !== undefined) {
          data_url += '&portal_type=' + this.portal_type
        }

        if (this.sort_on !== undefined) {
          data_url += '&sort_on=' + this.sort_on
        }

        if (this.sort_order !== undefined) {
          data_url += '&sort_order=' + this.sort_order
        }
        if (this.max_number !== undefined) {
          data_url += '&sort_limit=' + this.max_number
        }

        if (this.tag !== undefined) {
          data_url += '&Subject=' + this.tag
        }

        this.$log.debug(data_url + ' generated');

        return data_url
      }
      ,
    },
    serverPrefetch() {
//      return this.set_voc()
    },
    mounted() {
//      this.set_voc()
    }

  }
</script>

<style scoped>

</style>
