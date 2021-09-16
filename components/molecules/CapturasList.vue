<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-row>
        <v-col cols="12" sm="12" md="3">
          <v-text-field
            label="Filtrar"
            color="secondary"
            v-model="options.filter"
            placeholder="Buscar por placa ou descricao"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-select
            :items="cameras"
            label="Filtro por camera"
            placeholder="Selecione..."
            hide-details="auto"
            @input="filtrarPorCamera"
          >
            <template #item="{ item }">
              <span class="white--text">Camera {{ item.id }}</span> -
              <span class="white--text" style="font-size: 10px"> {{ item.nome }}</span>
            </template>
            <template #selection="{ item }">
              <span class="white--text">Camera {{ item.id }}</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-data-table
        no-data-text="Nenhuma captura para listar"
        :headers="headers"
        :items="capturas"
        :server-items-length="options.totalItems"
        :loading="loading"
        :options.sync="options"
        loading-text="Carregando..."
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-icon
            class="icon icon-delete white--text"
            @click.stop="$emit('visualizarCaptura', item)"
          >
            mdi-magnify
          </v-icon>
          <v-icon
            class="icon icon-delete white--text"
            @click.stop="$emit('excluirCaptura', item)"
          >
            mdi-delete-forever
          </v-icon>
        </template>
        <template v-slot:[`item.dataHora`]="{ item }">
          {{ formatDateMoment(item.dataHora) }}
        </template>
        <template v-slot:[`item.cameraId`]="{ item }">
          {{  'Camera ' + item.cameraId }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import CapturaMethod from '@/models/CapturaMethod'
import { $axios } from '@/utils/nuxt-instance'
import { auth, snackbar } from '@/utils/store-access'
import moment from 'moment'

export default Vue.extend({
  props: {
    reload: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      options: {
        filter: '',
        pageCount: 0,
        page: 1,
        itemsPerPage: 10,
        totalItems: 0,
        cameraId: 0
      },
      capturas: [],
      cameras: [],
      loading: false,
      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Camera', align: 'start', value: 'cameraId' },
        { text: 'Data/Hora', align: 'start', value: 'dataHora' },
        { text: 'Ações', align: 'start', value: 'action' },
      ]
    }
  },
  methods: {
    formatDateMoment(date: Date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    buscarCapturas() {
      this.loading = true
      const filter = this.options.filter
      const cameraId = this.options.cameraId
      const size = this.options.itemsPerPage > -1
        ? this.options.itemsPerPage
        : this.options.totalItems

      let url = `/api/capturas/page?page=${this.options.page}&size=${size}`

      if (filter) {
        url = `${url}&filter=${filter}`
      }

      if (cameraId && cameraId > 0) {
        url = `${url}&camera=${cameraId}`
      }

      $axios
        .$get(url)
        .then((r) => {
          this.loading = false
          this.capturas = r.result
          this.options.pageCount = r.pages
          this.options.totalItems = r.count
        })
        .catch((error) => {
          this.loading = false
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
    buscarCameras() {
      const url = `/api/cameras`
      $axios
        .$get(url)
        .then((r) => {
          this.cameras = r
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
    filtrarPorCamera(camera: any) {
      this.options.cameraId = camera.id
    }
  },
  watch: {
    reload: function (newVal) {
      if (newVal) {
        this.buscarCapturas()
        this.$emit('reloaded', true)
      }
    },
    'options.filter': function (newVal, oldVal) {
      if (newVal !== oldVal) this.buscarCapturas()
    },
    'options.page': function (newVal, oldVal) {
      if (newVal !== oldVal) this.buscarCapturas()
    },
    'options.itemsPerPage': function (newVal, oldVal) {
      if (newVal !== oldVal) this.buscarCapturas()
    },
    'options.cameraId': function (newVal, oldVal) {
      if (newVal !== oldVal) this.buscarCapturas()
    }
  },
  created() {
    this.buscarCapturas()
    this.buscarCameras()
  },
})
</script>

<style lang="scss" scoped>
</style>
