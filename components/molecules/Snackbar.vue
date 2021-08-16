<template>
  <v-snackbar
    right
    timeout="-1"
    v-model="isActive"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="success"
        text
        v-bind="attrs"
        @click="hideSnackbar"
      >
        ok
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { snackbar } from '@/store'

export default Vue.extend({
  computed: {
    isActive() {
      return snackbar.$showSnackbar
    },
    message() {
      return snackbar.$message
    }
  },

  methods: {
    hideSnackbar() {
      snackbar.setSnackbar(false)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
