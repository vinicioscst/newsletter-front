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
      />
      <v-btn
        color="orange darken-3"
        class="white--text"
        width="100%"
        type="submit"
        :loading="loading"
        :disabled="!fieldIsValid || loading"
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
        const response = await this.$store.dispatch('user/loginUser', {
          body,
          cookies: this.$cookies,
        })

        if (response.status === 200) {
          this.$router.push('/admin')
          return
        }

        alert(response.data.error)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
