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
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="dialogEdit(item.id)"
                >
                  mdi-circle-edit-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog width="800" v-model="dialog">
      <v-card>
        <v-card-title> Editar Camera Usuario </v-card-title>
        <v-card-text>
          <v-text-field label="Nome da Camera" v-model="nome" color="white">
          </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn dark @click="dialog = false"> Voltar </v-btn>
          <v-btn dark @click="EditarCamera(camera)"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraMethod from '@/models/CameraMethod'
import { $axios } from '@/utils/nuxt-instance'
import { snackbar } from '@/utils/store-access'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      nome: '',
      camera: null,
      obs: '',
      dialog: false,
      dialog2: false,
      cameraMethod: {} as CameraMethod,
      cameraMethods: [] as CameraMethod[],

      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Nome do Equipamento', align: 'start', value: 'nome' },
        { text: 'Mac', align: 'start', value: 'mac' },
        { text: 'Observações', align: 'start', value: 'observacoes' },
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
    dialogEdit(item : any) {
      this.camera = item
      this.dialog = true
    },
   
    EditarCamera(item : any) {
      if (this.nome == '') {
        snackbar.setMessage('Preencha o nome.')
      } else {
        const body = {
          nome: this.nome,
        }
        const url = `/api/cameras/${item}`
        $axios
          .$put(url, body)
          .then((r) => {
            console.log(r)
            this.buscarCameras()
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              snackbar.setMessage(error.response.data.error)
            } else {
              snackbar.setMessage(
                'Não foi possível editar a camera, tente mais tarde.'
              )
            }
            snackbar.setSnackbar(true)
          })
      }
    },
  },
  created() {
    this.buscarCameras()
  },
})
</script>

<style lang="scss" scoped>
</style>
