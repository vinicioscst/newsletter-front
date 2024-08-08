export const state = () => ({
  articles: null,
  topics: [],
  isLoading: false,
  isGenerateArticlesLoading: false,
  page: 1,
  perPage: 12,
  search: '',
  orderBy: 'MaisRecente',
  isOpen: false,
  selectedArticle: {},
})

export const getters = {
  getArticles(state) {
    return state.articles.articles
  },
  getArticlesCount(state) {
    return state.articles.count
  },
  getTotalPages(state) {
    return Math.ceil(state.articles.count / state.perPage)
  },
  getTopics(state) {
    return state.topics
  },
  getTopicsCount(state) {
    return state.topics.length
  },
  getLoadingStatus(state) {
    return state.isLoading
  },
  getGenerateArticlesLoadingStatus(state) {
    return state.isGenerateArticlesLoading
  },
  getOrderBy(state) {
    return state.orderBy
  },
  getPerPage(state) {
    return state.perPage
  },
  getIsOpen(state) {
    return state.isOpen
  },
  getSelectedArticle(state) {
    return state.selectedArticle
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
    state.isLoading = loading
  },
  setIsGenerateArticlesLoading(state, loading) {
    state.isGenerateArticlesLoading = loading
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
  setIsOpen(state, isOpen) {
    state.isOpen = isOpen
  },
  setSelectedArticle(state, articleId) {
    const articleIndex = this.state.articles.articles.findIndex(
      (article) => article.id === articleId
    )
    state.selectedArticle = this.state.articles.articles[articleIndex]
  },
}

export const actions = {
  async generateArticles({ commit, dispatch }, { body, toast, token }) {
    let endpoint = `/api/articles`

    try {
      commit('setIsGenerateArticlesLoading', true)

      await this.$axios.$post(endpoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Notícias geradas com sucesso!')

      commit('setPage', 1)
      commit('setPerPage', 4)
      commit('setSearch', '')
      commit('setOrderBy', 'MaisRecente')

      await dispatch('loadArticles')
      await dispatch('loadTopics')
    } catch (error) {
      console.error(error)
    } finally {
      commit('setIsGenerateArticlesLoading', false)
    }
  },

  async loadArticles({ commit, state }) {
    const page = state.page
    const perPage = state.perPage
    const search = state.search
    const orderBy = state.orderBy

    let endpoint = `/api/articles?page=${page}&perPage=${perPage}&search=${search}&orderBy=${orderBy}`

    try {
      const response = await this.$axios.$get(endpoint)
      commit('setArticles', response)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async editArticle({ commit, dispatch }, { id, body, toast, token }) {
    try {
      commit('setLoading', true)
      await this.$axios.patch(`/api/articles/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Notícia alterada com sucesso!')

      await dispatch('loadArticles')
      await dispatch('loadTopics')
    } catch (error) {
      console.error(error)
    } finally {
      commit('setLoading', false)
    }
  },

  async deleteArticle({ commit, dispatch }, { id, toast, token }) {
    try {
      commit('setLoading', true)
      await this.$axios.delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Notícia deletada com sucesso!')

      await dispatch('loadArticles')
      await dispatch('loadTopics')
    } catch (error) {
      console.error(error)
    } finally {
      commit('setLoading', false)
    }
  },

  async loadTopics({ commit }) {
    try {
      const response = await this.$axios.$get(`/api/articles/topics`)
      commit('setTopics', response)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('loadArticles')
    await dispatch('loadTopics')
  },
}
