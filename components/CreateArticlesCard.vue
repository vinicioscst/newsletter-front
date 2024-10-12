<template>
  <v-card color="orange darken-4" class="pa-6 text-center rounded-xxl">
    <h3 class="font-weight-regular white--text title">
      Gerar notícias
      <v-tooltip bottom max-width="350px" color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" color="white">
            mdi-information
          </v-icon>
        </template>
        <span
          >Ocasionalmente, ao gerar notícias, podem ocorrer erros devido as
          limitações da ferramenta de IA. Se os erros persistirem, tente
          novamente depois</span
        >
      </v-tooltip>
    </h3>

    <v-form class="py-4" @submit.prevent="handleSubmit">
      <Select
        :items="topics"
        :model="topicsModel"
        label="Selecione o tópico"
        @selectChangeValue="handleTopicValue"
      />
      <v-btn
        width="100%"
        color="white"
        class="orange--text text--darken-3 elevation-0"
        type="submit"
        :loading="loading"
        :disabled="loading"
        data-test="create-article-button"
        >Gerar</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      topicsModel: { text: 'Geral', value: '' },
      topics: [
        { text: 'Geral', value: '' },
        { text: 'Brasil', value: 'brazil' },
        { text: 'Tecnologia e Jogos', value: 'tech-and-games' },
        { text: 'Ciência e Saúde', value: 'science-and-health' },
        { text: 'Música', value: 'music' },
        { text: 'Economia', value: 'economy' },
        { text: 'Educação', value: 'education' },
        { text: 'Pop e Arte', value: 'pop-and-art' },
      ],
      selectedTopicValue: {
        topic: '',
      },
    }
  },

  computed: {
    loading() {
      return this.$store.getters['getGenerateArticlesLoadingStatus']
    },
  },

  methods: {
    handleTopicValue(data) {
      this.selectedTopicValue.topic = data
    },
    async handleSubmit() {
      try {
        await this.$store.dispatch('generateArticles', {
          body: this.selectedTopicValue,
          toast: this.$toast,
          token: this.$store.getters['user/getToken'],
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 2rem;
}
</style>
