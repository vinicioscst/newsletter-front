<template>
  <div>
    <v-list
      v-if="isLoading"
      tag="ul"
      width="100%"
      class="transparent py-0 px-0 mx-auto grid-2col"
    >
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
      <v-skeleton-loader type="card" class="v-flex flex-column gap-4" />
    </v-list>
    <v-list
      v-if="hasArticles"
      tag="ul"
      width="100%"
      class="transparent py-0 px-0 mx-auto grid-2col"
      data-test="articles-list"
    >
      <ArticleCard
        v-for="article in articles"
        :key="article.title"
        :article="article"
        :color="generateColor(colors.length)"
      />
    </v-list>
    <v-list
      v-if="!hasArticles"
      tag="ul"
      width="100%"
      class="transparent py-0 px-0 mx-auto grid-2col"
    >
      <h3 class="text-center pb-10" data-test="no-articles">
        Nenhuma notícia encontrada
      </h3>
    </v-list>
    <PreviewModal :isOpen="isOpen" @isModalOpen="handleModalOpen" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'red darken-3',
        'pink darken-3',
        'purple darken-3',
        'deep-purple darken-3',
        'indigo darken-3',
        'deep-orange darken-3',
      ],
    }
  },
  computed: {
    articles() {
      return this.$store.getters['getArticles']
    },
    hasArticles() {
      return this.articles && this.articles.length > 0
    },
    isLoading() {
      return this.$store.getters['getLoadingStatus']
    },
    isOpen() {
      return this.$store.getters['getIsOpen']
    },
  },
  methods: {
    generateColor(arrayLength) {
      return this.colors[Math.trunc(Math.random() * arrayLength)]
    },
    handleModalOpen(data) {
      return this.$store.commit('setIsOpen', data)
    },
  },
}
</script>

<style scoped>
.grid-2col {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.gap-4 {
  gap: 1rem;
}
</style>
