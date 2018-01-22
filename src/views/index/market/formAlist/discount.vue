<template>
    <section class="discount-list-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addQuan">增加</el-button>
        <el-table
          :data="discountData"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <!-- props.row -->
            <template scope="props">
              <div class="big-coupon-box">
                <router-link class="card-box"
                             target="_blank"
                             v-for="(item, index) in props.row.couponInfoList"
                             :key="index"
                             :to="{name: 'coupon', query: {enterpriseCode: $route.query.enterpriseCode, eventCode: $route.query.eventCode, couponCode: item.couponCode}}">
                    <div class="card-img">
                        <img v-if="item.couponCover" :src="item.couponCover">
                    </div>
                    
                    <div class="card-content">
                        <div class="card-title">{{item.couponTitle}}</div>
                        <div class="card-desc">{{item.couponAbstract}}</div>
                    </div>
                </router-link>
                <div class="null-box" v-if="!props.row.couponInfoList.length">
                    暂无内容！
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="couponGroupName"
            label="套券名称">
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
            label="操作"
            width="100">
            <template scope="scope">
              <i class="el-icon-delete2" @click="deleteDiscount(scope.row)"></i>
  
              <i class="el-icon-document" @click="editDiscount(scope.row)"></i>

              <router-link class="el-icon-plus black" target="_blank"
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
            :total="total">
        </el-pagination>

        <el-dialog title="添加套券" :visible.sync="isAddQuan">
          <el-form :label-position="'left'" :model="quanData" label-width="80px">
            <el-form-item label="套券标题">
                <el-input v-model="quanData.couponGroupName"
                          auto-complete="off"
                          placeholder="请输入内容"></el-input>
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
            <el-form-item label="套券封面">
                <popup-img :path="quanData.couponGroupCover"
                            :is-operate="true"
                            :bg-path="true"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
            <el-form-item label="广告用语">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="quanData.couponGroupIntro">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
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

export default {
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
                this.total = Number(res.result.total)

                if (res.result.result.length) {
                  res.result.result.forEach((item) => {
                    item.couponGroupBeginTime = this.formDataDate(item.couponGroupBeginTimestamp * 1000)
                    item.couponGroupEndTime = this.formDataDate(item.couponGroupEndTimestamp * 1000)
                  })
                }
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

        if (!this.quanData.couponGroupBeginTimestamp) {
          this.$message({
              message: '请选择生效时间！',
              type: 'warning'
          })
          return false
        }

        if (!this.quanData.couponGroupEndTimestamp) {
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

        this.quanData.couponGroupBeginTimestamp = Math.floor(new Date(this.quanData.couponGroupBeginTime).getTime()/1000)
        this.quanData.couponGroupEndTimestamp = Math.floor(new Date(this.quanData.couponGroupEndTime).getTime()/1000)

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
              this.$message.error(res.result.msg)
            }
        })
      },
      editDiscount (row) {
        this.quanData = Object.assign({}, row)

        this.isAddQuan = true
      },  
      deleteDiscount (row) {
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

  .big-coupon-box {

    .null-box {
        height: 80px;
        font-size: 16px;
        color: #999999;
        text-align: center;
        line-height: 60px;
    }

    .card-box {
        position: relative;
        display: flex;
        overflow: hidden;
        padding-bottom: 20px;
        border-bottom: 1px solid #C0CCDA;
        margin-bottom: 10px;

        .card-img {
            width: 120px;
            height: 80px;
            background: #cfcfd0;
            margin-right: 20px;

            img {
                display: block;
                width: 120px;
                height: 80px;
            }
        }

        .card-content {
            flex: 1;

            .card-title {
                font-size: 16px;
                line-height: 24px;
                color: #000000;
                margin-bottom: 3px;
            }

            .card-desc {
                font-size: 14px;
                line-height: 24px;
                color: #475669;
                height: 48px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
  }
}
</style>