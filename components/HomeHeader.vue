<template>
  <div>
    <div class="py-11 mb-11 orange darken-3 rounded-b-xl">
      <v-app-bar elevation="0" class="transparent">
        <div
          :class="`header-container ${
            !isOnLogin
              ? 'justify-space-between'
              : 'justify-sm-start justify-center'
          }`"
        >
          <NuxtLink to="/">
            <h1 class="logo">Newsletter</h1>
          </NuxtLink>
          <div v-if="!isOnLogin" class="hide-mobile">
            <v-btn
              nuxt
              to="/login"
              outlined
              class="white orange--text text--darken-3"
            >
              <v-icon dark left> mdi-login </v-icon>
              Login
            </v-btn>
          </div>
          <v-app-bar-nav-icon
            v-if="!isOnLogin"
            @click.stop="drawer = !drawer"
            class="hide-desktop white orange--text text--darken-3"
          />
        </div>
      </v-app-bar>
    </div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <DrawerMenu />
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  computed: {
    isOnLogin() {
      return this.$route.path === '/login'
    },
  },

  watch: {
    group() {
      this.drawer = false
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

.search-menu-container {
  display: flex;
  gap: 0.5rem;
}

.search-menu-container button {
  margin-top: 2px;
}

.hide-desktop {
  display: block;

  @media (min-width: 640px) {
    display: none;
  }
}

.hide-mobile {
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
}
</style>
