<template>
  <v-form @submit.prevent="goToSearchPage" class="d-flex gap-4">
    <v-text-field
      color="orange darken-3"
      placeholder="Pesquise pelo título ou tópico"
      v-model="inputText"
      filled
      rounded
    />
    <v-btn
      type="submit"
      color="orange darken-3"
      min-width="56px"
      height="56px"
      class="white--text elevation-0"
      filled
      rounded
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
    }
  },
  methods: {
    goToSearchPage(e) {
      const search = e.target[0].value
      this.$router.push({ path: '/articles', query: { search } })
    },
  },
}
</script>
