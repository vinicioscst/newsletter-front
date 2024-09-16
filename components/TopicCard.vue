<template>
  <NuxtLink
    :to="{ name: 'articles', query: { search: topic } }"
    :class="`rounded-xl white--text px-3 py-1 ${color} text-no-wrap link`"
    data-test="articles-topics"
  >
    <p class="text-lowercase mb-0">{{ `#${topic}` }}</p>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    topic: {
      type: String,
      default: () => '',
    },
    color: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
