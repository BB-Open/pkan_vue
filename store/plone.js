import { make } from 'vuex-pathify'
import {PLONE_TAG_FAQ} from '../components/configs/plone_keywords'

export const state = () => {
  return {
    plone: {
      [PLONE_TAG_FAQ] : {
          title: 'Titel wird geladen.',
          description: 'Beschreibung wird geladen.',
          text: {
            data: 'Text wird geladen.'
          }
        }
    }
  }
}

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

