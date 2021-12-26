const api = {
    url: 'https://vue3-course-api.hexschool.io/v2',
    path: 'record-product',
  }

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    modal: {
        default: false,
      }
  },
  data() {
    return {
    };
  },

  methods: {
    delProduct() {   
      axios
        .delete(`${api.url}/api/${api.path}/admin/product/${this.item.id}`)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            this.$emit("update");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
  template:`
  <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ item.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
`
};
