<template>
  <v-responsive width="100%" max-width="1000px" class="px-4 mx-auto">
    <div
      width="100%"
      class="d-flex flex-row align-center justify-space-between pb-6"
    >
      <h2 class="pr-2">Últimas notícias</h2>
      <a
        href="https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNREUxWm5JU0JYQjBMVUpTS0FBUAE?hl=pt-BR&gl=BR&ceid=BR%3Apt-419"
        target="_blank"
        ><v-btn class="blue-grey darken-1 white--text"
          >Todas as notícias</v-btn
        ></a
      >
    </div>
    <v-list
      v-if="articles.length === 0"
      tag="ul"
      width="100%"
      max-width="1000px"
      class="transparent py-0 px-0 mx-auto grid-2col"
    >
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
    </v-list>
    <v-list
      v-if="articles.length !== 0"
      tag="ul"
      width="100%"
      max-width="1000px"
      class="transparent py-0 px-0 mx-auto grid-2col"
    >
      <ArticleCard
        v-for="article in articles"
        :key="article.url"
        :article="article"
      />
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
      this.articles = await this.$axios.$get(`/api/articles`)
    },
  },
}
</script>

<style lang="scss">
$screen-sm-min: 640px;

.grid-2col {
  display: grid !important;
  grid-template-columns: auto;
  gap: 1.5rem;

  @media (min-width: $screen-sm-min) {
    grid-template-columns: auto auto;
  }
}

.gap-4 {
  gap: 1rem;
}
</style>
