<template>
  <div class="component">
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <h1>Início</h1>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        Sistema de Monitoramento de Veículo - {{ formatedData }}.
      </v-col>
      <v-col cols="12" md="12" lg="12">
        <v-card max-width="344" outlined>
          <v-system-bar color="black" dark>
            <v-spacer></v-spacer>
          </v-system-bar>

          <v-list-item-title class="text-h5 mb-1">
            Capturas Hoje: {{this.capturas}}
          </v-list-item-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraMethod from '@/models/CameraMethod'
import { auth, snackbar } from '@/utils/store-access'
import { $axios } from '@/utils/nuxt-instance'
import moment from 'moment'

export default Vue.extend({
  data() {
    return {
      formatedData: '',
      today: '',
      capturas: 0,
    }
  },
  methods: {
    formatDate() {
      let date = new Date()
      let dia = date.getDate()
      let mes = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
      ][date.getMonth()]
      let ano = date.getFullYear()
      this.formatedData = `${dia} de ${mes} de ${ano}`

      this.today = (`${ano}-${"0" + (date.getMonth()+1)}-${dia}T00:00:00.000Z`);
      this.buscarCapturasHoje()
     
    },
   
    buscarCapturasHoje() {
      const url = `/api/capturas/${this.today}/date`
      $axios
        .$get(url)
        .then((r) => {
          this.capturas = r
        })
        .catch((error) => {
          console.log(error)
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível consultar as capturas, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    },
  },

  created() {
    this.formatDate()
  },
})
</script>

<style lang="scss" scoped>
</style>
