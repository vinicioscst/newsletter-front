<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @input="handlePageChange"
    color="orange darken-3"
    class="mt-6"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
    }
  },

  computed: {
    totalPages() {
      return this.$store.getters['getTotalPages']
    },
  },

  methods: {
    async handlePageChange(page) {
      try {
        this.currentPage = page
        await this.$store.dispatch('fetchArticles', { page })
      } catch (error) {}
    },
  },
}
</script>
