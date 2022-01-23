import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'

createApp({
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = 'https://vue3-course-api.hexschool.io/admin/signin'
      axios.post(api, this.user).then((response) => {
        const { token, expired } = response.data
        document.cookie = `token=${token};expires=${new Date(expired)};`
        window.location = 'products.html'
      }).catch((error) => {
        alert(error.data.message)
      })
    }
  }
}).mount('#app')
