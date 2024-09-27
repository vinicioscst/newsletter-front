<template>
  <v-menu bottom left min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon large v-on="on" data-test="settings-button">
        <v-avatar color="grey lighten-3">
          <v-icon> mdi-account-circle </v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-card class="mt-2">
      <v-list-item-content class="pa-0">
        <div class="mx-auto text-center">
          <div class="user-info">
            <h3>{{ user?.name }}</h3>
            <p>
              {{ user?.email }}
            </p>
          </div>
          <v-divider></v-divider>
          <v-btn
            nuxt
            to="/admin/settings"
            color="transparent"
            elevation="0"
            class="menu-options py-5 rounded-0"
            data-test="menu-settings-button"
          >
            Configurações
          </v-btn>
          <v-divider></v-divider>
          <v-btn
            @click="handleLogout"
            color="orange darken-4"
            elevation="0"
            class="menu-options py-5 white--text rounded-0"
            data-test="menu-logout-button"
          >
            Logout
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('user/logoutUser', {
        cookies: this.$cookies,
        toast: this.$toast,
        router: this.$router,
      })
    },
  },
}
</script>

<style scoped>
.user-info {
  user-select: none;
  padding: 1rem;
}
.user-info p {
  margin: 0;
}
.menu-options {
  width: 100%;
}
</style>
