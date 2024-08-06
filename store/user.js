import { jwtDecode } from 'jwt-decode'

export const state = () => ({
  user: null,
  id: null,
  token: null,
  isLoading: false,
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getId(state) {
    return state.id
  },
  isAuthenticated(state) {
    return state.token !== null
  },
  getIsLoading(state) {
    return state.isLoading
  },
}

export const mutations = {
  setUser(state, value) {
    state.user = value
  },
  setId(state, value) {
    state.id = value
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
      commit('setId', response.data.id)

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

  verifyAuth({ commit }, cookies) {
    const token = cookies.get('NEWSLETTER-TKN')
    const userId = cookies.get('NEWSLETTER-USERID')

    if (token) {
      const decodedToken = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)

      if (decodedToken.exp < currentTime) {
        cookies.remove('NEWSLETTER-TKN')
        cookies.remove('NEWSLETTER-USERID')
        commit('setToken', null)
        commit('setId', null)
        return
      }

      commit('setToken', token)
      commit('setId', userId)
    } else if (!token) {
      commit('setToken', null)
      commit('setId', null)
    }

    return
  },
}
