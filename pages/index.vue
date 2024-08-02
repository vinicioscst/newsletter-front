<template>
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
</template>

<script>
export default {
  name: 'IndexPage',
  async beforeMount() {
    try {
      await this.$store.dispatch('fetchArticles', {
        page: 1,
      })
    } catch (error) {}
  },
}
</script>

<style lang="scss">
.page {
  padding: 0 16px;
}

.page-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
