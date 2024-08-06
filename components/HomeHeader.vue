<template>
  <div>
    <div class="py-11 mb-11 orange darken-3 rounded-b-xl">
      <v-app-bar elevation="0" class="transparent">
        <div
          :class="`header-container ${
            isOnBlog
              ? 'justify-space-between'
              : 'justify-sm-start justify-center'
          }`"
        >
          <NuxtLink to="/">
            <h1 class="logo">Newsletter</h1>
          </NuxtLink>
          <LoginHeader
            v-if="isOnBlog"
            :isDrawerOpen="drawer"
            @update:isDrawerOpen="handleMenuOpen"
          />
        </div>
      </v-app-bar>
    </div>
    <DrawerMenu v-if="isOnBlog" :value="drawer" @input="handleOpenClose" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },

  computed: {
    isOnBlog() {
      return this.$route.path === '/' || this.$route.path === '/articles'
    },
    isOnAdmin() {
      return this.$route.path.startsWith('/admin')
    },
  },

  methods: {
    handleMenuOpen(data) {
      this.drawer = data
    },
    handleOpenClose(data) {
      this.drawer = data
    },
  },
}
</script>

<style>
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
