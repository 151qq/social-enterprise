<template>
    <section class="activity-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addQuan">增加</el-button>
        <el-table
          :data="discountData"
          border
          style="width: 100%">
          <el-table-column
            prop="couponTypeName"
            width="120"
            label="券类型">
          </el-table-column>
          <el-table-column
            prop="couponTitle"
            label="券标题">
          </el-table-column>
          <el-table-column
            prop="couponScenarioName"
            width="240"
            label="券使用场景">
          </el-table-column>
          <el-table-column
            label="操作"
            width="70">
            <template scope="scope">
              <i class="el-icon-delete2" @click="deleteDiscount(scope.row)"></i>

              <router-link class="el-icon-document black" target="_blank"
                            :to="{name: 'coupon', query: {enterpriseCode: $route.query.enterpriseCode, eventCode: $route.query.eventCode, couponCode: scope.row.couponCode}}">
              </router-link>
              
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="添加券" :visible.sync="isAddQuan">
          <el-form :label-position="'left'" :model="quanData" label-width="80px">
            <el-form-item label="券标题">
                <el-input v-model="quanData.couponTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="券类型">
                <el-select v-model="quanData.couponType"
                           placeholder="请选择">
                    <el-option
                      v-for="(item, index) in couponTypes"
                      :key="index"
                      :label="item.coupunTypeName"
                      :value="item.coupunType">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用场景">
                <el-select v-model="quanData.couponScenario"
                           placeholder="请选择">
                    <el-option
                      v-for="(item, index) in useSceneList"
                      :key="index"
                      :label="item.typeName"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddQuan = false">取 消</el-button>
                <el-button type="primary" @click="confirmQuan">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'

export default {
    data () {
        return {
          discountData: [],
          useSceneList: [],
          isAddQuan: false,
          quanData: {
            couponTitle: '',
            couponType: '',
            couponScenario: ''
          },
          couponTypes: [],
        }
    },
    mounted () {
      this.getList()
      this.getTypes()
      this.getCouponTypes()
    },
    watch: {
      $route () {
        this.getList()
      }
    },
    methods: {
      getList () {
        util.request({
            method: 'get',
            interface: 'couponInfoList',
            data: {
              eventCode: this.$route.query.eventCode
            }
        }).then(res => {
            this.discountData = res.result.result
        })
      },
      getTypes () {
          util.request({
              method: 'get',
              interface: 'disOfEnterpriseInfo',
              data: {
                types: 'coupon_scenario'
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.useSceneList = res.result.result.coupon_scenario
              } else {
                  this.$message.error(res.result.message)
              }
          })
      },
      getCouponTypes () {
          util.request({
              method: 'get',
              interface: 'getCouponType',
              data: {}
          }).then(res => {
              if (res.result.success == '1') {
                  this.couponTypes = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })
      },
      addQuan () {
        this.quanData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          eventCode: this.$route.query.eventCode,
          couponTitle: '',
          couponType: '',
          couponScenario: ''
        }

        this.isAddQuan = true
      },
      confirmQuan () {
        if (!this.quanData.couponTitle) {
          this.$message({
              message: '请填写券名称！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponType) {
          this.$message({
              message: '请选择券类型！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponScenario) {
          this.$message({
              message: '请选择使用场景！',
              type: 'warning'
          })
          return false
        }

        this.insertQuan()
      },
      insertQuan () {
        util.request({
            method: 'post',
            interface: 'couponInfoInsert',
            data: this.quanData
        }).then((res) => {
            if (res.result.success == '1') {
              var pathObj = {
                name: 'coupon',
                query: {
                  enterpriseCode: this.$route.query.enterpriseCode,
                  eventCode: this.$route.query.eventCode,
                  couponCode: res.result.result
                }
              }

              this.getList()

              this.isAddQuan = false

              window.open('/#/coupon?enterpriseCode=' + this.$route.query.enterpriseCode + '&eventCode=' + this.$route.query.eventCode + '&couponCode=' + res.result.result, '_blank')

            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      deleteDiscount (row) {
        util.request({
            method: 'post',
            interface: 'couponInfoDelete',
            data: {
              couponCode: row.couponCode,
              couponType: row.couponType
            }
        }).then(res => {
          if (res.result.success == '1') {
            this.getList()

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