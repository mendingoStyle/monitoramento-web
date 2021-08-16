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
          <v-text-field label="Placa" color="white"> </v-text-field>
          <v-card-title>Periodo</v-card-title>
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
import VeiculoMethod from '@/models/VeiculoMethod'
import FormUtils from '@/mixins/FormUtils'

export default Vue.extend({
  mixins: [FormUtils],
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      datesFormatted: '',
      activePicker: '',
      activePicker2: '',
      datesFormatted2: '',
      dates: new Date().toISOString().substr(0, 10),
      dates2: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      dateMenu2: false,
      dialog: false,
      VeiculoMethod: {} as VeiculoMethod,
      veiculoMethods: [
        {
          id_veiculo: '1',
          placa: 'XXX-1234',
          periodo: '01/07/2021 à 15/07/2021',
          status: 'Nenhuma ocorrência',
        },
        {
          id_veiculo: '2',
          placa: 'XXX-4321',
          periodo: '01/07/2021 à 15/07/2021',
          status: 'Ocorrência identificada',
        },
      ] as VeiculoMethod[],
      headers: [
        { text: 'id', align: 'start', value: 'id_veiculo' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Periodo de Monitoramento', align: 'start', value: 'periodo' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    save() {
      this.dateMenu = false
      this.dateMenu2 = false
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
})
</script>

<style lang="scss" scoped>
</style>
