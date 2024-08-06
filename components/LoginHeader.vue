<template>
  <div>
    <div class="hide-mobile">
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
      @click.stop="handleClick"
      class="hide-desktop white orange--text text--darken-3"
    />
  </div>
</template>

<script>
export default {
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('update:isDrawerOpen', !this.isDrawerOpen)
    },
  },
}
</script>

<style>
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
