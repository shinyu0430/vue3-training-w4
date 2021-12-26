import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from '../components/pagination.js'
import productModal from '../components/productModal.js'
import delProductModal from '../components/delProductModal.js'

let editModal = null;
let delModal = null;

const api={
  url: 'https://vue3-course-api.hexschool.io/v2',
  path: 'record-product',
};

createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      tempPage:1,
      pagination: {},
      modal: false,
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token === '') {
      alert('您尚未登入請重新登入。');
      window.location = 'login.html';
    }

    axios.defaults.headers.common.Authorization = token;
    this.getData();

    editModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      backdrop: 'static'
    });

    delModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false, // Closes the modal when escape key is pressed
      backdrop: 'static', // Doesn't close the modal on click.
    });


  },
  methods: {
    getData(page = 1) {
      const url = `${api.url}/api/${api.path}/admin/products?page=${page}`;
      axios.get(url)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
            this.pagination = response.data.pagination;
          } else {
            alert(response.data.message);
            window.location = 'index.html';
          }
        }).catch((error) => {
          alert(error.data.message);
        })
    },
    openModal(modal, item) { 
      if(modal === 'new') { 
        this.tempProduct = {
          imagesUrl: [],
        };
        editModal.show();
      } else if(modal === 'edit') {
        this.tempProduct = { ...item };
        editModal.show();
      } else if(modal === 'del') {
        this.tempProduct = { ...item };
        delModal.show()
      }
    },
    hideModal(modal) { 
      this.getData(this.pagination.current_page)
      if(modal === 'new') {
        editModal.hide();
      } else if(modal === 'edit') {
        editModal.hide();
      } else if(modal === 'del') {
        delModal.hide()
      }
    },
  },
  components:{pagination,productModal,delProductModal}
})


  .mount('#app')