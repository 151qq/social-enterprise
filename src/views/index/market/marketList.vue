<template>
    <div class="market-list-box">
        <div class="input-box">
            <el-input
              placeholder="请输入需查询条件"
              v-model="keyValue"
              >
            </el-input>
            <el-button class="search-btn" type="primary" icon="search"
                        @keyup.13="searchItem" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="plus" @click="addItem">增加</el-button>
        </div>
        <section class="big-cards-box">
            <router-link class="card-box"
                         v-for="(item, index) in marketList"
                         :to="{name: 'market-detail', query: {eventCode: item.eventCode, enterpriseCode: item.enterpriseCode}}">
                <div class="card-img">
                    <img v-if="item.eventPlanCover" :src="item.eventPlanCover">
                </div>
                
                <div class="card-content">
                    <div class="card-title">{{item.eventPlanTitle}}</div>
                    <div class="card-desc">{{item.eventPlanDesc}}</div>
                    <div class="card-tag">
                        <!-- draft，submitted，approved，frozen，closed -->
                        <el-tag v-if="item.eventPlanStatus == 'draft'" type="gray">草稿</el-tag>
                        <el-tag v-if="item.eventPlanStatus == 'submitted'" type="success">已发布</el-tag>
                        <el-tag v-if="item.eventPlanStatus == 'end'">正常结束</el-tag>
                        <el-tag v-if="item.eventPlanStatus == 'closed'">提前终止</el-tag>
                    </div>
                </div>
                <section class="card-btns">
                    <i class="el-icon-upload2"
                        v-if="item.eventPlanStatus == 'draft'"
                        @click.stop="changeStatus(item, 'submitted')"></i>
                    <i class="el-icon-delete2"
                        v-if="item.eventPlanStatus == 'draft'"
                        @click.stop="deleteItem(item)"></i>
                </section>
            </router-link>
        </section>
        <div class="more-load"
                v-if="total && marketList.length < total"
                @click="loadMore">加载更多...</div>

        <el-dialog title="添加方案" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="方案名称">
                <el-input v-model="addItemForm.eventPlanTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="方案封面">
                <popup-img :path="addItemForm.eventPlanCover"
                            :is-operate="true"
                            :bg-path="true"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
            <el-form-item label="方案描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.eventPlanDesc">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>

        <popup-load :path="addItemForm.eventPlanCover"
                     :is-operate="true"
                     :bg-path="true"
                     :id-name="'eventPlanCover'"
                     :is-upload="isUpload"
                     @changeImg="changeItemImg"></popup-load>
  </div>
</template>
<script>
import util from '../../../assets/common/util'
import popupImg from '../../../components/common/popupImg.vue'
import popupLoad from '../../../components/common/popupLoad.vue'

export default {
    data () {
        return {
            keyValue: '',
            marketList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            isAddItem: false,
            addItemForm: {
                eventPlanTitle: '',
                eventPlanCover: '',
                eventPlanDesc: ''
            },
            isUpload: {
                value: false
            }
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        searchItem () {},
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'post',
                interface: 'eventInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                if (!type) {
                    this.marketList = res.result.result
                } else {
                    this.marketList = this.marketList.concat(res.result.result)
                }
            })
        },
        changeStatus (item, type) {
            util.request({
              method: 'post',
              interface: 'eventInfoChangeStatus',
              data: {
                eventCode: item.eventCode,
                eventPlanStatus: type
              }
            }).then(res => {
              if (res.result.success == '1') {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '状态修改成功!'
                })
              } else {
                this.$message.error(res.result.message)
              }
            })
        },
        deleteItemByCode (item) {
            util.request({
              method: 'post',
              interface: 'eventInfoDelete',
              data: {
                eventCode: item.eventCode
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
        addItem () {
            this.isAddItem = true
        },
        imgClick () {
            this.isUpload.value = true
        },
        changeItemImg (data) {
            this.addItemForm.eventPlanCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.eventPlanTitle) {
              this.$message.error('方案名称不能为空！')
              return
            }

            if (!this.addItemForm.eventPlanCover) {
              this.$message.error('方案封面不能为空！')
              return
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventPlanTitle: this.addItemForm.eventPlanTitle,
                eventPlanCover: this.addItemForm.eventPlanCover,
                eventPlanDesc: this.addItemForm.eventPlanDesc
            }

            util.request({
                method: 'post',
                interface: 'eventInfoInsert',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                  this.pageNumber = 1
                  this.getList()
                  this.isAddItem = false

                  window.open('/#/marketDetail?enterpriseCode=' + this.$route.query.enterpriseCode + '&eventCode=' + res.result.result, '_blank')
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        loadMore () {
            this.pageNumber++
            this.getList('more')
        }
    },
    components: {
        popupImg,
        popupLoad
    }
}
</script>
<style lang="scss">
.market-list-box {
    width: 1000px;
    margin: 80px auto 30px;

    .input-box {
        display: block;
        width: 800px;
        height: 50px;
        margin: 0 auto 30px;

        .el-input {
          float: left;
          width: 600px;
          height: 50px;

          input {
            font-size: 14px;
            height: 50px;
          }
        }

        .search-btn {
          position: relative;
          float: left;
          margin-left: -10px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          height: 50px;
          font-size: 16px;
          padding: 0 23px;
        }

        .add-new-btn {
            float: right;
            height: 50px;
        }
    }

    .big-cards-box {

      .card-btns {
        text-align: right;
        position: absolute;
        font-size: 16px;
        color: #000000;
        right: 10px;
        bottom: 23px;
      }

      .card-box {
        position: relative;
        display: block;
        overflow: hidden;
        padding-bottom: 20px;
        border-bottom: 1px solid #C0CCDA;
        margin-bottom: 20px;

        .card-img {
          float: left;
          width: 200px;
          height: 120px;
          background: #cfcfd0;

          img {
            display: block;
            width: 200px;
            height: 120px;
          }
        }

        .card-content {
          float: right;
          width: 780px;

          .card-title {
            font-size: 18px;
            line-height: 30px;
            color: #000000;
          }

          .card-desc {
            font-size: 14px;
            line-height: 24px;
            color: #475669;
            height: 48px;
            margin-top: 10px;
            overflow: hidden;
          }
        }
      }
    }
}
</style>