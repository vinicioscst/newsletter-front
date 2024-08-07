<template>
  <v-app>
    <HomeHeader />
    <div class="page">
      <div class="page-container">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

.page {
  padding: 0 16px;
  width: 100%;
}

.page-container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
