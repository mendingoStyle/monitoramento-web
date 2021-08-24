<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Capturas</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <label>Pesquisar Capturas: </label>
            <v-text-field
              v-model="pesquisa"
              color="white"
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="align-center justify-center">
            <v-data-table
              dark
              :items="capturaMethods"
              :headers="headers"
              :search="pesquisa"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="consultarCaptura(item)"
                >
                  mdi-magnify
                </v-icon>
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="startDeleteDialog(item)"
                >
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog width="1500" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Visualizar Captura
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-card-title> Visualizar Captura Id : {{id}} </v-card-title>
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
                    :src="url"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="d-flex justify">
                  <v-img
                    max-height="276"
                    max-width="182"
                    src=""
                  ></v-img>
                  <v-img
                    max-height="276"
                    max-width="182"
                    src=""
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
              <v-btn> Voltar </v-btn>
              <v-btn> Histórico </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn dark @click="dialog = false"> Voltar </v-btn>
          <v-btn dark @click="editProfile"> Editar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CapturaMethod from '@/models/CapturaMethod'
import { $axios } from '@/utils/nuxt-instance'
import { auth, snackbar } from '@/utils/store-access'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      id: '',
      url: '',
      placa: 'XXX-1234',
      detalhes: '',
      data: '01/07/2021 10:03:15',
      camera: 'Camera 1',
      dialog: false,
      capturaMethod: {} as CapturaMethod,
      capturaMethods: [] as CapturaMethod[],

      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Camera', align: 'start', value: 'cameraId' },
        { text: 'Detalhes', align: 'start', value: 'detalhes' },
        { text: 'Data/Hora', align: 'start', value: 'dataHora' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    consultarCaptura(item) {
      this.dialog = true
      this.placa = item.placa
      this.camera = item.cameraId
      this.data = item.dataHora
      this.detalhes = item.detalhes
      this.id = item.id
      this.buscarImagens(item.id)
      console.log(this.url)
    },
    buscarCapturas() {
      const url = `/api/capturas`
      $axios
        .$get(url)
        .then((r) => {
          this.capturaMethods = r
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
     buscarImagens(id) {
      const url = `/api/capturas/${id}/imagens`
      $axios
        .$get(url)
        .then((r) => {
          this.url = '../images/public/' + r[0].imagem
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
    this.buscarCapturas()
  },
})
</script>

<style lang="scss" scoped>
.component {
}
</style>
