import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'snackbar', stateFactory: true, namespaced: true })
export default class Snackbar extends VuexModule {
  private message = '' 
  private showSnackbar = false

  public get $message() {
    return this.message
  }

  public get $showSnackbar() {
    return this.showSnackbar
  }

  @Mutation
  private SHOW_SNACKBAR() {
    this.showSnackbar = true
  }

  @Mutation
  private HIDE_SNACKBAR() {
    this.showSnackbar = false
  }

  @Mutation
  private SET_MESSAGE(message: string) {
    this.message = message
  }

  @Action
  public setSnackbar(payload: boolean) {
    if (payload) {
      this.context.commit('SHOW_SNACKBAR')
      setTimeout(() => {
        this.context.commit('SET_MESSAGE', '')
        this.context.commit('HIDE_SNACKBAR')
      }, 5000)
    } else {
      this.context.commit('HIDE_SNACKBAR')
    }
  }

  @Action
  public setMessage(payload: string) {
    this.context.commit('SET_MESSAGE', payload)
  }

}
