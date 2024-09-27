<template>
  <v-form
    ref="form"
    v-model="fieldIsValid"
    @submit.prevent="handleForm"
    lazy-validation
  >
    <v-text-field
      :rules="titleInfo.rules"
      :name="titleInfo.name"
      :label="titleInfo.label"
      :value="titleInfo.value"
      color="orange darken-3"
      dense
      outlined
      data-test="article-title-edit-input"
    />

    <v-text-field
      :rules="topicInfo.rules"
      :name="topicInfo.name"
      :label="topicInfo.label"
      :value="topicInfo.value"
      color="orange darken-3"
      dense
      outlined
    />

    <v-text-field
      :rules="subtopicInfo.rules"
      :name="subtopicInfo.name"
      :label="subtopicInfo.label"
      :value="subtopicInfo.value"
      color="orange darken-3"
      dense
      outlined
    />

    <v-text-field
      :rules="publishedAtInfo.rules"
      :name="publishedAtInfo.name"
      :label="publishedAtInfo.label"
      :value="publishedAtInfo.value"
      color="orange darken-3"
      dense
      outlined
      type="datetime-local"
    />

    <v-textarea
      :rules="contentInfo.rules"
      :name="contentInfo.name"
      :label="contentInfo.label"
      :value="contentInfo.value"
      rows="3"
      color="orange darken-3"
      no-resize
      dense
      outlined
    />

    <v-text-field
      :rules="sourceInfo.rules"
      :name="sourceInfo.name"
      :label="sourceInfo.label"
      :value="sourceInfo.value"
      color="orange darken-3"
      dense
      outlined
    />

    <v-text-field
      :rules="urlInfo.rules"
      :name="urlInfo.name"
      :label="urlInfo.label"
      :value="urlInfo.value"
      color="orange darken-3"
      dense
      outlined
    />

    <v-text-field
      :rules="imageInfo.rules"
      :name="imageInfo.name"
      :label="imageInfo.label"
      :value="imageInfo.value"
      color="orange darken-3"
      dense
      outlined
    />

    <v-card-actions class="px-0 pb-4">
      <v-btn
        color="orange darken-3"
        class="white--text"
        type="submit"
        :loading="loading"
        :disabled="!fieldIsValid || loading"
        data-test="article-edit-button"
      >
        Salvar
      </v-btn>
      <v-btn color="secondary" text @click="handleClose">Cancelar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['getLoadingStatus']
    },
    article() {
      return this.$store.getters['getSelectedArticle']
    },
    titleInfo() {
      return {
        name: 'title',
        value: this.article?.title,
        rules: [
          (v) =>
            !v ||
            v.length <= 255 ||
            'Título deve conter, no máximo, 255 caracteres',
        ],
        label: 'Título',
      }
    },
    topicInfo() {
      return {
        name: 'topic',
        value: this.article?.topic,
        rules: [
          (v) =>
            !v ||
            v.length <= 50 ||
            'Tópico deve conter, no máximo, 50 caracteres',
        ],
        label: 'Tópico',
      }
    },
    subtopicInfo() {
      return {
        name: 'subtopic',
        value: this.article?.subtopic,
        rules: [
          (v) =>
            !v ||
            v.length <= 50 ||
            'Subtópico deve conter, no máximo, 50 caracteres',
        ],
        label: 'Subtópico',
      }
    },
    publishedAtInfo() {
      return {
        name: 'publishedAt',
        value: this.formatDate(this.article?.publishedAt),
        rules: [],
        label: 'Publicado em',
      }
    },
    contentInfo() {
      return {
        name: 'content',
        value: this.article?.content,
        rules: [],
        label: 'Conteúdo',
      }
    },
    sourceInfo() {
      return {
        name: 'source',
        value: this.article?.source,
        rules: [
          (v) =>
            !v ||
            v.length <= 50 ||
            'Fonte deve conter, no máximo, 50 caracteres',
        ],
        label: 'Fonte',
      }
    },
    urlInfo() {
      return {
        name: 'url',
        value: this.article?.url,
        rules: [],
        label: 'Link',
      }
    },
    imageInfo() {
      return {
        name: 'image',
        value: this.article?.image,
        rules: [],
        label: 'Foto',
      }
    },
  },
  data() {
    return {
      fieldIsValid: true,
      show: false,
      title: '',
      topic: '',
      subtopic: '',
      publishedAt: '',
      content: '',
      source: '',
      url: '',
      image: '',
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeModal')
    },
    handleFormSubmit(payload) {
      this.$emit('closeModal', payload)
    },
    formatDate(publicationDate) {
      const date = new Date(publicationDate)

      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}T${String(
        date.getHours()
      ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    },
    isFormValid() {
      return this.$refs.form.validate()
    },
    removeEmptyFields(obj) {
      const filteredObj = {}

      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== '') {
          filteredObj[key] = obj[key]
        }
      }

      return filteredObj
    },
    async handleForm(e) {
      const isValid = this.isFormValid()
      if (!isValid) return

      try {
        const body = {
          title: e.target[1].value,
          topic: e.target[3].value,
          subtopic: e.target[5].value,
          publishedAt:
            e.target[7].value === '' ? null : new Date(e.target[7].value),
          content: e.target[9].value,
          source: e.target[11].value,
          url: e.target[13].value,
          image: e.target[15].value === '' ? null : e.target[15].value,
        }

        await this.$store.dispatch('editArticle', {
          id: this.article?.id,
          body: this.removeEmptyFields(body),
          toast: this.$toast,
          token: this.$store.getters['user/getToken'],
        })

        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
