import Vue from 'vue'
import Vuex from 'vuex'
import fetchData from './fetchData'

Vue.use(Vuex)

const globalState = {
  state: {
    isLoading: false,
    source: 'mangareader.net'
  },

  mutations: {
    setLoadingState (state) {
      if (state.isLoading === false) {
        state.isLoading = true
      } else {
        state.isLoading = false
      }
    },
    setSourceURL (state, domain) {
      state.source = domain
    }
  },

  actions: {
    setLoading: function ({ commit }) {
      commit('setLoadingState')
    }
  }
}

const searchState = {
  state: {
    query: '',
    results: [],
    genreList: [],
    genres: []
  },

  mutations: {
    setSearchResults (state, result) {
      state.results = result.result
    },
    updateSearchQuery (state, value) {
      state.query = value
    },
    setGenre (state, genreList) {
      state.genreList = genreList.genreList
    },
    setGenreList (state, genreList) {
      state.genres = genreList.genreList
    }
  },

  actions: {
    LOAD_SEARCH_RESULTS: function ({ commit, rootState }) {
      fetchData(rootState.globals.source).get('search', { params: { cover: 1, info: 1, q: rootState.route.query.q }})
      .then(
        (response) => {
          commit('setSearchResults', { result: response.data })
        })
      .catch(
        (err) => {
          console.log(err)
        })
    },
    LOAD_GENRES: function ({ commit, rootState }) {
      fetchData(rootState.globals.source).get('search/genres/')
        .then((response) => {
          commit('setGenreList', { genreList: response.data })
        }).catch((error) => {
          console.log(error)
        })
    },
    LOAD_MANGA_GENRE_LIST: function ({ commit, rootState }) {
      fetchData(rootState.globals.source).get(`search/genres/${rootState.route.params.genreName}`, { params: { cover: 1, info: 1 }})
      .then(
        (response) => {
          commit('setGenre', { genreList: response.data })
        }
      ).catch((error) => {
        console.log(error)
      })
    }
  }
}

const mangaState = {
  state: {
    info: [],
    chapter: []
  },
  mutations: {
    setManga (state, result) {
      state.info = result.result
    },
    resetManga (state, value) {
      state.info = value
    },
    resetReader (state, value) {
      state.chapter = value
    },
    setChapter (state, chapter) {
      state.chapter = chapter.chapter
    }
  },
  actions: {
    LOAD_MANGA_INFO: function ({ commit, rootState }) {
      fetchData(rootState.globals.source).get(`manga/${rootState.route.params.mangaId}`)
      .then((response) => {
        commit('setManga', { result: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    LOAD_MANGA_CHAPTER: function ({ commit, rootState }) {
      fetchData(rootState.globals.source).get(`manga/${rootState.route.params.mangaId}/${rootState.route.params.chapterId}`)
      .then((response) => {
        commit('setChapter', { chapter: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    currentPage: (state, getters) => (id) => {
      return state.pages.find(page => page.pageId === id)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    search: searchState,
    manga: mangaState,
    globals: globalState
  }
})

export default store
