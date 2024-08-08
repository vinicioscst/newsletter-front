<template>
  <div class="rounded-xxl elevation-5 px-5 pt-8 pb-5">
    <v-data-table
      :headers="headers"
      :items="articles"
      item-value="id"
      :items-per-page="perPage"
      :server-items-length="articlesCount"
      :footer-props="{
        itemsPerPageText: 'Notícias por página:',
        pageText: '{0}-{1} de {2}',
        itemsPerPageOptions: [4, 8, 12],
      }"
      @update:page="(page) => handlePageChange(page, perPage)"
      @update:items-per-page="
        (itemsPerPage) => handlePageChange(1, itemsPerPage)
      "
      disable-sort
    >
      <template v-slot:[`item.title`]="{ item }">
        <div class="text-truncate col-width">{{ item.title }}</div>
      </template>
      <template v-slot:[`item.topic`]="{ item }">
        <div class="text-truncate col-width">{{ item.topic }}</div>
      </template>
      <template v-slot:[`item.subtopic`]="{ item }">
        <div class="text-truncate col-width">{{ item.subtopic }}</div>
      </template>
      <template v-slot:[`item.publishedAt`]="{ item }">
        {{ formatDateTitle(item.publishedAt) }}
      </template>
      <template v-slot:[`item.source`]="{ item }">
        <div class="text-truncate col-width">{{ item.source }}</div>
      </template>
      <template v-slot:[`item.url`]="{ item }">
        <a :href="item.url" target="_blank">Link</a>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatDateTitle(item.createdAt) }}
      </template>
      <template v-slot:[`item.updatedAt`]="{ item }">
        {{ formatDateTitle(item.updatedAt) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="viewItem(item)">mdi-eye</v-icon>
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <PreviewModal :isOpen="viewDialog" @isModalOpen="handlePreviewModalOpen" />

    <EditModal :isOpen="editDialog" @isModalOpen="handleEditModalOpen" />

    <DeleteModal :isOpen="deleteDialog" @isModalOpen="handleDeleteModalOpen" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'Tópico', value: 'topic' },
        { text: 'Subtópico', value: 'subtopic' },
        { text: 'Publicado em', value: 'publishedAt' },
        { text: 'Fonte', value: 'source' },
        { text: 'Link', value: 'url' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Atualizado em', value: 'updatedAt' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      viewDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedItem: null,
    }
  },
  computed: {
    articles() {
      return this.$store.getters['getArticles']
    },
    perPage() {
      return this.$store.getters['getPerPage']
    },
    articlesCount() {
      return this.$store.getters['getArticlesCount']
    },
  },
  methods: {
    async handlePageChange(page = 1, itemsPerPage = this.perPage) {
      try {
        this.$store.commit('setPage', page)
        this.$store.commit('setPerPage', itemsPerPage)

        await this.$store.dispatch('loadArticles')
      } catch (error) {
        console.log(error)
      }
    },
    formatDateTitle(date) {
      if (!date) return ''

      const articleDate = new Date(date)

      return new Intl.DateTimeFormat('pt-BR').format(articleDate)
    },
    viewItem(item) {
      this.$store.commit('setSelectedArticle', item.id)
      this.viewDialog = true
    },
    editItem(item) {
      this.$store.commit('setSelectedArticle', item.id)
      this.editDialog = true
    },
    deleteItem(item) {
      this.$store.commit('setSelectedArticle', item.id)
      this.deleteDialog = true
    },
    confirmDelete() {
      // Lógica para confirmar deleção
      this.deleteDialog = false
    },
    handlePreviewModalOpen(data) {
      return (this.viewDialog = data)
    },
    handleEditModalOpen(data) {
      return (this.editDialog = data)
    },
    handleDeleteModalOpen(data) {
      return (this.deleteDialog = data)
    },
  },
}
</script>

<style>
.col-width {
  max-width: 150px;
}
</style>
