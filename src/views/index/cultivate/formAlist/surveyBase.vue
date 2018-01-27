<template>
    <section class="product-base-box">
      <div class="formDiscount">
        <section class="formBox bigF">
            <span>调研标题</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.surveyTitle">
            </el-input>
        </section>
        <section class="formBox bigF">
            <span>调研摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="50"
              placeholder="请输入内容"
              v-model="base.surveyAbstraction">
            </el-input>
        </section>
        <section class="formBox bigF">
          <span>调研封面</span>
          <div class="input-box">
            <upload :path="base.surveyCover"
                    :bg-path="true"
                    :is-operate="isOperate"
                    @changeImg="changeImg"></upload>
          </div>
        </section>
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveBase()">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import upload from '../../../../components/common/upload'
export default {
    data () {
        return {
            base: {
              surveyTitle: '',
              surveyAbstraction: '',
              surveyCover: ''
            },
            isOperate: true
        }
    },
    mounted () {
      this.getBase()
    },
    watch: {
      $route () {
        this.getBase()
      }
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'selectSurveyInfo',
              data: {
                surveyCode: this.$route.query.surveyCode
              }
          }).then(res => {
              this.base = res.result.result
          })
        },
        changeImg (data) {
          this.base.surveyCover = data.url
        },
        saveBase () {
            if (!this.base.surveyTitle) {
                this.$message({
                    message: '请填写调研标题！',
                    type: 'warning'
                })
                return false
            }
            
            util.request({
                method: 'post',
                interface: 'manageSurveyInfo',
                data: this.base
            }).then(res => {
                if (res.result.success == '1') {
                    this.getBase()

                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })
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