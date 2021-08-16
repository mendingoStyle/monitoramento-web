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
              <template v-slot:[`item.isAtivo`]="{ item }">
                <v-chip>
                  {{ item.isAtivo ? 'Ativo' : 'Bloqueado' }}
                </v-chip>
              </template>
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
        <v-card-title> Cadastrar Novo Usuario </v-card-title>
        <v-card-text>
          <v-text-field label="Nome" color="white" v-model="nomeUser">
          </v-text-field>
          <v-text-field label="Email" color="white" v-model="emailUser">
          </v-text-field>
          <v-text-field
            label="Senha"
            type="password"
            color="white"
            v-model="senhaUser"
          >
          </v-text-field>
          <v-text-field
            label="Confirmar Senha"
            type="password"
            color="white"
            v-model="senhaConfirmUser"
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
import { auth, snackbar } from '@/utils/store-access'
import { $axios } from '@/utils/nuxt-instance'

export default Vue.extend({
  data() {
    return {
      fullProfile: false,
      pesquisa: '',
      nomeUser: '',
      emailUser: '',
      senhaUser: '',
      senhaConfirmUser: '',
      item: ['ADMIN', 'USUARIO'],
      dialog: false,
      perfilUser: '',
      error: '',
      userMethod: {} as UserMethod,
      userMethods: [] as UserMethod[],
      headers: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'Nome', align: 'start', value: 'name' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Perfil', align: 'start', value: 'permissao' },
        { text: 'Status', align: 'start', value: 'isAtivo' },
        { text: 'Ações', align: 'start', value: 'action' },
      ],
    }
  },
  methods: {
    editProfile() {
      // TODO
    },
    cadastrarUsuario() {
      if (
        !this.emailUser ||
        !this.nomeUser ||
        !this.senhaUser ||
        !this.senhaConfirmUser ||
        !this.perfilUser
      ) {
        this.error = 'Preencha todos os dados corretamente'
        snackbar.setMessage(
          'Não foi possível Cadastrar o usuários, Preencha todos os dados.'
        )
        snackbar.setSnackbar(true)
      } else if (this.senhaUser !== this.senhaConfirmUser) {
        snackbar.setMessage(
          'Não foi possível Cadastrar o usuários, Campo Senha e Confirmar Senha não conferem.'
        )
        snackbar.setSnackbar(true)
      } else {
        const url = `/api/usuarios`
        const body = {
          nome: this.nomeUser,
          senha: this.senhaUser,
          email: this.emailUser,
          permissao: this.perfilUser,
        }
        $axios
          .$post(url, body)
          .then((r) => {
            this.dialog = false
            snackbar.setMessage('Usuário Cadastrado com sucesso!.')
            snackbar.setSnackbar(true)
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              snackbar.setMessage(error.response.data.error)
            } else {
              snackbar.setMessage(
                'Não foi possível cadastarr o usuário, tente mais tarde.'
              )
            }
            snackbar.setSnackbar(true)
          })
      }
    },

    buscarUsuarios() {
      const url = `/api/usuarios`
      $axios
        .$get(url)
        .then((r) => {
          this.userMethods = r
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            snackbar.setMessage(error.response.data.error)
          } else {
            snackbar.setMessage(
              'Não foi possível consultar os usuários, tente mais tarde.'
            )
          }
          snackbar.setSnackbar(true)
        })
    },
    selecionarPerfil(event: string) {
      this.perfilUser = event
    },
  },
  created() {
    this.buscarUsuarios()
  },
})
</script>

<style lang="scss" scoped>
</style>
