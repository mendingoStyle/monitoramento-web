<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Meu Perfil</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="4"
            class="d-flex align-center justify-center"
          >
            <v-avatar
              color="secondary"
              size="84"
            ></v-avatar>
          </v-col>
          <v-col cols="12" sm="12" md="8" class="text-body-1">
            <section>
              <label class="font-weight-bold">Nome:</label>
              <span>John Doe</span><br>

              <label class="font-weight-bold">Função:</label>
              <span>Administrador</span><br>

              <label v-if="!fullProfile" class="font-weight-bold">Status:</label>
              <span v-if="!fullProfile" class="success--text">Online</span>
            </section>

            <section v-if="fullProfile" class="full-profile">
              <label class="font-weight-bold">E-mail:</label>
              <span>johndoe@email.com</span><br>

              <label class="font-weight-bold">Telefone:</label>
              <span>(45) 1234-1234</span><br>

              <label class="font-weight-bold">Celular:</label>
              <span>(45) 1234-1234</span><br>

              <label class="font-weight-bold">Endereço:</label>
              <span>Rua xpto, 32, bairro teste, Foz do Iguaçu - PR</span><br>
            </section>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn v-if="!fullProfile" color="primary" @click="fullProfile = true">
      Ver perfil completo
    </v-btn>
    <v-btn v-if="fullProfile" color="primary" @click="editProfile">
      Editar perfil
    </v-btn>
    <v-btn v-if="fullProfile" outlined color="secondary" @click="fullProfile = false">
      Voltar
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      fullProfile: false
    }
  },
  methods: {
    editProfile() {
      // TODO
    }
  }
})
</script>

<style lang="scss" scoped>
.component {}
</style>
