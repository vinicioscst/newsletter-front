<template>
  <div>
    <div class="py-11 mb-11 grey darken-4 rounded-b-xl">
      <v-app-bar elevation="0" class="transparent">
        <div class="header-container justify-space-between">
          <NuxtLink to="/admin">
            <h1 class="logo">Dashboard</h1>
          </NuxtLink>
          <DashboardUserOptions />
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.header-container a {
  text-decoration: none;
}

.logo {
  color: white;
  text-transform: lowercase;
  user-select: none;
}
</style>
