<template>
  <div>
    <h1 class="mb-8 font-weight-regular text-center text-sm-left">
      Olá,
      <span class="font-weight-black" data-test="dashboard-username">{{
        user?.name
      }}</span>
    </h1>

    <div class="cards-container mb-8">
      <CreateArticlesCard />
      <GridCard :info="totalArticlesInfo" dataTest="articles-info" />
      <GridCard :info="totalTopicsInfo" dataTest="topics-info" />
    </div>

    <ArticlesTable />
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'dashboard',

  data() {
    return {
      totalArticlesInfo: {
        title: 'Total de notícias',
        value: 0,
        colors: 'deep-purple darken-4 white--text',
      },
      totalTopicsInfo: {
        title: 'Total de tópicos',
        value: 0,
        colors: 'cyan darken-4 darken-4 white--text',
      },
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
    articlesCount() {
      return this.$store.getters['getArticlesCount']
    },
    topicsCount() {
      return this.$store.getters['getTopicsCount']
    },
  },

  watch: {
    articlesCount(newCount) {
      this.totalArticlesInfo.value = newCount
    },
    topicsCount(newCount) {
      this.totalTopicsInfo.value = newCount
    },
  },

  async mounted() {
    if (this.user === null) {
      try {
        await this.$store.dispatch('user/loadUser')
      } catch (error) {
        console.log(error)
      }
    }
    if (this.articles === null) {
      this.$store.commit('setSearch', '')
      this.$store.commit('setOrderBy', 'MaisRecente')
    }

    try {
      this.$store.commit('setPage', 1)
      this.$store.commit('setPerPage', 12)
      await this.$store.dispatch('loadArticles')
      await this.$store.dispatch('loadTopics')
    } catch (error) {
      console.log(error)
    }

    this.totalArticlesInfo.value = this.articlesCount
    this.totalTopicsInfo.value = this.topicsCount
  },
}
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}
</style>
