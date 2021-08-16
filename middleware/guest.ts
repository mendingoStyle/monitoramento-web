import { Middleware } from '@nuxt/types'
import { auth } from '@/store'

const guest: Middleware = ({ store, redirect }) => {
  if (auth.$accessToken) {
    return redirect('/dashboard/inicio')
  }
}

export default guest
