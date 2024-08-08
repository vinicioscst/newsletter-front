<template>
  <v-select
    color="white"
    item-color="orange darken-3"
    :model="model"
    :items="items"
    item-text="text"
    item-value="value"
    :label="label"
    :prepend-icon="icon"
    @change="handleChange"
    dark
    outlined
    dense
  />
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: () => '',
    },
    icon: {
      type: String,
      default: () => '',
    },
  },

  methods: {
    handleChange(data) {
      this.$emit('selectChangeValue', data)
    },
  },
}
</script>
