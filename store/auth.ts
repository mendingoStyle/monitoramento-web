import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '~/utils/nuxt-instance'
import { snackbar } from '@/store'


import { Credentials } from '@/models'

interface Token {
  access?: string
  refresh?: string
}

@Module({ name: 'auth', stateFactory: true, namespaced: true })
export default class Auth extends VuexModule {
  private accessToken: undefined | string
  private refreshToken: undefined | string

  public get $accessToken() {
    return this.accessToken
  }

  public get $refreshToken() {
    return this.refreshToken
  }

  public get $header() {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }
  }

  @Mutation
  private SET_ACCESS_TOKEN(accessToken: string) {
    this.accessToken = accessToken
    $cookies.set('token', accessToken, {
      maxAge: 3600
    })
  }
  
  @Mutation
  private SET_REFRESH_TOKEN(refreshToken: string) {
    this.refreshToken = refreshToken
    $cookies.set('refresh', refreshToken, {
      maxAge: 3600
    })
  }

  @Mutation
  private LOGOUT() {
    this.refreshToken = undefined
    this.accessToken = undefined
    $cookies.remove('token')
    $cookies.remove('refresh')
  }

  @Mutation
  private UPDATE_TOKENS(tokens: Token) {
    this.refreshToken = tokens?.refresh || undefined
    this.accessToken = tokens?.access || undefined
  }

  @Action
  public async login(credentials: Credentials) {
    try {
      $axios.post('/auth/login', credentials)
        .then(result => {
          
          this.context.commit('SET_REFRESH_TOKEN', result.data.refreshToken)
          this.context.commit('SET_ACCESS_TOKEN', result.data.accessToken)
          window.$nuxt.$router.push({
            path: '/dashboard/inicio'
          })
        })
        .catch(error => {
          if (error.response && error.response.data) {
            alert(error.response.data.error)
          } else {
            alert('Não foi possível efetuar o login, tente mais tarde.')
          }
        })
    } catch (err) {
      alert('Não foi possível efetuar o login.')
    }
  }

  @Action
  public update(tokens: Token) {
    const access = tokens?.access ? tokens?.access : $cookies.get('token')
    const refresh = tokens?.refresh ? tokens?.refresh : $cookies.get('refresh')
    this.context.commit('UPDATE_TOKENS', { access, refresh })
  }

  @Action
  public logout() {
    this.context.commit('LOGOUT')
    window.$nuxt.$router.push({
      path: '/'
    })
  }
}