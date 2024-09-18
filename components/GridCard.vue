<template>
  <v-card
    :class="`d-flex flex-column justify-center pa-6 text-center rounded-xxl ${info.colors}`"
    :data-test="dataTestValue"
  >
    <h3 class="font-weight-regular title">{{ info.title }}</h3>
    <h2 class="font-weight-black value">{{ info.value }}</h2>
  </v-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
    dataTestValue: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 2rem;
}
.value {
  font-size: 4rem;
  line-height: 1;
}
</style>
