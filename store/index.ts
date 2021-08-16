import { Store, ActionTree } from 'vuex'
import { initializeStores } from '@/utils/store-access'

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]
export * from '@/utils/store-access'

const state = () => ({})
type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }) {
    dispatch('auth/update')
  }
}
