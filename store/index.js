export const state = () => ({
  articles: {},
  isLoading: false,
})

export const getters = {
  getArticles(state) {
    return state.articles.articles
  },
  getTotalPages(state) {
    return Math.ceil(state.articles.count / 12)
  },
  getTopics(state) {
    return [...new Set(state.articles.articles.map((article) => article.topic))]
  },
  getLoadingStatus(state) {
    return state.isLoading
  },
}

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async fetchArticles({ commit }, page = 1) {
    try {
      commit('setLoading', true)
      const response = await this.$axios.$get(
        `/api/articles?perPage=12&page=${page}`
      )
      commit('setArticles', response)
      return response
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      commit('setLoading', false)
    }
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchArticles')
  },
}
