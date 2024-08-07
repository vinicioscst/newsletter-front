<template>
  <div>
    <v-btn
      nuxt
      to="/login"
      outlined
      class="white orange--text text--darken-3 login-btn-desktop"
    >
      <v-icon dark left> mdi-login </v-icon>
      Login
    </v-btn>
    <v-btn
      nuxt
      to="/login"
      outlined
      class="white orange--text text--darken-3 login-btn-mobile"
    >
      <v-icon dark dense> mdi-login </v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.login-btn-desktop {
  display: none;

  @media (min-width: 500px) {
    display: inline-flex;
  }
}

.login-btn-mobile {
  display: inline-flex;

  @media (min-width: 500px) {
    display: none;
  }
}
</style>
