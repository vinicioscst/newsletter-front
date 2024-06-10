<template>
  <v-card
    width="auto"
    min-width="200px"
    tag="li"
    elevation="0"
    class="mb-3 blue-grey lighten-5"
  >
    <v-img v-bind="articleImg">
      <v-card-title tag="h3" class="text-break">
        {{ articleData.title }}
      </v-card-title>
      <v-card-subtitle class="grey--text lighten-5">{{
        articleData.source
      }}</v-card-subtitle>
    </v-img>

    <v-card-subtitle>{{ articleData.headline }}</v-card-subtitle>
    <div class="d-flex flex-row align-center justify-space-between px-4 py-4">
      <v-card-text class="px-0 py-0 blue-grey--text darken-4">
        {{ formattedDate }}
      </v-card-text>
      <a :href="articleData.url" target="_blank">
        <v-btn small class="blue-grey lighten-1 white--text"> Leia mais </v-btn>
      </a>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      articleData: this.article,
      articleImg: {
        height: '300px',
        src: `https://via.placeholder.com/600x400/263238?text=${this.article.topic}`,
        class: 'white--text align-end',
      },
    }
  },
  computed: {
    formattedDate() {
      const articleDate = new Date(this.articleData.publishedAt)
      const today = new Date()
      const millisecondsDiff = today.getTime() - articleDate.getTime()
      const daysDiff = Math.round(millisecondsDiff / (24 * 60 * 60 * 1000))

      return new Intl.RelativeTimeFormat('pt-br', { style: 'short' }).format(
        daysDiff * -1,
        'day'
      )
    },
  },
}
</script>

<style lang="scss">
.text-break {
  word-break: break-all;
}
</style>
