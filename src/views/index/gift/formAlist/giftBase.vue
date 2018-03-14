<template>
    <section>
      <div class="formDiscount">
        <section class="formBox">
            <span>礼品名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容，最多20个字"
              :maxlength="20"
              v-model="base.productCname">
            </el-input>
        </section>
        <!-- <section class="formBox">
            <span>礼品编码</span>
            <el-input
              class="input-box"
              placeholder="请输入内容，最多15个字"
              :maxlength="15"
              v-model="base.productSku">
            </el-input>
        </section>
        <section class="formBox">
            <span>礼品类型</span>
            <el-select
              class="input-box"
              v-model="base.productType"
              filterable
              placeholder="请选择">
              <el-option
                v-for="(item, index) in productTypes"
                :key="index"
                :label="item.dictKeyValue"
                :value="item.dictKeyCode">
              </el-option>
            </el-select>
        </section> -->
        <!-- <section class="formBox">
            <span>价格类型</span>
            <el-select
              class="input-box"
              v-model="base.priceType"
              filterable
              placeholder="请选择">
              <el-option
                v-for="(item, index) in priceTypes"
                :key="index"
                :label="item.typeName"
                :value="item.typeCode">
              </el-option>
            </el-select>
        </section> -->
        <section class="formBox">
            <span>礼品价格</span>
            <el-input
              class="input-box"
              type="number"
              placeholder="请输入内容"
              v-model="base.productPrice">
            </el-input>
        </section>
        <!-- <section class="formBox">
            <span>价格说明</span>
            <el-input
              class="input-box"
              placeholder="请输入内容，最多140个字"
              :maxlength="140"
              v-model="base.priceDesc">
            </el-input>
        </section> -->
        <section class="formBox">
            <span>介绍链接</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.productEcommerceLink">
            </el-input>
        </section>
        <!-- <section class="formBox">
            <span>天猫链接</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.productTmallLink">
            </el-input>
        </section>
        <section class="formBox">
            <span>京东链接</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.productJdLink">
            </el-input>
        </section> -->
        <section class="formBox bigF">
            <span>礼品摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="600"
              placeholder="请输入内容"
              v-model="base.productDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{productDescNum}}</a>字</div>
        </section>
        <div class="clear"></div>
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            v-if="isEdit && base.productStatus == '2'"
            @click="saveBase">保存</el-button>

      <el-button class="save-btn" type="info" :plain="true" size="small" icon="check"
            v-if="isEdit && base.productStatus == '2' && isSave"
            @click="savaProductStatus('1')">发布</el-button>

      <el-button class="save-btn" type="info" :plain="true" size="small" icon="close"
            v-if="isEdit && base.productStatus == '1'"
            @click="savaProductStatus('0')">下架</el-button>
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
              productCname: '',
              productSku: '',
              productStatus: '',
              productType: '',
              productCover: '',
              productDesc: '',
              priceType: '',
              productPrice: '',
              priceDesc: '',
              productEcommerceLink: '',
              productTmallLink: '',
              productJdLink: ''
            },
            productTypes: [],
            priceTypes: [],
            isSave: false
        }
    },
    mounted () {
      this.getBase()
      // this.getTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        },
        productDescNum () {
          return 600 - this.base.productDesc.length
        }
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'productInfoGet',
              data: {
                productCode: this.$route.query.productCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.base = res.result.result.productInfo

                if (res.result.result.productInfo.productType) {
                  this.isSave = true
                }

                // this.geProductTypes('gift_type')

                this.$emit('change', res.result.result)
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getTypes () {
          util.request({
              method: 'get',
              interface: 'getPriceType',
              data: {}
          }).then(res => {
              if (res.result.success == '1') {
                this.priceTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        geProductTypes (type) {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: type
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.productTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        changeImg (data) {
          this.base.productCover = data.url
        },
        saveBase () {
          if (!this.base.productCname) {
              this.$message({
                  message: '请填写礼品名称！',
                  type: 'warning'
              })
              return false
          }

          // if (!this.base.productSku) {
          //   this.$message({
          //         message: '请填写礼品编码！',
          //         type: 'warning'
          //     })
          //     return false
          // }

          // if (!this.base.productType) {
          //   this.$message({
          //         message: '请填写礼品类型！',
          //         type: 'warning'
          //     })
          //     return false
          // }

          this.base.productType = 'gift_enterprise'

          util.request({
              method: 'post',
              interface: 'productInfoSave',
              data: this.base
          }).then(res => {
              if (res.result.success == '1') {
                this.getBase()
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        savaProductStatus (type) {
          util.request({
              method: 'post',
              interface: 'savaProductStatus',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode,
                productCode: this.$route.query.productCode,
                productStatus: type
              }
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
.product-base-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>