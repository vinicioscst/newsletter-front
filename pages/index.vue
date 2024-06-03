<template>
  <div>
    <v-app-bar
      extended
      dark
      elevation="0"
      class="d-flex align-center justify-center gap-4 px-6 blue-grey darken-4"
    >
      <v-icon large class="pr-4"> mdi-newspaper </v-icon>
      <h1>Newsletter</h1>
    </v-app-bar>
    <v-main class="py-14">
      <ArticleList></ArticleList>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
