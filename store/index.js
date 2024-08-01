export const state = () => ({
  articles: {},
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
}

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
}

export const actions = {
  async fetchArticles({ commit }) {
    try {
      const response = await this.$axios.$get(`/api/articles?perPage=12`)
      commit('setArticles', response)
      return response
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchArticles')
  },
}
