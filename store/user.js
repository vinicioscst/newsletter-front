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
  getToken(state) {
    return state.token
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
  async loginUser({ commit }, { body, cookies, toast, router }) {
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

      toast.success('Login realizado com sucesso!')

      router.push('/admin')
    } catch (error) {
      console.error(error)
    } finally {
      commit('setIsLoading', false)
    }
  },

  async loadUser({ commit, state }) {
    try {
      const { data } = await this.$axios.get(`api/user/${state.id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })

      commit('setUser', data)
    } catch (error) {
      console.error(error)
    }
  },

  async editUser({ commit, state }, { body, toast }) {
    try {
      const { data } = await this.$axios.patch(`api/user/${state.id}`, body, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })

      toast.success('Usuário alterado com sucesso!')

      commit('setUser', data)
    } catch (error) {
      console.error(error)
    }
  },

  logoutUser({ commit }, { cookies, toast, router }) {
    toast.success('Logout realizado com sucesso!')

    setTimeout(() => {
      router.push('/login')
      cookies.remove('NEWSLETTER-TKN')
      cookies.remove('NEWSLETTER-USERID')
      commit('setToken', null)
      commit('setId', null)
      commit('setUser', null)
    }, 1500)
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
