<template>
    <section class="float-form-box">
      <div class="formDiscount">
        <section class="formBox bigF">
            <span>文章标题</span>
            <el-input
                    :maxlength="25"
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.pageTitle">
            </el-input>
        </section>

        <section class="formBox bigF">
            <span>文章摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.pageAbstract">
            </el-input>
            <div class="limit-box">剩余<a>{{pageAbstractNum}}</a>字</div>
        </section>

        <section class="formBox">
          <span>文章封面</span>
          <div class="input-box">
            <upload :path="base.pageCover"
                :bg-path="false"
                :is-operate="isEdit"
                @changeImg="changeImg"></upload>
          </div>
        </section>
      </div>
      <div class="clear"></div>
      <el-button v-if="isEdit && base.pageStatus == '2'" class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveBase">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import upload from '../../../../components/common/upload'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            base: {
              pageTitle: '',
              pageCover: '',
              pageAbstract: ''
            }
        }
    },
    mounted () {
      this.getBase()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        },
        pageAbstractNum () {
          return 70 - this.base.pageAbstract.length
        }
    },
    methods: {
        changeImg (data) {
          this.base.pageCover = data.url
        },
        getBase () {
            util.request({
                method: 'get',
                interface: 'getPageInfo',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                  this.base = res.result.result

                  this.$emit('baseChange', Object.assign({}, this.base))
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        saveBase () {
          if (!this.base.pageTitle) {
            this.$message.error('文章标题不能为空！')
            return
          }

          if (this.base.pageAbstract.length < 40) {
            this.$message.error('文章摘要最少40个字！')
            return
          }

          if (!this.base.pageCover) {
            this.$message.error('文章封面不能为空！')
            return
          }

          util.request({
              method: 'post',
              interface: 'html5PageSave',
              data: this.base
          }).then(res => {
              if (res.result.success == '1') {
                this.getBase()
              } else {
                this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
      upload
    }
}
</script>
<style lang="scss">
.article-base-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>