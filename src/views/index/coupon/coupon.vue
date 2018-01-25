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
                <span>券封面文字</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponAbstract">
                </el-input>
            </section>

            <section class="formBox">
                <span>券颜色</span>
                <el-select class="input-box"
                            v-model="quanData.couponColor"
                            placeholder="请选择">
                    <el-option
                      v-for="(item, index) in colorList"
                      :style="{background: item.label}"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </section>
            <section class="formBox">
                <span>核心提示</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponDescription">
                </el-input>
            </section>
            <section class="formBox">
                <span>按钮标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponBtnTitle">
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
            <section class="formBox bigF">
                <span>券核销提示</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="1024"
                  placeholder="请输入内容"
                  v-model="quanData.couponNotice">
                </el-input>
            </section>

            <section class="formBox bigF">
                <span>券详情</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="160"
                  placeholder="请输入内容"
                  v-model="quanData.couponDetailTxt">
                </el-input>
            </section>

            <section class="formBox">
                <span>券按钮提示</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponBtnSubTitle">
                </el-input>
            </section>
            <section class="formBox">
                <span>券核销链接</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponBtnUrl">
                </el-input>
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
                <span>企业电商名称</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponEcommerceUrlName">
                </el-input>
            </section>
            <section class="formBox">
                <span>企业电商链接</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponEcommerceUrl">
                </el-input>
            </section>
            <section class="formBox">
                <span>企业电商提示</span>
                <el-input
                  class="input-box"
                  placeholder="请输入"
                  v-model="quanData.couponEcommerceUrlSubTitle">
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
                      :label="item.catalogCname"
                      :value="item.catalogCode">
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
            <section class="formBox">
              <span>券详情页图</span>
              <div class="input-box">
                <upload :path="quanData.couponDetailImg"
                        :bg-path="true"
                        :is-operate="isOperate"
                        :id-name="'couponDetailImg'"
                        @changeImg="changeCouponDetailImg"></upload>
              </div>
            </section>
            <section class="formBox">
              <span>券logo</span>
              <div class="input-box">
                <upload :path="quanData.couponIconUrl"
                        :bg-path="true"
                        :is-operate="isOperate"
                        :id-name="'couponIconUrl'"
                        @changeImg="changeCouponIconUrl"></upload>
              </div>
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
                      :label="item.label"
                      :value="item.id">
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
            couponTimes: [],
            productList: [],
            quanData: {
              couponGroupCode: '',
              couponTitle: '',
              couponCode: '',
              couponColor: '',
              couponType: '',
              couponNotice: '',
              couponDescription: '',
              couponStatus: '',
              couponIconUrl: '',
              couponTitle: '',
              couponAbstract: '',
              couponExchangeTxt: '',
              couponQuantity: '',
              couponRealInventory: '',
              eventCode: '',
              enterpriseCode: '',
              couponScenario: '',
              couponBtnTitle: '',
              couponBtnSubTitle: '',
              couponBtnUrl: '',
              couponEcommerceUrlName: '',
              couponEcommerceUrlSubTitle: '',
              couponTransferOpt: '',
              couponGetLimit: '',
              couponUseLimit: '',
              couponDetailImg: '',
              couponDetailTxt: '',
              couponGiftCode: '',
              couponDiscount: '',
              couponLeastCost: '',
              couponReduceCost: ''
            },
            colorList: [
              {
                label: '#63b359',
                value: 'Color010'
              },
              {
                label: '#2c9f67',
                value: 'Color020'
              },
              {
                label: '#509fc9',
                value: 'Color030'
              },
              {
                label: '#5885cf',
                value: 'Color040'
              },
              {
                label: '#9062c0',
                value: 'Color050'
              },
              {
                label: '#d09a45',
                value: 'Color060'
              },
              {
                label: '#e4b138',
                value: 'Color070'
              },
              {
                label: '#ee903c',
                value: 'Color080'
              },
              {
                label: '#f08500',
                value: 'Color081'
              },
              {
                label: '#a9d92d',
                value: 'Color082'
              },
              {
                label: '#dd6549',
                value: 'Color090'
              },
              {
                label: '#cc463d',
                value: 'Color100'
              },
              {
                label: '#cf3e36',
                value: 'Color101'
              },
              {
                label: '#5E6671',
                value: 'Color102'
              }
            ],
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
        this.quanData.couponGroupCode = this.$route.query.couponGroupCode
        this.getCallcenter()
      }
      
      this.getProducts()
      this.getTypes()
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
        getCallcenter () {
            util.request({
                method: 'get',
                interface: 'findCallCenterConfig',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var data = res.result.result

                    var callcenterData = {
                      couponBtnTitle: data.couponBtnTitle,
                      couponNotice: data.couponNotice,
                      couponBtnUrl: data.couponBtnUrl,
                      couponEcommerceUrlName: data.couponEcommerceUrlName,
                      couponEcommerceUrl: data.couponEcommerceUrl,
                      couponEcommerceUrlSubTitle: data.couponEcommerceUrlSubTitle
                    }

                    this.quanData = Object.assign(this.quanData,callcenterData)
                    
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
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

                if (!result.couponGetLimit) {
                  result.couponGetLimit = 1
                }

                if (!result.couponUseLimit) {
                  result.couponUseLimit = 1
                }

                if (result.couponTransferOpt === '') {
                  result.couponTransferOpt = '0'
                }

                if (result.couponBeginTimestamp && result.couponEndTimestamp) {
                  this.couponTimes = [
                    new Date(result.couponBeginTimestamp * 1000),
                    new Date(result.couponEndTimestamp * 1000)
                  ]
                }

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
                interface: 'pruductCatalogList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    catalogType: 'pro'
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
                interface: 'pruductCatalogList',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    catalogType: 'pro'
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
        changeCouponIconUrl (data) {
          this.quanData.couponIconUrl = data.url
        },
        changeCouponDetailImg (data) {
          this.quanData.couponDetailImg = data.url
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

          if (!this.quanData.couponColor) {
            this.$message({
                message: '请选择券颜色！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponAbstract.length > 9) {
            this.$message({
                message: '券封面标题最多9个字！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponNotice) {
            this.$message({
                message: '请添加券封面标题！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponNotice.length > 16) {
            this.$message({
                message: '券封面标题最多16个字！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponDescription) {
            this.$message({
                message: '请添加券使用说明！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponDescription.length > 1000) {
            this.$message({
                message: '券使用说明最多1000个字！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponIconUrl) {
            this.$message({
                message: '请添加券logo！',
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