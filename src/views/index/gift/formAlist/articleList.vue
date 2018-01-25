<template>
    <section class="big-article-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small"
                  @click="addItem"
                  v-if="isEdit && !articleData.length">增加</el-button>

        <router-link class="card-box"
                     target="_blank"
                     v-for="(item, index) in articleData"
                     :key="index"
                     :to="{name: 'article-detail', query: {enterpriseCode: item.enterpriseCode, pageCode: item.pageCode, templateCode: item.templateCode}}">
            <div class="card-img">
                <img v-if="item.pageCover" :src="item.pageCover">
            </div>
            
            <div class="card-content">
                <div class="card-title">{{item.pageTitle}}</div>
                <div class="card-desc">{{item.pageAbstract}}</div>
            </div>
        </router-link>
        <div class="null-box" v-if="!articleData.length">
            暂无内容！
        </div>

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
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import popupImg from '../../../../components/common/popupImg.vue'
import popupLoad from '../../../../components/common/popupLoad.vue'
import { mapGetters } from 'vuex'

export default {
    props: ['articleData'],
    data () {
        return {
            base: {
                pageCode: '',
                pageTitle: '',
                pageCover: '',
                pageAbstract: ''
            },
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
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          if (this.$route.query.enterpriseCode == this.userInfo.enterpriseCode) {
            return true
          } else {
            return false
          }
        }
    },
    methods: {
        saveArticle (pageCode) {
          util.request({
              method: 'post',
              interface: 'savaProductPageCode',
              data: {
                  productCode: this.$route.query.productCode,
                  productPage: pageCode
              }
          }).then(res => {
              if (res.result.success == '0') {
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
                pageType: 'template_type_4',
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
                  this.saveArticle(res.result.result.pageCode)
                  this.articleData.push(res.result.result)
                  this.isAddItem = false
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
<style lang="scss">
.big-article-box {

    .null-box {
        height: 80px;
        font-size: 16px;
        color: #999999;
        text-align: center;
        line-height: 60px;
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
            width: 120px;
            height: 80px;
            background: #cfcfd0;

            img {
                display: block;
                width: 120px;
                height: 80px;
            }
        }

        .card-content {
            float: right;
            width: 860px;

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
</style>