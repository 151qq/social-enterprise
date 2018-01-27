<template>
    <div class="survey-list-box">
        <div class="input-box">
            <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
            <el-button class="search-btn" type="primary" icon="search" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="plus" @click="addItem">增加</el-button>
        </div>
        <section class="big-cards-box">
            <router-link class="card-box"
                         target="_blank"
                         v-for="(item, index) in marketList"
                         :to="{name: 'cultivate-detail', query: {enterpriseCode: item.enterpriseCode, surveyCode: item.surveyCode, surveyType: item.surveyType}}">
                <div class="card-img">
                    <img v-if="item.surveyCover" :src="item.surveyCover">
                </div>
                
                <div class="card-content">
                    <div class="card-title">{{item.surveyTitle}}</div>
                    <div class="card-desc">{{item.surveyAbstraction}}</div>
                    <div class="card-tag">
                        <el-tag v-if="item.surveyStatus == 'survey_status_1'" type="gray">草稿</el-tag>
                        <el-tag v-if="item.surveyStatus == 'survey_status_2'" type="success">正在使用</el-tag>
                        <el-tag v-if="item.surveyStatus == 'survey_status_3'">已下线</el-tag>
                    </div>
                </div>
                <section class="card-btns">
                    <i class="el-icon-upload2"
                        v-if="item.surveyStatus == 'survey_status_1'"
                        @click.prevent="changeStatus(item, 'survey_status_2')"></i>
                    <i class="el-icon-delete2"
                        v-if="item.surveyStatus == 'survey_status_1'"
                        @click.prevent="deleteItem(item)"></i>
                </section>
            </router-link>
        </section>

        <section class="null-box" v-if="!marketList.length && isPage">
          暂无内容！！！
        </section>
        <div class="more-load"
                v-if="total && marketList.length < total"
                @click="loadMore">加载更多...</div>

        <el-dialog title="添加调研" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="调研标题">
                <el-input v-model="addItemForm.surveyTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调研封面">
                <popup-img :path="addItemForm.surveyCover"
                            :is-operate="true"
                            :bg-path="true"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
            <el-form-item label="调研摘要">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.surveyAbstraction">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>

        <popup-load :path="addItemForm.surveyCover"
                     :is-operate="true"
                     :bg-path="true"
                     :id-name="'pageCover'"
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
            isPage: false,
            surveyType: 'survey_type_2',
            keyValue: '',
            marketList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            isAddItem: false,
            addItemForm: {
                surveyTitle: '',
                surveyCover: '',
                surveyAbstraction: ''
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
        searchItem () {
          this.getList()
        },
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                surveyType: this.surveyType,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            // 非root只能操作自己的
            if (this.userInfo.roleCodes.indexOf('platform_root') < 0) {
              formData.surveyScenario = this.userInfo.userCode
            }

            if (this.keyValue) {
                formData.keyValue = this.keyValue
            }

            util.request({
                method: 'get',
                interface: 'selectByEcAndTy',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = Number(res.result.total)
                this.isPage = true
                if (!type) {
                    this.marketList = res.result.result
                } else {
                    this.marketList = this.marketList.concat(res.result.result)
                }
            })
        },
        changeStatus (item, type) {
            util.request({
              method: 'get',
              interface: 'updateSurveyStatus',
              data: {
                surveyCode: item.surveyCode,
                surveyStatus: type
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
        deleteItem (item) {
            util.request({
              method: 'get',
              interface: 'deleteSurvey',
              data: {
                surveyCode: item.surveyCode
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
            this.addItemForm.surveyCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.surveyTitle) {
              this.$message.error('调研标题不能为空！')
              return
            }

            if (!this.addItemForm.surveyCover) {
              this.$message.error('调研封面不能为空！')
              return
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                surveyType: this.surveyType,
                surveyTitle: this.addItemForm.surveyTitle,
                surveyCover: this.addItemForm.surveyCover,
                surveyAbstraction: this.addItemForm.surveyAbstraction,
                surveyScenario: this.userInfo.userCode
            }

            util.request({
                method: 'post',
                interface: 'manageSurveyInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                  this.pageNumber = 1
                  this.getList()
                  this.isAddItem = false

                  window.open('/#/surveyDetail?enterpriseCode=' + this.$route.query.enterpriseCode + '&surveyCode=' + res.result.result, '_blank')
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
.survey-list-box {
    width: 1000px;
    margin: 80px auto 30px;

    .input-box {
        display: block;
        width: 800px;
        height: 50px;
        margin: 0 auto 30px;

        .input-search {
          float: left;
          width: 600px;
          height: 50px;
          appearance: none;
          font-size: 14px;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          line-height: 1;
          outline: 0;
          padding: 3px 10px;
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