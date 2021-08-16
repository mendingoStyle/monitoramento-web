import moment from 'moment'

export default {
  data() {
    return {
      mask: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        precision: 2,
        masked: false /* doesn't work with directive 'v-money' */,
      },
    }
  },
  methods: {
    /* v-money */
    removeMoneyMask(strValue) {
      const unformated = strValue.replace(/\./g, '').replace(/,/g, '.')
      return parseFloat(unformated).toFixed(2)
    },
    addMoneyMask(value) {
      return parseFloat(value)
        .toLocaleString('pt-br', { minimumFractionDigits: 2 })
        .toString()
    },
    /* Toasts */
    dangerToast(message, timeout = 4000) {
      this.$toast.error(message, {
        timeout: timeout,
      })
    },
    warningToast(message, timeout = 4000) {
      this.$toast.warning(message, {
        timeout: timeout,
      })
    },
    successToast(message, timeout = 4000) {
      this.$toast.success(message, {
        timeout: timeout,
      })
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    formatDateMoment(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    reloadPageAlert() {
      return 'Os dados da página serão perdidos. Deseja recarregar a página?'
    },
    capitalize(string) {
      const lower = string.toLowerCase()
      let slices = lower.split(' ')
      slices = slices.map(
        str => (str = str.charAt(0).toUpperCase() + str.slice(1))
      )
      return slices.join(' ')
    },
  },
}
