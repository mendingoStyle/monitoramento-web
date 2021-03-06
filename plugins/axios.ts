import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ app, store, redirect }) => {
  app.$axios.onRequest((config) => {
    const token = app.$cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  })

  app.$axios.onError((error) => {
    if (error.response?.status === 401) {
      store.dispatch('auth/logout')
    }
  })
}

export default axiosPlugin
