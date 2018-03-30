<template>
    <section class="discount-list-box">
        <el-button class="add-btn" type="primary"
                  icon="plus" size="small"
                  v-if="base.eventStatus == '1' || base.eventStatus == '2'"
                  @click="addQuan">
          增加
        </el-button>
        <el-table
          :data="discountData"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <!-- props.row -->
            <template scope="props">
              <div class="big-coupon-box">
                <div class="card-box"
                      v-for="(item, index) in props.row.couponInfoList"
                      :key="index">
                    <div class="card-type">
                      {{item.couponTitle}}
                    </div>
                    <div class="card-title">
                      {{item.couponTypeName}}
                    </div>
                    <div class="card-desc">
                      {{item.couponViewName}}
                    </div>
                    <div class="card-btn">
                      <i class="el-icon-delete2"
                          v-if="base.eventStatus == '1' || base.eventStatus == '2'"
                          @click="deleteCoupon(item.couponCode)"></i>
          
                      <router-link  class="el-icon-document"
                                    target="_blank"
                                    :to="{
                                      name: 'coupon',
                                      query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        eventCode: $route.query.eventCode,
                                        couponCode: item.couponCode
                                      }
                                    }">
                      </router-link>
                    </div>
                </div>
                <div class="null-box" v-if="!props.row.couponInfoList.length">
                    暂无内容！
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="couponGroupName"
            label="套券名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="couponGroupBeginTime"
            label="生效时间">
          </el-table-column>
          <el-table-column
            prop="couponGroupEndTime"
            label="失效时间">
          </el-table-column>
          <el-table-column
            prop="couponGroutScenarioName"
            label="营销场景">
          </el-table-column>
          <el-table-column
            v-if="isEdit"
            label="操作"
            width="100">
            <template scope="scope">
              <i class="el-icon-delete2"
                  v-if="base.eventStatus == '1' || base.eventStatus == '2'"
                  @click="deleteDiscount(scope.row)"></i>
  
              <i class="el-icon-document"
                  @click="editDiscount(scope.row)"></i>

              <router-link class="el-icon-plus black" target="_blank"
                            v-if="base.eventStatus == '1' || base.eventStatus == '2'"
                            :to="{
                              name: 'coupon',
                              query: {
                                enterpriseCode: $route.query.enterpriseCode,
                                eventCode: $route.query.eventCode,
                                couponGroupCode: scope.row.couponGroupCode
                              }
                            }">
              </router-link>
              
            </template>
          </el-table-column>
        </el-table>
        
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>

        <el-dialog title="添加套券" :visible.sync="isAddQuan">
          <el-form :label-position="'left'" :model="quanData" label-width="80px">
            <el-form-item label="套券标题">
                <el-input v-model="quanData.couponGroupName"
                          auto-complete="off"
                          placeholder="请输入内容,最多9个字"
                          :maxlength="9"></el-input>
            </el-form-item>
            <el-form-item label="生效时间">
                <el-date-picker
                  type="date"
                  v-model="quanData.couponGroupBeginTime"
                  placeholder="请选择">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="失效时间">
                <el-date-picker
                  type="date"
                  v-model="quanData.couponGroupEndTime"
                  placeholder="请选择">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="使用场景">
                <el-select v-model="quanData.couponGroutScenario"
                           placeholder="请选择">
                    <el-option
                      v-for="(item, index) in useSceneList"
                      :key="index"
                      :label="item.typeName"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告用语">
                <el-input
                    type="textarea"
                    :rows="1"
                    :maxlength="15"
                    placeholder="请输入内容"
                    v-model="quanData.couponGroupIntro">
                </el-input>
                <div class="limit-box">剩余<a>{{couponGroupIntroNum}}</a>字</div>
            </el-form-item>
            <el-form-item label="套券封面">
                <popup-img :path="quanData.couponGroupCover"
                            :is-operate="isEdit && (base.eventStatus == '1' || base.eventStatus == '2')"
                            :bg-path="false"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer"
                v-if="isEdit && (base.eventStatus == '1' || base.eventStatus == '2')">
                <el-button @click="isAddQuan = false">取 消</el-button>
                <el-button type="primary" @click="confirmQuan">确 定</el-button>
          </div>
        </el-dialog>

        <popup-load :path="quanData.couponGroupCover"
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
    props: ['base'],
    data () {
        return {
          discountData: [],
          useSceneList: [],
          isAddQuan: false,
          quanData: {
            couponGroupName: '',
            couponGroupBeginTime: '',
            couponGroupEndTime: '',
            couponGroupBeginTimestamp: '',
            couponGroupEndTimestamp: '',
            couponGroutScenario: '',
            couponGroupCover: '',
            couponGroupIntro: ''
          },
          couponTypes: [],
          isUpload: {
              value: false
          },
          pageNumber: 1,
          pageSize: 20,
          total: 0
        }
    },
    mounted () {
      this.getList()
      this.getTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        },
        couponGroupIntroNum () {
          return 15 - this.quanData.couponGroupIntro.length
        }
    },
    watch: {
      $route () {
        this.getList()
      }
    },
    methods: {
      pageChange (size) {
        this.pageNumber = size
        this.getList()
      },
      formDataDate (str) {
          var dateStr = new Date(str)
          var year = dateStr.getFullYear()
          var monthStr = dateStr.getMonth() + 1
          var dayStr = dateStr.getDate()
          var month = monthStr < 10 ? '0' + monthStr : monthStr
          var day = dayStr < 10 ? '0' + dayStr : dayStr
          return year + '-' + month + '-' + day
      },
      getList () {
        util.request({
            method: 'get',
            interface: 'couponGroupOfPage',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              eventCode: this.$route.query.eventCode,
              pageNumber: this.pageNumber,
              pageSize: this.pageSize
            }
        }).then(res => {
            if (res.result.success == '1') {
                if (!res.result.result.length) {
                  return false
                }

                this.total = Number(res.result.total)

                res.result.result.forEach((item) => {
                  item.couponGroupBeginTime = this.formDataDate(item.couponGroupBeginTimestamp * 1000)
                  item.couponGroupEndTime = this.formDataDate(item.couponGroupEndTimestamp * 1000)
                })
                
                this.discountData = res.result.result
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
      addQuan () {
        this.quanData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          eventCode: this.$route.query.eventCode,
          couponGroupName: '',
          couponGroupBeginTimestamp: '',
          couponGroupEndTimestamp: '',
          couponGroutScenario: '',
          couponGroupCover: '',
          couponGroupIntro: ''
        }

        this.isAddQuan = true
      },
      confirmQuan () {
        if (!this.quanData.couponGroupName) {
          this.$message({
              message: '请填写套券名称！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroupBeginTime) {
          this.$message({
              message: '请选择生效时间！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroupEndTime) {
          this.$message({
              message: '请选择失效时间！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroutScenario) {
          this.$message({
              message: '请选择使用场景！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroupCover) {
          this.$message({
              message: '请选择套券封面！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroupIntro) {
          this.$message({
              message: '请填写广告用语！',
              type: 'warning'
          })
          return false
        }

        this.quanData.couponGroupBeginTime = !this.quanData.couponGroupBeginTime.length || this.quanData.couponGroupBeginTime.length > 10 ? this.quanData.couponGroupBeginTime : this.quanData.couponGroupBeginTime + ' 00:00:00'
        this.quanData.couponGroupEndTime = !this.quanData.couponGroupEndTime.length ||  this.quanData.couponGroupEndTime.length > 10 ? this.quanData.couponGroupEndTime : this.quanData.couponGroupEndTime + ' 00:00:00'

        this.quanData.couponGroupBeginTimestamp = Math.floor(new Date(this.quanData.couponGroupBeginTime).getTime()/1000)
        this.quanData.couponGroupEndTimestamp = Math.floor(new Date(this.quanData.couponGroupEndTime).getTime()/1000)

        if (this.quanData.couponGroupEndTimestamp <= this.quanData.couponGroupBeginTimestamp) {
          this.$message({
              message: '失效时间必须大于生效时间！',
              type: 'warning'
          })
          return false
        }

        var eventEndTime = Math.floor(new Date(this.base.eventEndTime).getTime()/1000)
        var eventStartTime = Math.floor(new Date(this.base.eventStartTime).getTime()/1000)

        if (this.quanData.couponGroupBeginTimestamp < eventStartTime) {
          this.$message({
              message: '生效时间必须大于方案开始时间！',
              type: 'warning'
          })
          return false
        }

        if (this.quanData.couponGroupEndTimestamp > eventEndTime) {
          this.$message({
              message: '失效时间必须小于方案结束时间！',
              type: 'warning'
          })
          return false
        }

        this.insertQuan()
      },
      insertQuan () {
        util.request({
            method: 'post',
            interface: 'manageCouponGroup',
            data: this.quanData
        }).then((res) => {
            if (res.result.success == '1') {
              this.getList()
              this.isAddQuan = false
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      editDiscount (row) {
        this.quanData = Object.assign({}, row)

        this.isAddQuan = true
      },  
      deleteDiscount (row) {
        if (row.couponInfoList.length) {
          this.$message({
              message: '请先删除该组下的券！',
              type: 'warning'
          })
          return false
        }

        util.request({
            method: 'get',
            interface: 'deleteCouponGroup',
            data: {
              couponGroupCode: row.couponGroupCode,
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
      },
      deleteCoupon (code) {
        util.request({
            method: 'get',
            interface: 'couponInfoDelete',
            data: {
              couponCode: code,
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
      },
      imgClick () {
          this.isUpload.value = true
      },
      changeItemImg (data) {
          this.quanData.couponGroupCover = data.url
      }
    },
    components: {
        popupImg,
        popupLoad
    }
}
</script>
<style lang="scss">
.discount-list-box {
  .page-box {
    margin-top: 20px;
  }

  .el-date-editor.el-input {
    width: 100%;
  }

  .el-table__expanded-cell {
    padding: 10px 0 10px 47px;
  }

  .el-dialog--small {
      width: 490px;
  }

  .el-dialog__body {
      padding: 20px 20px 0 20px;

      .el-form-item {
          margin-bottom: 10px;
      }
  }

  .big-coupon-box {
    width: 924px;

    .null-box {
        height: 60px;
        font-size: 16px;
        color: #999999;
        text-align: center;
        line-height: 60px;
    }

    .card-box {
        position: relative;
        display: flex;
        overflow: hidden;
        height: 36px;
        border: 1px solid #C0CCDA;
        border-top: none;

        &:first-child {
          border-top: 1px solid #C0CCDA;
        }

        &:nth-child(even) {
          background: #ffffff;
        }

        .card-type {
            width: 300px;
            font-size: 14px;
            line-height: 36px;
            color: #000000; 
            padding: 0 15px;
            border-right: 1px solid #C0CCDA;
        }

        .card-title {
            flex: 1;
            font-size: 14px;
            line-height: 36px;
            color: #000000;
            padding: 0 15px;
            border-right: 1px solid #C0CCDA;
        }

        .card-desc {
            width: 367px;
            font-size: 14px;
            line-height: 36px;
            color: #000000;
            padding: 0 15px;
            border-right: 1px solid #C0CCDA;
        }

        .card-btn {
          width: 70px;
          padding: 0 15px;
          font-size: 14px;
          line-height: 36px;
          color: #000000;

          a {
            color: #000000;
          }
        }
    }
  }
}
</style>