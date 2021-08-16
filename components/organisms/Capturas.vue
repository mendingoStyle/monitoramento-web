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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CapturaMethod from '@/models/CapturaMethod'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      capturaMethod: {} as CapturaMethod,
      capturaMethods: [
        {
          id: '1',
          placa: 'AAA-1111',
          camera: 'camera 1',
          datahora: 'qlqcoisa',
        },
        {
          id: '2',
          placa: 'BBB-0000',
          camera: 'camera 2',
          datahora: 'qlqcoisa',
        },
      ] as CapturaMethod[],

      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Placa', align: 'start', value: 'placa' },
        { text: 'Camera', align: 'start', value: 'camera' },
        { text: 'Data/Hora', align: 'start', value: 'datahora' },
        { text: 'Ações', align: 'start', value: 'action'}
      ],
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    consultarCaptura( item : CapturaMethod ){
      this.$router.push('consultarCaptura')
    }
  },
})
</script>

<style lang="scss" scoped>
.component {
}
</style>
