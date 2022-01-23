import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'
import pagination from '../components/pagination.js'
import productModal from '../components/productModal.js'
import delProductModal from '../components/delProductModal.js'

const api = {
  url: 'https://vue3-course-api.hexschool.io/v2',
  path: 'record-product'
}

createApp({
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      tempPage: 1,
      pagination: {},
      isNew: false,
    }
  },
  methods: {
    getData (page = 1) {
      const url = `${api.url}/api/${api.path}/admin/products?page=${page}`
      axios.get(url)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    checkAdmin () {
      axios.post(`${api.url}/api/user/check`)
        .then(() => {
          this.getData()
        })
        .catch((err) => {
          alert(err.data.message)
          window.location = 'login.html'
        })
    },
    openModal (modal, item) {
      if (modal === 'new') {
        this.tempProduct = {}
        this.$refs.productModal.openModal()
      } else if (modal === 'edit') {
        this.tempProduct = { ...item }
        this.$refs.productModal.openModal()
      } else if (modal === 'del') {
        this.tempProduct = { ...item }
        this.$refs.delProductModal.openModal()
      }
    },
    hideModal (modal) {
      this.getData(this.pagination.current_page)
      if (modal === 'new') {
        this.$refs.productModal.hideModal()
      } else if (modal === 'edit') {
        this.$refs.productModal.hideModal()
      } else if (modal === 'del') {
        this.$refs.delProductModal.hideModal()
      }
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.checkAdmin()
  },
  components: { pagination, productModal, delProductModal }
})
  .mount('#app')
