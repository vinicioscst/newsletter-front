<template>
  <v-dialog v-model="isOpenValue" width="auto">
    <v-card class="pa-6" data-test="article-delete-modal">
      <v-card-title class="pa-0 pb-1">Deletar notícia?</v-card-title>
      <v-card-text class="pa-0 pb-6"
        >Essa ação não poderá ser revertida.</v-card-text
      >
      <v-card-actions class="pa-0">
        <v-btn
          color="orange darken-3"
          class="white--text"
          type="submit"
          :loading="loading"
          :disabled="loading"
          @click="handleDelete"
          data-test="article-delete-button"
        >
          Sim
        </v-btn>
        <v-btn color="secondary" text @click="handleClick">Não</v-btn>
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
    isOpenValue: {
      get() {
        return this.isOpen
      },
      set() {
        this.handleClick()
      },
    },
    loading() {
      return this.$store.getters['getLoadingStatus']
    },
    article() {
      return this.$store.getters['getSelectedArticle']
    },
  },
  methods: {
    handleClick() {
      this.$emit('isModalOpen', !this.isOpen)
    },
    async handleDelete() {
      try {
        await this.$store.dispatch('deleteArticle', {
          id: this.article?.id,
          toast: this.$toast,
          token: this.$store.getters['user/getToken'],
        })

        this.handleClick()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
