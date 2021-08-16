import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'

let $axios: NuxtAxiosInstance
let $cookies: NuxtCookies

export const initializeAxios = (axiosInstance: NuxtAxiosInstance) => {
  $axios = axiosInstance
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
}

export const initializeCookies = (cookieInstance: NuxtCookies) => {
  $cookies = cookieInstance
}

export { $axios, $cookies }
