<template>
  <div>
    <div class="page">
      <div class="page-container">
        <SearchArticles />
        <TopicsList />
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
  watch: {
    '$route.query': '$fetch',
  },
  async fetch() {
    try {
      this.$store.commit('setPage', 1)
      this.$store.commit('setSearch', this.$route.query.search)

      await this.$store.dispatch('fetchArticles')
    } catch (error) {}
  },
}
</script>
