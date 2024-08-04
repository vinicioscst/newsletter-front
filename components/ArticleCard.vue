<template>
  <v-card tag="li" elevation="0" class="mb-3 blue-grey lighten-5">
    <v-img v-bind="articleImg" class="article-img">
      <v-chip :class="`ml-4 ${color} white--text`">{{
        articleData?.subtopic || 'Subtópico indisponível'
      }}</v-chip>
      <v-card-title tag="h3" class="text-break">
        {{ articleData?.title || 'Título Indisponível' }}
      </v-card-title>
      <v-card-subtitle class="grey--text lighten-5">{{
        articleData?.source || 'Fonte Indisponível'
      }}</v-card-subtitle>
      <div class="article-img-gradient"></div>
    </v-img>
    <div class="d-flex flex-row align-center justify-space-between px-4 py-4">
      <v-card-text
        class="px-0 py-0 grey--text text--darken-1"
        :title="formattedDateTitle"
      >
        {{ formattedDate }}
      </v-card-text>
      <v-btn
        small
        outlined
        color="grey darken-1"
        @click.stop="() => handleArticleOpen(articleData?.id)"
      >
        Saiba mais
      </v-btn>
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
    color: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      articleData: this.article,
      articleImg: {
        height: '300px',
        src: this.article.image,
        class: 'white--text align-end',
      },
    }
  },
  computed: {
    formattedDate() {
      if (!this.articleData.publishedAt) return ''

      const articleDate = new Date(this.articleData.publishedAt)
      const today = new Date()
      const millisecondsDiff = today.getTime() - articleDate.getTime()
      const daysDiff = Math.round(millisecondsDiff / (24 * 60 * 60 * 1000))

      return new Intl.RelativeTimeFormat('pt-br', { style: 'short' }).format(
        daysDiff * -1,
        'day'
      )
    },
    formattedDateTitle() {
      if (!this.articleData.publishedAt) return ''

      const articleDate = new Date(this.articleData.publishedAt)

      return new Intl.DateTimeFormat('pt-BR').format(articleDate)
    },
  },
  methods: {
    handleArticleOpen(id) {
      this.$store.commit('setSelectedArticle', id)
      this.$store.commit('setIsOpen', true)
    },
  },
}
</script>

<style lang="scss">
.text-break {
  word-break: break-all;
}

.article-img {
  position: relative;
}

.article-img-gradient {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #141414 0%, #ffffff00 100%);
}
</style>
