<template>
  <v-dialog v-model="isOpenValue" max-width="500px">
    <v-card class="modal-card" data-test="article-preview-modal">
      <v-btn
        icon
        color="orange darken-3"
        class="white modal-btn"
        @click="handleClick"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-img :src="article.image" max-height="250px">
        <v-chip
          color="white"
          class="orange--text text--darken-3 mx-6 mt-4 px-6"
        >
          {{ article.topic }}
        </v-chip>
      </v-img>
      <v-card-title class="title">
        {{ article.title }}
      </v-card-title>

      <v-divider class="my-4 mx-6"></v-divider>

      <v-card-text class="pb-0">
        {{ article.content }}
        <p class="pt-4 mb-0 font-italic caption">
          * O texto acima foi originalmente gerado através de inteligência
          artificial. Algumas informações podem estar incorretas.
        </p>
      </v-card-text>
      <v-card-actions class="pa-6">
        <a :href="article.url" target="_blank" class="flex-grow-1">
          <v-btn color="orange darken-3" class="white--text" width="100%">
            Leia a matéria completa
          </v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    article() {
      return this.$store.getters['getSelectedArticle']
    },
    isOpenValue: {
      get() {
        return this.isOpen
      },
      set() {
        this.handleClick()
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit('isModalOpen', !this.isOpen)
    },
    formattedDate() {
      if (!this.article.publishedAt) return ''

      const articleDate = new Date(this.article.publishedAt)
      const today = new Date()
      const millisecondsDiff = today.getTime() - articleDate.getTime()
      const daysDiff = Math.round(millisecondsDiff / (24 * 60 * 60 * 1000))

      return new Intl.RelativeTimeFormat('pt-br', { style: 'short' }).format(
        daysDiff * -1,
        'day'
      )
    },
    formattedDateTitle() {
      if (!this.article.publishedAt) return ''

      const articleDate = new Date(this.article.publishedAt)

      return new Intl.DateTimeFormat('pt-BR').format(articleDate)
    },
  },
}
</script>

<style scoped>
.modal-card {
  position: relative;
}
.modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
}
.title {
  word-break: break-word !important;
  padding-bottom: 0px !important;
}
</style>
