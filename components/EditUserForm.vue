<template>
  <div class="login-container">
    <v-form
      ref="form"
      v-model="fieldIsValid"
      @submit.prevent="handleForm"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :rules="nameInfo.rules"
        :name="nameInfo.name"
        :label="nameInfo.label"
        color="orange darken-3"
        maxlength="50"
        counter
        outlined
      />

      <v-text-field
        v-model="email"
        color="orange darken-3"
        :rules="emailInfo.rules"
        :name="emailInfo.name"
        :label="emailInfo.label"
        maxlength="60"
        counter
        outlined
      />
      <v-text-field
        v-model="password"
        color="orange darken-3"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordInfo.rules"
        :type="show ? 'text' : 'password'"
        :name="passwordInfo.name"
        :label="passwordInfo.label"
        @click:append="show = !show"
        maxlength="60"
        counter
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
        Editar
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['user/getIsLoading']
    },
    user() {
      return this.$store.getters['user/getUser']
    },
    nameInfo() {
      return {
        name: 'name',
        rules: [
          (v) => v.length <= 50 || 'Nome deve conter, no máximo, 50 caracteres',
        ],
        label: 'Nome',
      }
    },
    emailInfo() {
      return {
        name: 'email',
        rules: [
          (v) =>
            !v ||
            v.length <= 60 ||
            'Email deve conter, no máximo, 60 caracteres',
          (v) => !v || /.+@.+\..+/.test(v) || 'Insira um email válido',
        ],
        label: 'Email',
      }
    },
    passwordInfo() {
      return {
        name: 'password',
        rules: [
          (v) =>
            !v ||
            v.length <= 60 ||
            'Senha deve conter, no máximo, 60 caracteres',
          (v) =>
            !v || v.length >= 8 || 'Senha deve conter, no mínimo, 8 caracteres',
          (v) =>
            !v ||
            /(?=.*[a-z])/.test(v) ||
            'Senha deve conter pelo menos 1 caractere minúsculo',
          (v) =>
            !v ||
            /(?=.*[A-Z])/.test(v) ||
            'Senha deve conter pelo menos 1 caractere maíusculo',
          (v) =>
            !v || /(?=.*\d)/.test(v) || 'Senha deve conter pelo menos 1 número',
          (v) =>
            !v ||
            /(?=.*[@$!%*?&])/.test(v) ||
            'Senha deve conter pelo menos 1 caractere especial',
        ],
        label: 'Senha',
      }
    },
  },
  data() {
    return {
      fieldIsValid: true,
      show: false,
      name: '',
      email: '',
      password: '',
    }
  },

  methods: {
    isFormValid() {
      return this.$refs.form.validate()
    },
    removeEmptyFields(obj) {
      const filteredObj = {}

      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== '') {
          filteredObj[key] = obj[key]
        }
      }

      return filteredObj
    },
    async handleForm() {
      const isValid = this.isFormValid()
      if (!isValid) return

      const body = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('user/editUser', {
          body: this.removeEmptyFields(body),
          toast: this.$toast,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },

  async mounted() {
    if (this.user === null) {
      try {
        await this.$store.dispatch('user/loadUser')
      } catch (error) {}
    }

    this.name = this.user?.name || ''
    this.email = this.user?.email || ''
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
