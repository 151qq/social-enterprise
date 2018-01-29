<template>
    <div class="form-discount">
        <section class="float-form-box">
          <!-- 基本信息 -->
          <div class="formDiscount">
            <section class="formBox">
                <span>券标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponTitle">
                </el-input>
            </section>
            <section class="formBox">
                <span>券类型</span>
                <el-select class="input-box"
                           v-model="quanData.couponType"
                           placeholder="请选择">
                    <el-option
                      v-for="(item, index) in couponTypes"
                      :key="index"
                      :label="item.coupunTypeName"
                      :value="item.coupunType">
                    </el-option>
                </el-select>
            </section>
            <section class="formBox">
                <span>券数量</span>
                <el-input
                  class="input-box"
                  type="number"
                  :min="1"
                  placeholder="请输入"
                  v-model="quanData.couponQuantity">
                </el-input>
            </section>

            <section class="formBox">
                <span>每人限领(张)</span>
                <el-input
                  class="input-box"
                  type="number"
                  :min="1"
                  placeholder="请输入"
                  v-model="quanData.couponGetLimit">
                </el-input>
            </section>
            <section class="formBox">
                <span>最多可用(张)</span>
                <el-input
                  class="input-box"
                  type="number"
                  :min="1"
                  placeholder="请输入"
                  v-model="quanData.couponUseLimit">
                </el-input>
            </section>
            <section class="formBox">
                <span>是否可转</span>
                <div class="input-box">
                  <el-switch
                    v-model="quanData.couponTransferOpt"
                    on-text="是"
                    off-text="否"
                    on-value="1"
                    off-value="0">
                  </el-switch>
                </div>
            </section>

            <section class="formBox bigF">
                <span>优惠说明</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="140"
                  placeholder="请输入内容"
                  v-model="quanData.couponDescription">
                </el-input>
            </section>

            <section class="formBox bigF">
                <span>适用产品</span>
                <el-select class="input-box"
                           multiple
                           filterable
                           allow-create
                           v-model="productList"
                           placeholder="请选择">
                    <el-option
                      v-for="(item, index) in products"
                      :key="index"
                      :label="item.productCname"
                      :value="item.productCode">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
              <span>券封面</span>
              <div class="input-box">
                <upload :path="quanData.couponCover"
                        :bg-path="true"
                        :is-operate="isOperate"
                        :id-name="'couponCover'"
                        @changeImg="changeCouponCover"></upload>
              </div>
            </section>
            
          <template v-if="quanData.couponType == 'cashCoupon'">
            <section class="formBox">
              <span>减免(分)</span>
              <el-input
                class="input-box"
                type="number"
                :min="0"
                placeholder="请输入"
                v-model="quanData.couponReduceCost">
              </el-input>
            </section>
            <section class="formBox">
                <span>最低消费(分)</span>
                <el-input
                  class="input-box"
                  type="number"
                  :min="0"
                  placeholder="请输入"
                  v-model="quanData.couponLeastCost">
                </el-input>
            </section>
          </template>

          <template v-if="quanData.couponType == 'giftCoupon'">
            <section class="formBox">
                <span>礼品</span>
                <el-select class="input-box" v-model="quanData.couponGiftCode" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in giftLists"
                      :key="index"
                      :label="item.productCname"
                      :value="item.productCode">
                    </el-option>
                </el-select>
            </section>
          </template>

          <div class="clear"></div>
        </div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveQuan">保存</el-button>
        <div class="clear"></div>
      </section>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import upload from '../../../components/common/upload'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isOperate: true,
            productList: [],
            quanData: {
              couponGroupCode: '',
              couponTitle: '',
              couponCode: '',
              couponType: '',
              couponDescription: '',
              couponCover: '',
              couponQuantity: '',
              enterpriseCode: '',
              couponTransferOpt: '',
              couponGetLimit: '',
              couponUseLimit: '',
              couponGiftCode: '',
              couponLeastCost: '',
              couponReduceCost: ''
            },
            couponTypes: [],
            products: [],
            giftLists: [],
            callcenterData: {}
        }
    },
    mounted () {
      if (this.$route.query.couponCode) {
        this.getBase()
      } else {
        this.quanData.enterpriseCode = this.$route.query.enterpriseCode
        this.quanData.couponGroupCode = this.$route.query.couponGroupCode
        this.quanData.couponGetLimit = 1
        this.quanData.couponUseLimit = 1
        this.quanData.couponTransferOpt = '1'
      }
      
      this.getProducts()
      this.getTypes()
      this.getGifts()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'couponInfoGet',
              data: {
                couponCode: this.$route.query.couponCode
              }
          }).then((res) => {
              if (res.result.success == '1') {
                let result = res.result.result.couponInfo

                this.productList = res.result.result.couponProductArray
                this.quanData = result
              } else {
                this.$message.error(res.result.msg)
              }
          })
        },
        getTypes () {
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
        getProducts () {
            util.request({
                method: 'get',
                interface: 'gifProductList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    productType: 'product'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.products = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        getGifts () {
            util.request({
                method: 'get',
                interface: 'gifProductList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    productType: 'gift'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.giftLists = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        changeCouponCover (data) {
          this.quanData.couponCover = data.url
        },
        saveQuan () {
          if (!this.quanData.couponTitle) {
            this.$message({
                message: '请添加券标题！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponTitle.length > 9) {
            this.$message({
                message: '券标题最多9个字！',
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

          if (!this.quanData.couponGetLimit) {
            this.$message({
                message: '请添加每人限领！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponUseLimit) {
            this.$message({
                message: '请添加最多可用！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponDescription) {
            this.$message({
                message: '请添加券优惠说明！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponDescription.length > 140) {
            this.$message({
                message: '券优惠说明最多140个字！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponCover) {
            this.$message({
                message: '请添加券封面！',
                type: 'warning'
            })
            return false
          }
          
          if (!this.productList.length) {
            this.$message({
                message: '请添加产品！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponQuantity) {
            this.$message({
                message: '请添加券数量！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponReduceCost && this.quanData.couponType == 'cashCoupon') {
            this.$message({
                message: '请添加券减免！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponLeastCost && this.quanData.couponType == 'cashCoupon') {
            this.$message({
                message: '请添加券最低消费！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponGiftCode && this.quanData.couponType == 'giftCoupon') {
            this.$message({
                message: '请添加礼品！',
                type: 'warning'
            })
            return false
          }

          this.quanData.productCode = this.productList.join(',')

          var interfaceName = 'couponInfoInsert'

          if (this.$route.query.couponCode) {
            interfaceName = 'couponInfoUpdate'
          }

          util.request({
              method: 'post',
              interface: interfaceName,
              data: this.quanData
          }).then((res) => {
              if (res.result.success == '1') {
                this.getBase()

                var pathObj = {
                  name: 'market-detail',
                  query: {
                    eventCode: this.$route.query.eventCode,
                    enterpriseCode: this.$route.query.enterpriseCode
                  }
                }

                this.$router.push(pathObj)
              } else {
                this.$message.error(res.result.msg)
              }
          })
        }
    },
    components: {
      upload
    }
}
</script>