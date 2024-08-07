<template>
  <div>
    <div class="py-11 mb-11 orange darken-3 rounded-b-xl">
      <v-app-bar elevation="0" class="transparent">
        <div class="header-container justify-space-between">
          <NuxtLink to="/">
            <h1 class="logo">Newsletter</h1>
          </NuxtLink>
          <HomeHeaderLoginButton v-if="isOnBlog" />
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isOnBlog() {
      return this.$route.path === '/' || this.$route.path === '/articles'
    },
  },
}
</script>

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
