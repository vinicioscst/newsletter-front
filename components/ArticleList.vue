<template>
  <v-responsive width="100%" max-width="600px" class="px-4 mx-auto">
    <div width="100%" class="d-flex flex-row align-center justify-space-between pb-6">
      <h2 class="pr-2">Últimas notícias</h2>
      <a href="https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNREUxWm5JU0JYQjBMVUpTS0FBUAE?hl=pt-BR&gl=BR&ceid=BR%3Apt-419"
        target="_blank"><v-btn class="blue-grey darken-1 white--text">Todas as notícias</v-btn></a>
    </div>
    <v-list tag="ul" class="transparent py-0 px-0">
      <ArticleCard v-for="article in articles" :key="article.url" :article="article" />
    </v-list>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    }
  },

  async beforeMount() {
    await this.getArticles()
  },

  methods: {
    async getArticles() {
      const response = await this.$axios.$get(
        `/top-headlines?country=br&apiKey=${process.env.API_KEY}&pageSize=15`
      )
      this.articles = response.articles
    }
  }
}
</script>
