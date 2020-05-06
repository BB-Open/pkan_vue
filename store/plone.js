import { make } from 'vuex-pathify'

export const state = () => {
  return {
    plone: {
      PLONE_TAG_FAQ : {
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

