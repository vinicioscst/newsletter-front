<template>
  <div class="login-container">
    <v-form
      ref="form"
      v-model="fieldIsValid"
      @submit.prevent="handleForm"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        color="orange darken-3"
        :rules="emailRules"
        name="email"
        label="Email"
        outlined
        data-test="login-form-email"
      />
      <v-text-field
        v-model="password"
        color="orange darken-3"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        name="password"
        label="Senha"
        @click:append="show = !show"
        outlined
        data-test="login-form-password"
      />
      <v-btn
        color="orange darken-3"
        class="white--text"
        width="100%"
        type="submit"
        :loading="loading"
        :disabled="!fieldIsValid || loading"
        data-test="login-form-button"
      >
        Acessar
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldIsValid: true,
      show: false,
      email: '',
      emailRules: [
        (v) => !!v || 'Email é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'Insira um email válido',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Senha é obrigatória'],
    }
  },
  computed: {
    loading() {
      return this.$store.getters['user/getIsLoading']
    },
  },
  methods: {
    isFormValid() {
      return this.$refs.form.validate()
    },
    async handleForm() {
      const isValid = this.isFormValid()
      if (!isValid) return

      try {
        const body = { email: this.email, password: this.password }
        await this.$store.dispatch('user/loginUser', {
          body,
          cookies: this.$cookies,
          toast: this.$toast,
          router: this.$router,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
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
