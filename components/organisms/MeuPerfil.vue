<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Meu Perfil</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="4"
            class="d-flex align-center justify-center"
          >
            <v-avatar color="secondary" size="84"></v-avatar>
          </v-col>
          <v-col cols="12" sm="12" md="8" class="text-body-1">
            <section>
              <label class="font-weight-bold">Nome:</label>
              <span>{{ this.userMethod.nome }}</span
              ><br />

              <label class="font-weight-bold">Função:</label>
              <span>{{ userMethod.permissao }}</span
              ><br />

              <label class="font-weight-bold">Status:</label>
              <span v-if="userMethod.isAtivo == 1" class="success--text"
                >Ativo</span
              >
              <span v-else class="error--text">Desativado</span>
            </section>

           
              <label class="font-weight-bold">E-mail:</label>
              <span>{{ userMethod.email }}</span
              ><br />
            
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn v-if="fullProfile" color="primary" @click="editProfile">
      Editar perfil
    </v-btn>
    <v-btn
      v-if="fullProfile"
      outlined
      color="secondary"
      @click="fullProfile = false"
    >
      Voltar
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserMethod from '@/models/UserMethod'
import { $axios } from '@/utils/nuxt-instance'
import { snackbar } from '@/utils/store-access'
export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      userMethod: {} as UserMethod,
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    buscarUser() {
      const url = `/api/usuarios/search/myself`
      $axios
        .$get(url)
        .then((r) => {
          console.log(r)
          this.userMethod = r
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível consultar as cameras, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    },
  },
  created() {
    this.buscarUser()
  },
})
</script>

<style lang="scss" scoped>
.component {
}
</style>
