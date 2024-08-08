<template>
  <v-app>
    <DashboardHeader />
    <div class="page">
      <div class="page-container mx-auto my-11">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'DashboardLayout',
}
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

.dashboard-container {
  display: grid;
  grid-template-columns: auto 1fr;
}

.page {
  padding: 0 16px;
  width: 100%;
}

.page-container {
  max-width: 1280px;
}
</style>
