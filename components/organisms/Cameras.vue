<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Cameras</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <label>Pesquisar Cameras: </label>
            <v-text-field
              v-model="pesquisa"
              color="white"
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="align-center justify-center">
            <v-data-table
              dark
              :items="cameraMethods"
              :headers="headers"
              :search="pesquisa"
            >
              <template v-slot:[`item.localizacao`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="dialog2Edit(item)"
                >
                  mdi-magnify
                </v-icon>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="dialogEdit(item)"
                >
                  mdi-circle-edit-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog width="800" v-model="dialog2">
      <v-card>
        <v-card-title> Localização da Camera </v-card-title>
        <v-card-text>
          <v-text-field label="Pais" color="white" disabled> </v-text-field>
          <v-text-field label="Estado" color="white" disabled> </v-text-field>
          <v-text-field label="Cidade" color="white" disabled> </v-text-field>
          <v-text-field label="Bairro" color="white" disabled> </v-text-field>
           <v-text-field label="Rua" color="white" > </v-text-field>
          <v-text-field label="Complemento" color="white" disabled>
          </v-text-field>
          <v-text-field label="Numero" color="white" disabled> </v-text-field>
          <v-text-field label="Latitude" color="white" disabled> </v-text-field>
          <v-text-field label="Longitude" color="white" disabled>
          </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn dark @click="dialog2 = false"> Voltar </v-btn>
          <v-btn dark @click="dialog2 = false"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="800" v-model="dialog">
      <v-card>
        <v-card-title> Editar Camera Usuario </v-card-title>
        <v-card-text>
          <v-text-field label="Nome da Camera" color="white"> </v-text-field>
          <v-text-field label="Pais" color="white"> </v-text-field>
          <v-text-field label="Estado" color="white"> </v-text-field>
          <v-text-field label="Cidade" color="white"> </v-text-field>
          <v-text-field label="Bairro" color="white"> </v-text-field>
          <v-text-field label="Rua" color="white"> </v-text-field>

          <v-text-field label="Complemento" color="white"> </v-text-field>
          <v-text-field label="Numero" color="white"> </v-text-field>
          <v-text-field label="Latitude" color="white"> </v-text-field>
          <v-text-field label="Longitude" color="white"> </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn dark @click="dialog = false"> Voltar </v-btn>
          <v-btn dark @click="dialog = false"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraMethod from '@/models/CameraMethod'
import { $axios } from '@/utils/nuxt-instance'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      dialog: false,
      dialog2: false,
      cameraMethod: {} as CameraMethod,
      cameraMethods: [] as CameraMethod[],

      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Nome do Equipamento', align: 'start', value: 'nome' },
        { text: 'Mac', align: 'start', value: 'mac' },
        { text: 'Localização/Endereço', align: 'start', value: 'localizacao' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    buscarCameras() {
      const url = `/api/cameras`
      $axios
        .$get(url)
        .then((r) => {
          this.cameraMethods = r
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
    dialogEdit(item: CameraMethod) {
      console.log(item)
      this.dialog = true
    },
    dialog2Edit(item: CameraMethod) {
      console.log(item)
      this.dialog2 = true
    },
  },
  created() {
    this.buscarCameras()
  },
})
</script>

<style lang="scss" scoped>
</style>
