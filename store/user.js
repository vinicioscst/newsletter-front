export const state = () => ({
  loggedIn: false,
  user: null,
  token: '',
  isLoading: false,
})

export const getters = {
  getLoggedIn(state) {
    return state.loggedIn
  },
  getUser(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  },
  getIsLoading(state) {
    return state.isLoading
  },
}

export const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setUser(state, value) {
    state.user = value
  },
  setToken(state, value) {
    state.token = value
  },
  setIsLoading(state, value) {
    state.isLoading = value
  },
}

export const actions = {
  async loginUser({ commit }, { body, cookies }) {
    try {
      commit('setIsLoading', true)
      const response = await this.$axios.post('api/login', body)

      commit('setToken', response.data.token)
      commit('setLoggedIn', true)

      const options = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      }

      const allCookies = [
        { name: 'NEWSLETTER-TKN', value: response.data.token, opts: options },
        { name: 'NEWSLETTER-USERID', value: response.data.id, opts: options },
      ]

      cookies.setAll(allCookies)

      return response
    } catch (error) {
      return error
    } finally {
      commit('setIsLoading', false)
    }
  },
}
