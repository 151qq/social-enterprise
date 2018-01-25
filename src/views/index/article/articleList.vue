<template>
    <div class="article-list-box">
        <div class="input-box" :class="isEdit ? '' : 'no-add'">
            <el-input
              placeholder="请输入需查询条件"
              v-model="keyValue"
              >
            </el-input>
            <el-button class="search-btn" type="primary" icon="search"
                        @keyup.13="searchItem" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn"
                       type="primary"
                       icon="plus"
                       v-if="isEdit"
                       @click="addItem">增加</el-button>
        </div>
        <section class="big-cards-box">
            <router-link class="card-box"
                         v-for="(item, index) in marketList"
                         :to="{
                                name: 'article-detail',
                                query: {
                                  enterpriseCode: item.enterpriseCode,
                                  pageCode: item.pageCode,
                                  templateCode: item.templateCode
                                }
                              }">
                <div class="card-img">
                    <img v-if="item.pageCover" :src="item.pageCover">
                </div>
                
                <div class="card-content">
                    <div class="card-title">{{item.pageTitle}}</div>
                    <div class="card-desc">{{item.pageAbstract}}</div>
                    <div class="card-tag">
                        <el-tag v-if="item.pageStatus == '2'" type="gray">草稿</el-tag>
                        <el-tag v-if="item.pageStatus == '1'" type="success">已发布</el-tag>
                        <el-tag v-if="item.pageStatus == '3'">已下架</el-tag>
                    </div>
                </div>
                <section class="card-btns" v-if="isEdit">
                    <!-- <i class="el-icon-upload2"
                        v-if="item.pageStatus == '2'"
                        @click.prevent="changeStatus(item, 'submitted')"></i> -->
                    <i class="el-icon-delete2"
                        v-if="item.pageStatus == '2'"
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

        <el-dialog title="添加方案" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="addItemForm.pageTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="文章封面">
                <popup-img :path="addItemForm.pageCover"
                            :is-operate="isEdit"
                            :bg-path="false"
                            @imgClick="imgClick"></popup-img>
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.pageAbstract">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>

        <popup-load :path="addItemForm.pageCover"
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
import { mapGetters } from 'vuex'

export default {
    props: ['articleType'],
    data () {
        return {
            isPage: false,
            keyValue: '',
            marketList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0,
            isAddItem: false,
            addItemForm: {
                pageTitle: '',
                pageCover: '',
                pageAbstract: ''
            },
            isUpload: {
                value: false
            }
        }
    },
    mounted () {
      this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          if (this.$route.query.enterpriseCode == this.userInfo.enterpriseCode && this.articleType == 'template_type_1') {
            return true
          } else {
            return false
          }
        }
    },
    watch: {
      $route () {
        this.keyValue = ''
        this.pageNumber = 1
        this.getList()
      }
    },
    methods: {
        searchItem () {
          this.getList()
        },
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageType: this.articleType,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            if (this.keyValue) {
                formData.keyValue = this.keyValue
            }

            util.request({
                method: 'post',
                interface: 'html5PageList',
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
              method: 'post',
              interface: 'html5PageSubmit',
              data: {
                pageCode: item.pageCode,
                pageStatus: '1'
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
              method: 'post',
              interface: 'html5PageDelete',
              data: {
                pageCode: item.pageCode
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
            this.addItemForm = {
                pageTitle: '',
                pageCover: '',
                pageAbstract: '',
                pageEditor: this.userInfo.userCode
            }
            this.isAddItem = true
        },
        imgClick () {
            this.isUpload.value = true
        },
        changeItemImg (data) {
            this.addItemForm.pageCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.pageTitle) {
              this.$message.error('文章标题不能为空！')
              return
            }

            if (!this.addItemForm.pageCover) {
              this.$message.error('文章封面不能为空！')
              return
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageType: this.articleType,
                pageTitle: this.addItemForm.pageTitle,
                pageCover: this.addItemForm.pageCover,
                pageAbstract: this.addItemForm.pageAbstract
            }

            util.request({
                method: 'post',
                interface: 'html5PageSave',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                  this.pageNumber = 1
                  this.getList()
                  this.isAddItem = false
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
.article-list-box {
    margin: auto;

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

    .no-add {
      width: 696px;
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
          width: 160px;
          height: 100px;
          background: #cfcfd0;

          img {
            display: block;
            width: 160px;
            height: 100px;
          }
        }

        .card-content {
          float: right;
          width: 820px;

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
            overflow: hidden;
          }
        }
      }
    }
}
</style>