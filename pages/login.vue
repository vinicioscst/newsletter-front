<template>
  <div class="page">
    <div class="page-container">
      <div class="d-flex flex-column align-center">
        <h1 class="h1 text-center pb-8">Faça seu login</h1>
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;

  background-color: white;

  border-radius: 1rem;
  box-shadow: 0px 10px 20px 0px rgb(0 0 0 / 30%);

  padding: 3rem 2rem;
}
</style>
