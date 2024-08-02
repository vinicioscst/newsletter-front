<template>
  <div class="py-11 px-6 container">
    <NuxtLink to="/login">
      <v-btn color="orange darken-3" class="button" outlined block>
        <v-icon left> mdi-login </v-icon>
        Login
      </v-btn>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.container a {
  text-decoration: none;
}
</style>
