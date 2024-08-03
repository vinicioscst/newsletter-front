export const state = () => ({
  articles: {},
  topics: [],
  isLoading: false,
  page: 1,
  perPage: 12,
  search: '',
  orderBy: 'MaisRecente',
})

export const getters = {
  getArticles(state) {
    return state.articles.articles
  },
  getTotalPages(state) {
    return Math.ceil(state.articles.count / state.perPage)
  },
  getTopics(state) {
    return state.topics
  },
  getLoadingStatus(state) {
    return state.isLoading
  },
  getOrderBy(state) {
    return state.orderBy
  },
  getPerPage(state) {
    return state.perPage
  },
}

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setTopics(state, topics) {
    state.topics = topics
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setPage(state, page) {
    state.page = page
  },
  setPerPage(state, perPage) {
    state.perPage = perPage
  },
  setSearch(state, search) {
    state.search = search
  },
  setOrderBy(state, orderBy) {
    state.orderBy = orderBy
  },
}

export const actions = {
  async fetchArticles({ commit }) {
    const page = this.state.page
    const perPage = this.state.perPage
    const search = this.state.search
    const orderBy = this.state.orderBy

    let endpoint = `/api/articles?page=${page}&perPage=${perPage}&search=${search}&orderBy=${orderBy}`

    try {
      commit('setLoading', true)
      const response = await this.$axios.$get(endpoint)
      commit('setArticles', response)
      return response
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      commit('setLoading', false)
    }
  },

  async fetchTopics({ commit }) {
    try {
      const response = await this.$axios.$get(`/api/articles/topics`)
      commit('setTopics', response)
      return response
    } catch (error) {
      console.error('Error fetching articles topics:', error)
    }
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchArticles', {})
    await dispatch('fetchTopics', {})
  },
}
