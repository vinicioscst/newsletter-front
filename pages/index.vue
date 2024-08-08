<template>
  <div>
    <SearchArticles />
    <TopicsList />
    <v-main class="py-11">
      <ArticleListHeader />
      <ArticleList />
      <Pagination />
    </v-main>
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
      await this.$store.dispatch('loadArticles')
    } catch (error) {}
  },
}
</script>
