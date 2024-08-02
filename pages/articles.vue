<template>
  <div>
    <div class="page">
      <div class="page-container">
        <SearchArticles />
        <v-main class="py-11">
          <h2 class="pr-2 pb-6">Últimas notícias</h2>
          <ArticleList />
          <Pagination />
        </v-main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlesPage',
  data() {
    return {
      params: null,
    }
  },
  async mounted() {
    this.params = this.$route.query.title

    try {
      await this.$store.dispatch('fetchArticles', {
        page: 1,
        title: this.$route.query.title,
      })
    } catch (error) {}
  },
}
</script>
