<template>
  <div class="component">
    <h1 class="title text-h4 mb-8">Usuários</h1>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <label>Pesquisar Usuários: </label>
            <v-text-field
              v-model="pesquisa"
              color="white"
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="align-center justify-center">
            <v-data-table
              dark
              :items="userMethods"
              :headers="headers"
              :search="pesquisa"
            >
              <template v-slot:[`item.action`]="{ item }">
                <div v-if="item.perfil != 'ADMIN'">
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
                    mdi-block-helper
                  </v-icon>
                  <v-icon
                    color="info"
                    class="icon icon-info white--text"
                    @click.stop="openCardInfo(item)"
                  >
                    mdi-delete
                  </v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog width="800" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Cadastrar Novo Usuario
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Cadastrar Novo Usuario
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            color="white"
            v-model="nomeUser"
          >
          </v-text-field>
          <v-text-field
            label="Email"
            color="white"
            v-model="emailUser"
          >
          </v-text-field>

           <v-select
              :items="item"
              outlined
              label="Perfil"
              placeholder="Selecione o Perfil"
              hide-details="auto"
              @input="selecionarPerfil"
            ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn dark @click="dialog = false"> Voltar </v-btn>
          <v-btn dark @click="cadastrarUsuario"> Confirmar </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserMethod from '@/models/UserMethod'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      nomeUser: '',
      emailUser: '',
      item: ['ADMIN', 'USER'],
      dialog: false,
      perfilUser: '',
      error: '',
      userMethod: {} as UserMethod,
      userMethods: [
        {
          id_user: '1',
          name: 'John Doe',
          role: 'Admin',
          email: 'johnDoe@hotmail.com',
          status: 'Online',
          perfil: 'ADMIN',
        },
        {
          id_user: '2',
          name: 'Joane Doe',
          role: 'User',
          email: 'joaneDoe@hotmail.com',
          status: 'Online',
          perfil: 'USER',
        },
      ] as UserMethod[],
      headers: [
        { text: 'id', align: 'start', value: 'id_user' },
        { text: 'Nome', align: 'start', value: 'name' },
        { text: 'Função', align: 'start', value: 'role' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: 'Perfil', align: 'start', value: 'perfil' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    cadastrarUsuario(){
      if( !this.emailUser || !this.nomeUser){
        this.error = 'Preencha todos os dados corretamente'
      } else {
        
      }
    },
    selecionarPerfil(event : string) {
      this.perfilUser = event
    },
  },
})
</script>

<style lang="scss" scoped>

</style>
