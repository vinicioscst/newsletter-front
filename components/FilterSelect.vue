<template>
  <v-select
    color="orange darken-3"
    item-color="orange darken-3"
    :model="model"
    :items="items"
    item-text="text"
    item-value="value"
    :label="label"
    :prepend-icon="icon"
    @change="handleChange"
    :value="selectValue"
    :data-test="dataTest"
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
    dataTest: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    selectValue() {
      if (this.label === 'Ordernar por')
        return this.$store.getters['getOrderBy']
      if (this.label === 'Notícias por página')
        return this.$store.getters['getPerPage']
    },
  },
  watch: {
    async selectValue(_) {
      await this.$store.dispatch('loadArticles')
    },
  },
  methods: {
    handleChange(value) {
      if (this.label === 'Ordernar por')
        return this.$store.commit('setOrderBy', value)
      if (this.label === 'Notícias por página')
        return this.$store.commit('setPerPage', value)
    },
  },
}
</script>
