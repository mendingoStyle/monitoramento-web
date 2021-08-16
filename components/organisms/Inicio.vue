<template>
  <div class="component">
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <h1>Início</h1>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        Sistema de Monitoramento de Veículo - {{ formatedData }}.
      </v-col>
      <v-col
        v-for="item in cameraMethods"
        :key="`camera[${item.id_camera}]`"
        cols="12"
        md="12"
        lg="12"
      >
        <v-card max-width="344" outlined>
          <v-system-bar color="black" dark>
            <v-spacer></v-spacer>
            <div class="text mb-2">
            {{ item.id_camera }} - {{ item.name }}
          </div>
          </v-system-bar>
          
          <v-list-item-title class="text-h5 mb-1">
            Capturas Hoje: 0
          </v-list-item-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraMethod from '@/models/CameraMethod'

export default Vue.extend({
  data() {
    return {
      formatedData: '',
      cameraMethod: {} as CameraMethod,
      cameraMethods: [
        {
          id_camera: '1',
          name: 'Camera 1',
        },
        {
          id_camera: '2',
          name: 'Camera 2',
        },
      ] as CameraMethod[],
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
    },
  },
  created() {
    this.formatDate()
  },
})
</script>

<style lang="scss" scoped>
.component {
}
</style>
