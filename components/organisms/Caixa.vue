<template>
  <div class="component">
    <h1 class="title text-h4 mb-6">Caixa <span v-if="isOpen">Aberto</span></h1>

    <v-row v-if="!isOpen">
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-title> Abrir Caixa Registradora </v-card-title>
          <v-card-subtitle>
            Digite o valor inicial do caixa, para trocos
          </v-card-subtitle>
          <v-card-text class="mt-8">
            <v-text-field
              outlined
              min="0"
              step="0.01"
              prefix="R$"
              type="number"
              color="secondary"
              v-model="brlValue"
              label="Valor de entrada do caixa em Reais (BRL)"
            ></v-text-field>
            <v-text-field
              v-for="curr in currencies"
              :key="`currency_${curr.iso}`"
              outlined
              min="0"
              step="0.01"
              :prefix="curr.symbol"
              type="number"
              color="secondary"
              v-model="curr.value"
              :label="`Valor de entrada do caixa em ${curr.name} (${curr.iso})`"
            ></v-text-field>
            <v-btn color="success" @click="openCashRegister">Abrir caixa</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" sm="12" md="12">
        <v-carousel
          cycle
          :continuous="true"
          :show-arrows="true"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="76vh"
        >
          <v-carousel-item
            v-for="(image,i) in bannerImages"
            :key="`img_${i}`"
            :src="image"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-btn color="primary" class="mr-2" nuxt to="venda">
          <v-icon class="mr-2">mdi-cart</v-icon>
          Nova venda
        </v-btn>
        <v-btn color="secondary" outlined>
          Listar vendas
        </v-btn>
        <v-btn color="secondary" outlined @click="closeCashRegister">
          Fechar caixa
        </v-btn>
        <v-btn color="secondary" outlined>
          Adicionar troco
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isOpen: true, // TODO transformar em prop!
      brlValue: 0.0,
      currencies: [
        {
          symbol: 'US$',
          name: 'Dólar',
          iso: 'USD',
          value: 0.0,
        },
        {
          symbol: '₲',
          name: 'Guarani',
          iso: 'PYG',
          value: 0.0,
        },
        {
          symbol: '$',
          name: 'Peso',
          iso: 'ARS',
          value: 0.0,
        },
      ],
      bannerImages: [
        '/banner/banner1.jpg',
        '/banner/banner2.jpg',
        '/banner/banner3.jpg',
      ]
    }
  },
  methods: {
    openCashRegister() {
      // TODO
      this.isOpen = true
    },
    closeCashRegister() {
      // TODO
      this.isOpen = false
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
