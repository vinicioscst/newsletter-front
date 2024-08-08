<template>
  <v-dialog v-model="isOpenValue" max-width="500px">
    <v-card class="pa-6">
      <v-card-title class="pa-0 pb-3">Editar notícia</v-card-title>
      <EditForm @closeModal="handleClick" />
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
    formattedDateTitle() {
      if (!this.article.publishedAt) return ''

      const articleDate = new Date(this.article.publishedAt)

      return new Intl.DateTimeFormat().format(articleDate)
    },
  },
}
</script>
