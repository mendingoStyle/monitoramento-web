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
              <template v-slot:[`item.periodo`]="{ item }">
                <v-chip>
                  {{
                    item.isContinuo
                      ? 'Continuo'
                      : formatDateMoment(item.dataInicio) +
                        ' Até ' +
                        formatDateMoment(item.dataFim)
                  }}
                </v-chip>
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="startDeleteDialog(item)"
                >
                  mdi-account-edit
                </v-icon>
                <v-icon
                  class="icon icon-delete white--text"
                  @click.stop="startDeleteDialog(item)"
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
          <v-text-field label="Placa" v-model="placa" color="white">
          </v-text-field>

          <v-card-title>Periodo</v-card-title>
          <v-checkbox
            hide-details
            label="Monitoramentarar Continuamente"
            v-model="continuo"
            class="mb-6"
          ></v-checkbox>

          <v-menu
            :close-on-content-click="false"
            ref="dateMenu"
            v-model="dateMenu"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                readonly
                label="Inicio"
                color="white"
                v-model="datesFormatted"
                :disabled="continuo"
                v-on="on"
                v-bind="attrs"
                prepend-inner-icon="mdi-calendar"
                :error-messages="errors[0]"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              ref="picker"
              locale="pt-br"
              v-model="dates"
              :active-picker.sync="activePicker"
              :min="new Date(Date.now()).toISOString().substr(0, 10)"
              @change="save"
            ></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            ref="dateMenu"
            v-model="dateMenu2"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                readonly
                label="Fim"
                v-model="datesFormatted2"
                v-on="on"
                :disabled="continuo"
                color="white"
                v-bind="attrs"
                prepend-inner-icon="mdi-calendar"
                :error-messages="errors[0]"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              ref="picker"
              locale="pt-br"
              v-model="dates2"
              :min="new Date(Date.now()).toISOString().substr(0, 10)"
              :active-picker.sync="activePicker2"
              @change="save"
            ></v-date-picker>
          </v-menu>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VeiculoMethod from '@/models/VeiculoMethod'
import { auth, snackbar } from '@/utils/store-access'
import { $axios } from '@/utils/nuxt-instance'
import moment from 'moment'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      observacoes: '',
      pesquisa: '',
      placa: '',
      datesFormatted: '',
      userId: 1,
      activePicker: '',
      activePicker2: '',
      datesFormatted2: '',
      continuo: false,
      dates: new Date().toISOString().substr(0, 10),
      dates2: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      dateMenu2: false,
      dialog: false,
      VeiculoMethod: {} as VeiculoMethod,
      veiculoMethods: [] as VeiculoMethod[],
      headers: [
        { text: 'id', align: 'start', value: 'id_veiculo' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Periodo de Monitoramento', align: 'start', value: 'periodo' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Versão', align: 'start', value: 'version' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    save() {
      this.dateMenu = false
      this.dateMenu2 = false
    },
    cadastrarVeiculo() {
      if (!this.placa || !this.userId) {
        snackbar.setMessage(
          'Não foi possível Cadastrar o Veiculo para monitoramento, Preencha todos os dados.'
        )
        snackbar.setSnackbar(true)
      } else if (
        !this.continuo &&
        (!this.datesFormatted || !this.datesFormatted2)
      ) {
        snackbar.setMessage(
          'Não foi possível Cadastrar o Veiculo para monitoramento, Datas de inicio e fim inválidas.'
        )
        snackbar.setSnackbar(true)
      } else {
        const url = `/api/monitoramentos`
        const body = {
          placa: this.placa,
          dataInicio: this.datesFormatted
            ? this.parseDate(this.datesFormatted)
            : null,
          dataFim: this.datesFormatted2
            ? this.parseDate(this.datesFormatted2)
            : null,
          status: 'NENHUMA_OCORRENCIA',
          isContinuo: this.continuo,
          usuarioId: 1,
          observacoes: this.observacoes,
        }
        $axios
          .$post(url, body)
          .then((r) => {
            this.dialog = false
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
    parseDate(date) {
      console.log(date)
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatDateMoment(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
  },

  watch: {
    dateMenu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    dateMenu2(val) {
      val && setTimeout(() => (this.activePicker2 = 'YEAR'))
    },
    dates() {
      const d1 = this.formatDate(this.dates)
      this.datesFormatted = `${d1}`
    },
    dates2() {
      const d1 = this.formatDate(this.dates2)
      this.datesFormatted2 = `${d1}`
    },
  },
  created() {
    this.buscarVeiculos()
  },
})
</script>

<style lang="scss" scoped>
</style>
