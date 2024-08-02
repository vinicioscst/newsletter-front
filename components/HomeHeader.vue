<template>
  <div class="py-11">
    <v-app-bar elevation="0" class="transparent">
      <div class="header-container">
        <NuxtLink to="/">
          <h1 class="logo">Newsletter</h1>
        </NuxtLink>
        <div class="hide-mobile">
          <NuxtLink to="/login">
            <v-btn outlined color="orange darken-3">
              <v-icon dark left> mdi-login </v-icon>
              Login
            </v-btn>
          </NuxtLink>
        </div>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hide-desktop"
        />
      </div>
    </v-app-bar>
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

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style lang="scss">
$screen-sm-min: 640px;
$screen-md-min: 768px;

.header-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.header-container a {
  text-decoration: none;
}

.logo {
  color: #ef6c00;
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

  @media (min-width: $screen-sm-min) {
    display: none;
  }
}

.hide-mobile {
  display: none;

  @media (min-width: $screen-sm-min) {
    display: block;
  }
}
</style>
