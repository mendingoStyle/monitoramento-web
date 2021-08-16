<template>
  <v-container>
    <MeuPerfil v-if="slug === 'meu-perfil'" />
    <Caixa v-else-if="slug === 'caixa'" />
    <Usuarios v-else-if="slug === 'usuarios'" />
    <Veiculos v-else-if="slug === 'veiculos'" />
    <Capturas v-else-if="slug === 'capturas'" />
    <Cameras v-else-if="slug === 'cameras'" />
    <ConsultarCaptura v-else-if="slug === 'consultarCaptura'" /> <Inicio v-else />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Inicio,
  Caixa,
  MeuPerfil,
  Usuarios,
  Veiculos,
  Capturas,
  Cameras,
  ConsultarCaptura,
} from '@/components/organisms'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Inicio,
    MeuPerfil,
    Caixa,
    Usuarios,
    Veiculos,
    Capturas,
    Cameras,
    ConsultarCaptura,
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
})
</script>

<style lang="scss" scoped>
.component {
}
</style>
