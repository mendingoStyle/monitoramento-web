<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Visualização Capitura ID: 1</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="align-center justify-center"
              >
                <v-img
                  max-height="552"
                  max-width="364"
                  src="/images/1.jpg"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="d-flex justify">
                <v-img
                  max-height="276"
                  max-width="182"
                  src="/images/2.jpg"
                ></v-img>
                <v-img
                  max-height="276"
                  max-width="182"
                  src="/images/2.jpg"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-row>
              <v-col cols="12" sm="4" md="4" class="d-flex">
                <v-text-field
                  v-model="placa"
                  color="white"
                  disabled
                  outlined
                  label="Placa"
                  class="placa-input"
                ></v-text-field>
                <v-icon class="d-flex align-center"
                  >mdi-circle-edit-outline</v-icon
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="d-flex justify align-space-between"
              >
                <v-text-field
                  v-model="camera"
                  color="white"
                  disabled
                  outlined
                  label="Camera"
                  class="placa-input"
                ></v-text-field>

                <v-text-field
                  v-model="data"
                  color="white"
                  disabled
                  outlined
                  label="Data/Hora da Captura"
                  class="placa-input"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="d-flex">
                <v-text-field
                  v-model="detalhes"
                  color="white"
                  disabled
                  outlined
                  label="Detalhes"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              
            >
              Voltar
            </v-btn>
            <v-btn>
              Histórico
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      placa: 'XXX-1234',
      detalhes: 'Placa captura possui nascionalidade brasileira',
      data: '01/07/2021 10:03:15',
      camera: 'Camera 1',
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .placa-input .v-input__control {
  height: 50px;
  max-height: 50px;
}
</style>
