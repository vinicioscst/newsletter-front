export interface Source {
  id: string | null
  name: string
}

export interface Article {
  source: Source
  author: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface IArticlesResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export interface IState {
  articles: Article[]
}
