<template>
  <div v-if="subjects.length > 0">
    <h2 class="pb-6">Tópicos</h2>
    <div
      class="grey lighten-4 px-4 py-3 rounded-xl d-flex gap-4 overflow-x-auto"
    >
      <TopicCard
        v-for="subject in subjects"
        :key="subject"
        :subject="subject"
        :color="generateColor(colors.length)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: this.$store.getters['getTopics'],
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

  methods: {
    generateColor(arrayLength) {
      return this.colors[Math.trunc(Math.random() * arrayLength)]
    },
  },
}
</script>
