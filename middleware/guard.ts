import { Middleware } from '@nuxt/types'
import { auth } from '@/store'

const guard: Middleware = ({ store, redirect }) => {
  if (!auth.$accessToken) {
    return redirect('/')
  }
}

export default guard
