<template>
  <div class="page">
    <div class="page-container">
      <SearchArticles />
      <TopicsList />
      <v-main class="py-11">
        <ArticleListHeader />
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
      this.$store.commit('setPage', 1)
      this.$store.commit('setPerPage', 12)
      this.$store.commit('setSearch', '')
      this.$store.commit('setOrderBy', 'MaisRecente')
      await this.$store.dispatch('fetchArticles')
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
