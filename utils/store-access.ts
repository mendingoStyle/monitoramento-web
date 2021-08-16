import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Auth from '@/store/auth'
import Snackbar from '@/store/snackbar'

// eslint-disable-next-line import/no-mutable-exports
let auth: Auth
let snackbar: Snackbar

const initializeStores = (store: Store<any>): void => {
  auth = getModule(Auth, store)
  snackbar = getModule(Snackbar, store)
}

export { initializeStores, auth, snackbar }
