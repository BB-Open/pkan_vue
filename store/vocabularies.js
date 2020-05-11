import { make } from 'vuex-pathify'
import {get_flask_data} from '../components/mixins/utils';
import {REQUEST_VOCAB} from '../components/configs/socket';

export const VUEX_NAMESPACE = "vocabularies/vocabularies"

export const state = () => {
  return {
    vocabularies: {}
  }
}

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

