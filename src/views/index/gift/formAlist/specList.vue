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
            prop="productParameterKey"
            label="规格名称">
          </el-table-column>
          <el-table-column
            prop="productParameterValue"
            label="说明">
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
            <el-form-item label="规格名称">
                <el-input v-model="itemData.productParameterKey" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格说明">
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="140"
                  placeholder="请输入内容"
                  v-model="itemData.productParameterValue">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddOEdit = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
          operateText: '添加',
          itemList: [],
          isAddOEdit: false,
          itemData: {
            productParameterKey: '',
            productParameterValue: ''
          }
        }
    },
    mounted () {
      this.getItemList()
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
            interface: 'productParameterList',
            data: {
              productCode: this.$route.query.productCode
            }
        }).then(res => {
            this.itemList = res.result.result
        })
      },
      addItem () {
        this.itemData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          productCode: this.$route.query.productCode,
          productParameterKey: '',
          productParameterValue: ''
        }

        this.operateText = '添加'

        this.isAddOEdit = true
      },
      editItem (item) {
        this.itemData = Object.assign({}, item)

        this.operateText = '编辑'

        this.isAddOEdit = true
      },
      confirmItem () {
        if (!this.itemData.productParameterKey) {
          this.$message({
              message: '请填写规格名称！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        util.request({
            method: 'post',
            interface: 'productParameterSave',
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
            interface: 'productParameterDelete',
            data: {
              parameterCode: row.productParemeterCode
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
    }
}
</script>