<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant="miniVariant"
      fixed
      app
    >
      <template #append>
        <v-list-item nuxt @click="logout">
          <v-list-item-action><v-icon>mdi-logout </v-icon></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in menus" :key="i" nuxt :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left color="primary" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Snackbar />
    <NotificationDialog />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Snackbar, NotificationDialog } from '@/components/molecules'
import { auth } from '@/store'

export default Vue.extend({
  middleware: 'guard',
  components: {
    Snackbar,
    NotificationDialog
  },
  data() {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Início',
          to: 'inicio',
        },
        {
          icon: 'mdi-account-circle',
          title: 'Meu perfil',
          to: 'meu-perfil',
        },
        {
          icon: 'mdi-account-group',
          title: 'Usuários',
          to: 'usuarios',
        },
        {
          icon: 'mdi-shield-car',
          title: 'Veiculos',
          to: 'veiculos',
        },
        {
          icon: 'mdi-image',
          title: 'Capturas',
          to: 'capturas',
        },
        {
          icon: 'mdi-camera',
          title: 'Cameras',
          to: 'cameras',
        },
      ],
      miniVariant: false,
      title: 'Monitoramento de Veiculos',
    }
  },
  computed: {
    menus(): Array<any> {
      const permission = auth.$permission
      let menuItems = this.items
      if (permission && permission == 'USUARIO') {
        menuItems = this.items.filter(it => it.to != 'usuarios')
      }

      return menuItems
    }
  },
  methods: {
    logout() {
      auth.logout()
    }
  }
})
</script>

<style lang="scss" scoped>
.teste {
  padding-top: 550px;
}
</style>
