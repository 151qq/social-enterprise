<template>
    <section class="user-list-wx-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addItem">增加</el-button>
        <el-table
          :data="itemList"
          border
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="userMobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="用户角色">
          </el-table-column>
          <el-table-column
            label="操作"
            width="70">
            <template scope="scope">
              <i class="el-icon-delete2" @click="deleteItem(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>

        <div class="clear"></div>
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
        <el-dialog class="user-add-box" title="添加员工" :visible.sync="isAddOEdit">
          <el-form :label-position="'left'" :model="itemData" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="itemData.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input type="number" v-model="itemData.userMobile"></el-input>
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

export default {
    data () {
        return {
          itemList: [],
          isAddOEdit: false,
          itemData: {
            userName: '',
            userMobile: ''
          },
          pageNumber: 1,
          pageSize: 20,
          total: 0
        }
    },
    mounted () {
      this.getItemList()
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
            interface: 'selectUserInfoOfPage',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              pageSize: this.pageSize,
              pageNumber: this.pageNumber
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.total = Number(res.result.total)

              if (res.result.result) {
                res.result.result.forEach((user) => {
                  if (user.securityRoles.length) {
                    var roleArr = []
                    user.securityRoles.forEach((role) => {
                      roleArr.push(role.roleName)
                    })
                    user.roleName = roleArr.join(',')
                  }
                })
              }
              this.itemList = res.result.result
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      pageChange (size) {
        this.pageNumber = size
        this.getItemList()
      },
      addItem () {
        this.itemData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          userName: '',
          userName: ''
        }

        this.isAddOEdit = true
      },
      confirmItem () {
        if (!this.itemData.userName) {
          this.$message({
              message: '请填写用户名称！',
              type: 'warning'
          })
          return false
        }

        if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.itemData.userMobile.trim())) {
          this.$message.error('请输入11位用户手机号')
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        util.request({
            method: 'post',
            interface: 'addUser',
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
      deleteItem (row) {
        util.request({
            method: 'post',
            interface: 'deleteUser',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              userCode: row.userCode,
              userMobile: row.userMobile
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
<style lang="scss">
.user-list-wx-box {
  .page-box {
    margin-top: 15px;
  }

  .el-dialog--small {
    width: 360px;
  }
}
</style>