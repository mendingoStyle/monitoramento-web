<template>
  <v-dialog v-model="active" width="50%" persistent>
    <v-card>
      <v-toolbar>
        <v-icon color="warning">mdi-alert</v-icon>
        Ocorrência de Veículo Monitorado 
      </v-toolbar>
      <v-card-text class="pt-6">
        <p class="text-h6">
          {{ message }}
        </p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="active = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      message: '',
      active: false,
      ws: undefined as WebSocket | undefined
    }
  },
  watch: {
    message: function(val) {
      if (val) this.active = true
    }
  },
  methods: {
    
  },
  mounted() {
    try {
      if (!this.ws)
        this.ws = new WebSocket(`${process.env.wsUrl}`)
      this.ws.onmessage = (obj: any) => {
        this.message = obj?.data
        console.log(this.message)
      }
    } catch (err) {
      console.log(err)
    }
  },
  beforeDestroy() {
    if (this.ws) this.ws.close()
  }
})
</script>

<style lang="scss" scoped>
</style>
