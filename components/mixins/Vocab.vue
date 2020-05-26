

<script>
  import {get_flask_data} from './utils';
  import {REQUEST_VOCAB} from '../configs/socket';

  export default {
    name: 'Vocab',
    props: {
      'vocab_ns': { type: String, required: true},
      'vocab_prop': { type: String, required: true},
    },
    computed : {
      vocab : function () {
        let result = this.$store.ep_get(this.vocab_ns, this.vocab_prop);
        if (result === undefined) {
          this.set_voc();
          return []
        }
        return result
      }
    },
    methods :{
      async set_voc () {
        var response = await get_flask_data(this, REQUEST_VOCAB,{vocab: this.vocab_prop});
        var vocab = response.vocab;
        vocab.sort((a, b) => a.text.localeCompare(b.text));
        this.$store.ep_set(this.vocab_ns, this.vocab_prop, vocab);
        return vocab
      }
    },
    serverPrefetch() {
      return this.set_voc()
    },
    mounted() {
//      this.set_voc()
    }

  }
</script>

<style scoped>

</style>
