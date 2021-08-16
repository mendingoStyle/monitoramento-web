<template>
  <v-dialog
    persistent
    v-model="isActive"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Escolha o método de pagamento
      </v-card-title>

      <v-card-text>
        <v-radio-group v-model="paymentMethod">
          <v-radio
            v-for="pm in paymentMethods"
            :key="pm.code"
            :label="pm.name"
            :value="pm"
            color="secondary"
          ></v-radio>
        </v-radio-group>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="$emit('cancelar')"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="success"
          text
          @click="$emit('realizarPagamento', paymentMethod)"
        >
          Realizar pagamento
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import PaymentMethod from '@/models/PaymentMethod'

export default Vue.extend({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      paymentMethod: {} as PaymentMethod,
      paymentMethods: [
        {
          name: 'Dinheiro',
          code: 'DINHEIRO'
        },
        {
          name: 'Cartão de crédito',
          code: 'CREDITO'
        },
        {
          name: 'Cartão de débito',
          code: 'DEBITO'
        },
      ] as PaymentMethod[]
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
