<template>
    <section class="activity-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small"
                    @click="addItem"
                    v-if="isEdit">增加</el-button>
        <el-table
          :data="itemList"
          border
          style="width: 100%">
          <el-table-column
            prop="productScenarioCname"
            label="场景名称">
          </el-table-column>
          <el-table-column
            prop="productScenarioProductName"
            label="推荐产品">
          </el-table-column>
          <el-table-column
            v-if="isEdit"
            label="操作"
            width="70">
            <template scope="scope">
              <i class="el-icon-delete2" @click="deleteItem(scope.row)"></i>

              <i class="el-icon-document" @click="editItem(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="operateText" :visible.sync="isAddOEdit">
          <el-form :label-position="'left'" :model="itemData" label-width="80px">
            <el-form-item label="场景名称">
                <el-input v-model="itemData.productScenarioCname"></el-input>
            </el-form-item>
            <el-form-item label="推荐产品">
                <el-select
                  class="input-box"
                  v-model="itemData.scenarioProducts"
                  multiple
                  filterable
                  allow-create
                  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in productList"
                    :key="index"
                    :label="item.productCname"
                    :value="item.productCode">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场景封面">
                <popup-img :path="itemData.productScenarioCover"
                            :is-operate="isEdit"
                            :bg-path="false"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
            <el-form-item label="场景说明">
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="140"
                  placeholder="请输入内容"
                  v-model="itemData.productScenarioDesc">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddOEdit = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>

        <popup-load :path="itemData.productScenarioCover"
                     :is-operate="true"
                     :bg-path="true"
                     :id-name="'catalogImage'"
                     :is-upload="isUpload"
                     @changeImg="changeItemImg"></popup-load>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import popupImg from '../../../../components/common/popupImg.vue'
import popupLoad from '../../../../components/common/popupLoad.vue'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
          operateText: '添加',
          itemList: [],
          isAddOEdit: false,
          itemData: {
            productScenarioCname: '',
            scenarioProducts: [],
            productScenarioCover: '',
            productScenarioDesc: ''
          },
          isUpload: {
              value: false
          },
          productList: []
        }
    },
    mounted () {
      this.getItemList()
      this.getProductList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    methods: {
      getItemList () {
        util.request({
            method: 'get',
            interface: 'productScenarioList',
            data: {
              productCode: this.$route.query.productCode
            }
        }).then(res => {
            this.itemList = res.result.result
        })
      },
      getProductList () {
        util.request({
            method: 'get',
            interface: 'productInfoList',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode
            }
        }).then(res => {
            this.productList = res.result.result
        })
      },
      addItem () {
        this.itemData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          productCode: this.$route.query.productCode,
          productScenarioCname: '',
          productScenarioType: '',
          scenarioProducts: [],
          productScenarioCover: '',
          productScenarioDesc: ''
        }

        this.operateText = '添加'

        this.isAddOEdit = true
      },
      editItem (item) {
        this.itemData = Object.assign({}, item)

        this.operateText = '编辑'

        this.isAddOEdit = true
      },
      imgClick () {
          this.isUpload.value = true
      },
      changeItemImg (data) {
          this.itemData.productScenarioCover = data.url
      },
      confirmItem () {
        if (!this.itemData.productScenarioCname) {
          this.$message({
              message: '请填写场景名称！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        util.request({
            method: 'post',
            interface: 'productScenarioSave',
            data: this.itemData
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
              this.isAddOEdit = false
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      deleteItem (row) {
        util.request({
            method: 'post',
            interface: 'productScenarioDelete',
            data: {
              couponCode: row.productScenarioCode
            }
        }).then(res => {
          if (res.result.success == '1') {
            this.getItemList()

            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
    },
    components: {
      popupImg,
      popupLoad
    }
}
</script>