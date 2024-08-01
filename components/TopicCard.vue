<template>
  <div :class="`rounded-xl white--text px-3 py-1 ${color} text-no-wrap`">
    <p class="text-lowercase mb-0">{{ `#${subject}` }}</p>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
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
