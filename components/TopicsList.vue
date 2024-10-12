<template>
  <div v-if="topics && topics.length > 0" data-test="topics-list">
    <h2 class="pb-6">Tópicos</h2>
    <div
      class="grey lighten-4 px-4 py-3 rounded-xl d-flex gap-4 overflow-x-auto"
    >
      <TopicCard
        v-for="topic in topics"
        :key="topic.topic"
        :topic="topic.topic"
        :color="generateColor(colors.length)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'red darken-3',
        'pink darken-3',
        'purple darken-3',
        'deep-purple darken-3',
        'indigo darken-3',
        'deep-orange darken-3',
      ],
    }
  },

  computed: {
    topics() {
      return this.$store.getters['getTopics']
    },
  },

  methods: {
    generateColor(arrayLength) {
      return this.colors[Math.trunc(Math.random() * arrayLength)]
    },
  },
}
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
