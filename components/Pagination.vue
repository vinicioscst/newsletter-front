<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @input="handlePageChange"
    color="orange darken-3"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      totalPages: this.$store.getters['getTotalPages'],
    }
  },

  methods: {
    async handlePageChange(page) {
      this.currentPage = page
      await this.$store.dispatch('fetchArticles', page)
    },
  },
}
</script>
