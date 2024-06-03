<template>
  <v-card tag="li" elevation="0" class="mb-3 blue-grey lighten-5">
    <v-img
      height="300px"
      src="https://img.freepik.com/fotos-premium/fundo-de-noticias-abstrato-grafico-chao-de-estudio-vazio-fundo-de-tema-vermelho-e-azul-ilustracao-3d_665346-6466.jpg"
      class="white--text align-end"
    >
      <v-card-title tag="h3">
        {{ article.title.split(' - ')[0] }}
      </v-card-title>
      <v-card-subtitle class="grey--text lighten-5">{{
        article.source.name
      }}</v-card-subtitle>
    </v-img>

    <v-card-subtitle
      >Descrição da matéria, incluindo os principais detalhes sobre o
      assunto</v-card-subtitle
    >
    <div class="d-flex flex-row align-center justify-space-between px-4 py-4">
      <v-card-text class="px-0 py-0 blue-grey--text darken-4">
        {{ new Date(article.publishedAt).toLocaleDateString('pt-BR') }}
      </v-card-text>
      <a :href="article.url" target="_blank"
        ><v-btn small class="blue-grey lighten-1 white--text"
          >Leia mais</v-btn
        ></a
      >
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
}
</script>
