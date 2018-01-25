<template>
    <section class="activity-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addItem">增加</el-button>
        <el-table
          :data="itemList"
          border
          style="width: 100%">
          <el-table-column
            prop="templateTitle"
            label="模板名称">
          </el-table-column>
          <el-table-column
            prop="templateTypeName"
            label="模板类型">
          </el-table-column>
          <el-table-column
            label="模板状态"
            width="100">
            <template scope="scope">
              {{scope.row.templateStatus == '1' ? '使用中' : '未启用'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template scope="scope">
              <i v-if="scope.row.templateStatus == '1' && isEdit"
                  class="el-icon-close" @click="closeItem(scope.row)"></i>

              <i v-if="scope.row.templateStatus != '1' && isEdit"
                  class="el-icon-check" @click="submitItem(scope.row)"></i>

              <i v-if="scope.row.templateStatus != '1' && isEdit"
                  class="el-icon-delete2" @click="deleteTemplate(scope.row)"></i>

              <router-link  class="el-icon-document black"
                            target="_blank"
                            :to="{name: 'article-template',
                                  query: {
                                      enterpriseCode: $route.query.enterpriseCode,
                                      templateCode: scope.row.templateCode
                                  }}">
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="operateText" :visible.sync="isAddOEdit">
          <el-form :label-position="'left'" :model="itemData" label-width="80px">
            <el-form-item label="模板名称">
                <el-input v-model="itemData.templateTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="模板类型">
                <el-select class="input-box"
                           v-model="itemData.templateType"
                           name="investor"
                           placeholder="请选择">
                    <el-option
                            v-for="(item, index) in templateTypes"
                            :key="index"
                            :label="item.typeName"
                            :value="item.id">
                    </el-option>
                </el-select>
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
          templateTypes: [],
          isAddOEdit: false,
          itemData: {
            templateTitle: '',
            templateType: ''
          }
        }
    },
    mounted () {
      this.getItemList()
      this.getTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    watch: {
      $route () {
        this.getItemList()
      }
    },
    methods: {
      getItemList () {
        util.request({
            method: 'get',
            interface: 'getTemplates',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.itemList = res.result.result
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      getTypes () {
          util.request({
              method: 'get',
              interface: 'disOfEnterpriseInfo',
              data: {
                types: 'template_type'
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.templateTypes = res.result.result.template_type
              } else {
                  this.$message.error(res.result.message)
              }
          })
      },
      addItem () {
        this.itemData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          templateTitle: '',
          templateType: ''
        }

        this.isAddOEdit = true
      },
      confirmItem () {
        if (!this.itemData.templateTitle) {
            this.$message({
                message: '请填写模版标题！',
                type: 'warning'
            })
            return false
        }

        if (!this.itemData.templateType) {
            this.$message({
                message: '请选择模版类型！',
                type: 'warning'
            })
            return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        util.request({
            method: 'post',
            interface: 'insertTemplate',
            data: this.itemData
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
              this.isAddOEdit = false
            } else {
              this.$message.error(res.result.msg)
            }
        })
      },
      submitItem (row) {
        util.request({
            method: 'post',
            interface: 'updateTemplate',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              templateCode: row.templateCode,
              templateType: row.templateType
            }
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
            } else {
              this.$message.error(res.result.msg)
            }
        })
      },
      closeItem (row) {
        util.request({
            method: 'post',
            interface: 'updateTemplate',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              templateType: row.templateType
            }
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
            } else {
              this.$message.error(res.result.msg)
            }
        })
      },
      deleteTemplate (row) {
        util.request({
            method: 'post',
            interface: 'deleteTemplate',
            data: {
              templateCode: row.templateCode,
              id: row.id
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