<template>
  <v-main class="main">
    <h1 class="text-center">Monitoramento de Veículos</h1>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <form action="">
          <v-text-field
            outlined
            type="email"
            label="E-mail"
            v-model="credentials.login"
          ></v-text-field>
          <v-text-field
            outlined
            type="password"
            label="Senha"
            v-model="credentials.password"
          ></v-text-field>
          <v-btn class="mb-2" @click="login" color="primary" block>Entrar</v-btn>
          <v-btn outlined @click="login" color="secondary" block>Esqueci a senha</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Credentials from '@/models/Credentials'

export default Vue.extend({
  layout: 'login',
  data() {
    return {
      credentials: {} as Credentials
    }
  },
  methods: {
    login() {
      // TODO
      console.log(JSON.stringify(this.credentials))
      this.$router.push({
        path: '/dashboard/inicio'
      })
    }
  }
})
</script>

<style>
.main {
  padding-left: 80px !important;
  padding-right: 80px !important;
}
</style>