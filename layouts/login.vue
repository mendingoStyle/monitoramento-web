<template>
  <v-app>
    <v-main>
      <v-container class="full-width">
        <v-row>
          <v-col 
            class="full-height background d-flex align-center justify-center" 
            cols="12" sm="12" md="6"
          >
            <h1 class="white--text">Monitoramento de Veículos</h1>
          </v-col>
          <v-col 
            class="full-height d-flex align-center justify-center" 
            cols="12" sm="12" md="6"
          >
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.full-height {
  height: 100vh;
}
.background {
  background-color: #14213D;
}
.full-width {
  min-width: 100%;
}
</style>
