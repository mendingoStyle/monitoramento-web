<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Capturas</h1>
    <CapturasList
      :reload="reload"
      @reloaded="reload = false"
      @visualizarCaptura="consultarCaptura($event)"
    />
    <v-dialog width="1500" v-model="dialog">
      <v-card>
        <v-card-text>
          <v-card-title> Visualizar Captura Id : {{ id }} </v-card-title>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="align-center justify-center"
                >
                  <v-img max-height="1000" max-width="1000" :src="url"></v-img>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="d-flex justify">
                  <v-img max-height="276" max-width="182" src=""></v-img>
                  <v-img max-height="276" max-width="182" src=""></v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="6" v-if="!visualizandoHistorico">
              <v-row>
                <v-col cols="12" sm="4" md="4" class="d-flex">
                  <v-text-field
                    v-model="placa"
                    color="white"
                    :disabled="!isEditandoPlaca"
                    outlined
                    label="Placa"
                    class="placa-input"
                  ></v-text-field>
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
                    label="Data da Captura"
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
            </v-col>
            <v-col cols="12" sm="6" md="6" v-else style="overflow-y: scroll">
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Valor anterior</th>
                      <th>Valor atual</th>
                      <th>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in historicos"
                      :key="`hist_${item.i}`"
                    >
                      <td>{{ i }}</td>
                      <td>{{ item.valorAnterior }}</td>
                      <td>{{ item.valorAtual }}</td>
                      <td>{{ item.usuario.nome }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn outlined @click="voltar"> Voltar </v-btn>
          <v-btn dark @click="editarPlacaCaptura" v-if="!isEditandoPlaca"> Editar Placa </v-btn>
          <v-btn color="primary" @click="salvarEdicaoPlaca" v-else> Salvar </v-btn>
          <v-btn color="accent" @click="visualizarHistorico"> Historico </v-btn>
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
import moment from 'moment'
import { CapturasList } from '@/components/molecules'

export default Vue.extend({
  components: {
    CapturasList
  },
  data() {
    return {
      reload: false,
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
      isEditandoPlaca: false,
      visualizandoHistorico: false,
      historicos: [],

      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Camera', align: 'start', value: 'cameraId' },
        { text: 'Data/Hora', align: 'start', value: 'dataHora' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    visualizarHistorico() {
      this.visualizandoHistorico = true
      this.buscarHistorico()
    },
    voltarHistorico() {
      this.visualizandoHistorico = false
    },
    editarPlacaCaptura() {
      this.isEditandoPlaca = true
    },
    salvarEdicaoPlaca() {
      const url = `/api/capturas/${this.id}`
      $axios
        .$put(url, { placa: this.placa })
        .then((r) => {
          snackbar.setMessage('Placa alterada!')
          snackbar.setSnackbar(true)
          this.voltar()
          this.reload = true
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível alterar a placa, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    },
    voltar() {
      if (this.visualizandoHistorico) {
        this.voltarHistorico()
      } else {
        this.dialog = false
        this.isEditandoPlaca = false
      }
    },
    consultarCaptura(item: CapturaMethod) {
      this.dialog = true
      this.id = item.id
      this.placa = item.placa
      this.camera = item.cameraId.toString()
      this.data = moment(String(item.dataHora)).format('MM/DD/YYYY')
      this.detalhes = 'Horario da Captura: ' + item.detalhes
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
    buscarImagens(id: string) {
      const url = `/api/capturas/${id}/imagens`
      $axios
        .$get(url)
        .then((r) => {
          this.url = `${process.env.apiUrl}/cron/capturas/${r.imagem}/imagem/captura`
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
    buscarHistorico() {
      const url = `/api/capturas/${this.id}/historico`
      $axios
        .$get(url)
        .then((r) => {
          this.historicos = r
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível consultar o historico, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    }
  },
  created() {
    this.buscarCapturas()
  },
})
</script>

<style lang="scss" scoped>
</style>
