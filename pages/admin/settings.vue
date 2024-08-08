<template>
  <div>
    <h1>Settings</h1>
  </div>
</template>

<script>
export default {
  name: 'AdminSettingsPage',
  layout: 'dashboard',
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
  },

  async beforeMount() {
    if (this.user === null) {
      try {
        await this.$store.dispatch('user/loadUser')
      } catch (error) {}
    }
  },
}
</script>
