import { Article, IState } from '~/types/articles'

export const state = () => ({
  articles: [],
})

export const mutations = {
  getFirstArticle(state: IState) {
    return state.articles[0]
  },

  getRestOfTheArticles(state: IState) {
    return state.articles.slice(1, state.articles.length)
  },

  addArticles(state: IState, payload: Article[]) {
    state.articles = payload
  },
}
