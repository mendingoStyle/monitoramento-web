<template>
  <v-dialog persistent v-model="isActive" v-if="isActive" width="40%">
      <v-card>
          <v-card-title>Excluindo veículo em monitoramento</v-card-title>
          <v-card-text class="mt-6">
              <p>
                Excluir o veículo em monitoramento?
                A operacão não poderá ser desfeita.
              </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="close">Cancelar</v-btn>
              <v-btn color="error" text @click="excluir" :loading="loading">Excluir</v-btn>

          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth, snackbar } from '@/utils/store-access'
import { $axios } from '@/utils/nuxt-instance'

export default Vue.extend({
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        close() {
            this.$emit('close', true)
        },
        excluir() {
            this.loading = true
            $axios
            .$delete(`/api/monitoramentos/${this.id}`)
            .then((r) => {
                this.loading = false
                snackbar.setMessage(
                'Veiculo em monitoramento excluido com sucesso!.'
                )
                snackbar.setSnackbar(true)
                this.close()
            })
            .catch((error) => {
                this.loading = false
                this.close()
                snackbar.setMessage(
                'Não foi possível excluir o Veiculo em monitoramento, tente mais tarde.'
                )

                snackbar.setSnackbar(true)
            })
        }
    }
})
</script>

<style lang="scss" scoped>
</style>
