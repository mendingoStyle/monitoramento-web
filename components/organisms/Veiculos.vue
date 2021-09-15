<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Veículos em Monitoramento</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <label>Pesquisar Veículos: </label>
            <v-text-field
              v-model="pesquisa"
              color="white"
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="align-center justify-center">
            <v-data-table
              dark
              :items="veiculoMethods"
              :headers="headers"
              :search="pesquisa"
            >
              <template v-slot:[`item.status`]="{ item }">
                {{
                  item.status == 'OCORRENCIA_ENCONTRADA'
                    ? 'Ocorrência Encontrada'
                    : 'Nenhuma Ocorrência'
                }}
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="startDeleteDialog(item.id)"
                >
                  mdi-delete
                </v-icon>

                <v-icon
                  v-if="item.status == 'Ocorrência identificada'"
                  color="info"
                  class="icon icon-info white--text"
                  @click.stop="openCardInfo(item)"
                >
                  mdi-magnify
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12" sm="12" md="8" class="text-body-1"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog width="1000" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Cadastrar Novo Veiculo
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-card-title> Cadastrar Novo Veiculo </v-card-title>
          Obs: cadastrar apenas as letras e os números da placa.
          <v-text-field label="Placa" v-model="placa" color="white">
          </v-text-field>

          <v-text-field v-model="observacoes" color="white" label="Observações">
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn dark @click="dialog = false"> Voltar </v-btn>
          <v-btn dark @click="cadastrarVeiculo"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <VeiculoDeleteDialog
      @close="closeDeleteDialog"
      :id="+deletingId"
      :isActive="openDeleteDialog"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VeiculoMethod from '@/models/VeiculoMethod'
import { VeiculoDeleteDialog } from '@/components/molecules'
import { auth, snackbar } from '@/utils/store-access'
import { $axios } from '@/utils/nuxt-instance'
import moment from 'moment'

export default Vue.extend({
  components: {
    VeiculoDeleteDialog,
  },
  data() {
    return {
      fullProfile: false,
      observacoes: '',
      pesquisa: '',
      placa: '',
      dialog: false,
      userId: 1,
      activePicker: '',
      activePicker2: '',

      VeiculoMethod: {} as VeiculoMethod,
      veiculoMethods: [] as VeiculoMethod[],
      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Versão', align: 'start', value: 'version' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
      openDeleteDialog: false,
      deletingId: '',
    }
  },
  methods: {
    cadastrarVeiculo() {
      if (!this.placa || !this.userId) {
        snackbar.setMessage(
          'Não foi possível Cadastrar o Veiculo para monitoramento, Preencha todos os dados.'
        )
        snackbar.setSnackbar(true)
      } else {
        const url = `/api/monitoramentos`
        const body = {
          placa: this.placa,
          status: 'NENHUMA_OCORRENCIA',
          usuarioId: 1,
          observacoes: this.observacoes,
          isContinuo: 1,
        }
        $axios
          .$post(url, body)
          .then((r) => {
            this.dialog = false
            this.buscarVeiculos()
            snackbar.setMessage(
              'Veiculo para monitoramento Cadastrado com sucesso!.'
            )
            snackbar.setSnackbar(true)
          })
          .catch((error) => {
            snackbar.setMessage(
              'Não foi possível cadastrar o Veiculo para monitoramento, tente mais tarde.'
            )

            snackbar.setSnackbar(true)
          })
      }
    },
    buscarVeiculos() {
      const url = `/api/monitoramentos`
      $axios
        .$get(url)
        .then((r) => {
          this.veiculoMethods = r
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível consultar os veículos monitorados, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    },

    startDeleteDialog(id: string) {
      this.openDeleteDialog = true
      this.deletingId = id
    },
    closeDeleteDialog() {
      this.openDeleteDialog = false
      this.deletingId = ''
      this.buscarVeiculos()
    },
  },

  watch: {},
  created() {
    this.buscarVeiculos()
  },
})
</script>

<style lang="scss" scoped>
</style>
