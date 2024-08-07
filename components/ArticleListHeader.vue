<template>
  <div class="d-flex justify-space-between gap-4 pb-6 list-header">
    <h2>Últimas notícias</h2>
    <div class="d-flex select-container">
      <Select
        :items="orderBy"
        :model="orderByModel"
        label="Ordernar por"
        icon="mdi-order-alphabetical-ascending"
      />
      <Select
        :items="perPage"
        :model="perPageModel"
        label="Notícias por página"
        icon="mdi-numeric"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPageModel: { text: '12', value: 12 },
      perPage: [
        { text: '4', value: 4 },
        { text: '8', value: 8 },
        { text: '12', value: 12 },
      ],
      orderByModel: { text: 'Mais recente', value: 'MaisRecente' },
      orderBy: [
        { text: 'Mais recente', value: 'MaisRecente' },
        { text: 'Mais antigo', value: 'MaisAntigo' },
        { text: 'A-Z', value: 'A-Z' },
        { text: 'Z-A', value: 'Z-A' },
      ],
    }
  },
}
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}

.list-header {
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.select-container {
  flex-direction: column;

  @media (min-width: 425px) {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
