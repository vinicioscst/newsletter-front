<template>
  <div class="container">
    <div v-if="error.statusCode === 404" class="error-container text-center">
      <h1 class="status-code orange--text text--darken-4">
        {{ pageNotFound }}
      </h1>
      <h2 class="status-info">Página não encontrada</h2>
    </div>
    <div v-else class="error-container text-center">
      <h2 class="status-info">
        {{ otherError }}
      </h2>
    </div>
    <NuxtLink to="/" class="link secondary--text">
      Voltar para a página principal
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
.container,
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  gap: 2rem;
}

.error-container {
  gap: 1rem;
}
.status-code {
  font-size: 5rem;
  line-height: 1;
}

.status-info {
  font-size: 2rem;
  line-height: 1;
}

.link {
  text-align: center;
  text-underline-offset: 6px;
  padding: 8px;
}
</style>
