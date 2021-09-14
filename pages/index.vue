<template>
  <v-main class="main">
    <h1 class="text-center">Monitoramento de Veículos</h1>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <form @submit.prevent="login">
          <v-text-field
            outlined
            type="email"
            label="E-mail"
            color="white"
            v-model="credentials.email"
          ></v-text-field>
          <v-text-field
            outlined
            type="password"
            label="Senha"
            color="white"
            v-model="credentials.password"
          ></v-text-field>
          <v-btn class="mb-2" type="submit" color="primary" block>Entrar</v-btn>
          <v-btn outlined color="secondary" block>Esqueci a senha</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Credentials from '@/models/Credentials'
import { auth } from '@/store'


export default Vue.extend({
  layout: 'login',
  middleware: 'guest',
  data() {
    return {
      credentials: {} as Credentials,
    }
  },
  methods: {
    async login() {
      await auth.login(this.credentials)
    },
  },
})
</script>

<style>
.main {
  padding-left: 80px !important;
  padding-right: 80px !important;
}
</style>