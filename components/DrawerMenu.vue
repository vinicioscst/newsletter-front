<template>
  <v-navigation-drawer v-model="model" absolute temporary>
    <div class="py-11 px-6 container">
      <v-btn
        nuxt
        to="/login"
        color="orange darken-3"
        class="button"
        outlined
        block
      >
        <v-icon left> mdi-login </v-icon>
        Login
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

<style>
.container a {
  text-decoration: none;
}
</style>
