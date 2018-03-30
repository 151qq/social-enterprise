<template>
    <div class="form-discount callcenter">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <!-- <el-collapse-item class="float-form-box" title="基本配置" name="1">
                <div class="formDiscount">
                    <section class="formBox bigF">
                        <span>客户接入欢迎词</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多15个字"
                                :maxlength="15"
                                v-model="callcenterData.sessionOpenInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序联系客服时，客户将收到的第一个欢迎消息，最长不超过15个字
                        </div>
                    </section>
                    <section class="formBox bigF">
                        <span>等候致歉语</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多40个字"
                                :maxlength="40"
                                v-model="callcenterData.reponseDelayInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序联系客服后，客服人员未能在45秒内响应，客户将收到等候提醒消息
                        </div>
                    </section>
                    <section class="formBox bigF">
                        <span>客服结束问候语</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多40个字"
                                :maxlength="40"
                                v-model="callcenterData.sessionCloseInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序内超过30秒没有输入消息，客户将受到结束问候
                        </div>
                    </section>
                    <section class="formBox">
                        <span>客服电话</span>
                        <div class="input-box">
                            <input class="input-box el-input__inner"
                                    maxlength="15" 
                                    @input="telChange"
                                    v-model="callcenterData.servicePhone">
                        </div>
                    </section>
                    <section class="formBox">
                        <span>客服分配模式</span>
                        <el-select
                          class="input-box"
                          v-model="callcenterData.callcenterDispatchRule"
                          filterable
                          placeholder="请选择">
                          <el-option
                            v-for="(item, index) in dispatchRules"
                            :key="index"
                            :label="item.dicValue"
                            :value="item.dicKey">
                          </el-option>
                        </el-select>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div> -->
          <el-collapse-item class="float-form-box" title="营销推广规则" name="2">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>全员推广</span>
                        <div class="input-box">
                          <el-switch
                            v-model="callcenterData.pagePromotionOpt"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            on-value="1"
                            off-value="0">
                          </el-switch>
                        </div>
                    </section>
                    <section class="formBox">
                        <span>业绩承认规则</span>
                        <el-select
                          class="input-box"
                          v-model="callcenterData.incentiveCreditRule"
                          filterable
                          placeholder="请选择">
                          <el-option
                            v-for="(item, index) in incentiveCreditRule"
                            :key="index"
                            :label="item.key"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </section>
                    <section class="formBox">
                        <span>评论回复</span>
                        <el-select
                          class="input-box"
                          v-model="callcenterData.commentReplayRule"
                          filterable
                          placeholder="请选择">
                          <el-option
                            v-for="(item, index) in commentReplayRule"
                            :key="index"
                            :label="item.dicValue"
                            :value="item.dicKey">
                          </el-option>
                        </el-select>
                    </section>
                    <section class="formBox">
                        <span>外呼间隔期(天)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandMinPeriod">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>外呼冷却期(天)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandCoolingMinPeriod">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>会员营销周期(天)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.promotionMinPeriod">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="商机推进规则" name="5">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>阅读权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberReadingRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>评论权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberCommentRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>分享文章权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberSharePageRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>分享小程序权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberShareWxappRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>领券权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberCouponRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>主动咨询权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberConsultingRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>小程序使用权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberOpenWxappRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>外呼观察期(天)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandComputePeriod">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>接触外呼阈值</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineCreateRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>外呼限制</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandEngagementLimit">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>体验限制</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.trailLimit">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>接触失败(减分)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineEngagementFailRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>体验失败(减分)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineTrailFailRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>销售成功(加分)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineOrderRate">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="销售绩效计算规则" name="7">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>传播积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userReadingRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>新会员积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userNewMemberRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>销售积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userSellRate">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="微信推广渠道绩效计算规则" name="9">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>阅读积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelReadRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>新会员积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelMemberRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>会员消费积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelSellRate">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="优惠券基本信息设置" name="10">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>微信券按钮标题</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多6个字"
                                :maxlength="6"
                                v-model="callcenterData.couponCenterTitle">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>微信券核销提示</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多15个字"
                                :maxlength="15"
                                v-model="callcenterData.couponNotice">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>微信券时间类型</span>
                        <el-input
                                class="input-box"
                                :disabled="true"
                                v-model="callcenterData.couponDateRangeType">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>企业品牌</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多12个字"
                                :maxlength="12"
                                v-model="callcenterData.couponBrandName">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>券颜色</span>
                        <el-select class="input-box"
                                    v-model="callcenterData.couponColor"
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
                        <span>券详情提示</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多8个字"
                                :maxlength="8"
                                v-model="callcenterData.couponAbstract">
                        </el-input>
                    </section>
                    <section class="formBox">
                      <span>微信券Logo</span>
                      <div class="input-box">
                          <div class="logo-upload">
                            <upload :path="callcenterData.couponLogoUrl"
                                    :bg-path="true"
                                    :is-operate="isEdit"
                                    @changeImg="changeImg"></upload>
                          </div>
                      </div>
                    </section>
                    <section class="formBox">
                        <span>电商链接</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponEcommerceUrl">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="文章模板" name="11">
              <template-list></template-list>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import templateList from './formAlist/templateList'
import upload from '../../../components/common/uploadFile'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            activeNames: [],
            callcenterData: {
                enterpriseCode: '',
                sessionOpenInfo: '',
                reponseDelayInfo: '',
                sessionCloseInfo: '',
                inbandResonseTime: '',
                servicePhone: '',
                callcenterDispatchRule: '',
                // 营销推广规则
                pagePromotionOpt: '1',
                commentReplayRule: '',
                incentiveCreditRule: '1',
                // 外呼规则
                outbandMinPeriod: '',
                outbandCoolingMinPeriod: '',
                promotionMinPeriod: '',
                // 外呼筛选规则
                memberReadingRate: '',
                memberCommentRate: '',
                memberSharePageRate: '',
                memberShareWxappRate: '',
                memberCouponRate: '',
                memberConsultingRate: '',
                memberOpenWxappRate: '',
                memberReserveRate: '',
                memberTrialGoodResultRate: '',
                memberOpenOfflineSurveyRate: '',
                memberOrderRate: '',
                memberOpenServiceSurveyRate: '',
                outbandBeginRate: '',
                outbandComputePeriod: '',
                pipelineCreateRate: '',
                // 商机推进外呼规则
                outbandEngagementLimit: '',
                trailLimit: '',
                // 商机客户差异度计算规则
                pipelineEngagementFailRate: '',
                pipelineTrailFailRate: '',
                pipelineOrderRate: '',
                // 销售绩效计算规则
                userOutbandRate: '',
                userReserveRate: '',
                userOfflineSignRate: '',
                userReadingRate: '',
                userNewMemberRate: '',
                userSellRate: '',
                outbandReviewPeriod: '',
                // 地面推广绩效计算规则
                partySignRate: '',
                partyMemberRate: '',
                // 微信推广渠道绩效计算规则
                adChannelSpreadRate: '',
                adChannelReadRate: '',
                adChannelMemberRate: '',
                adChannelSellRate: '',
                adChannelTrailRate: '',
                adChannelReviewPeriod: '',
                // 优惠券基本信息设置
                couponCenterTitle: '',
                couponNotice: '',
                couponBtnUrl: '',
                couponDateRangeType: '',
                couponBrandName: '',
                couponColor: '',
                couponAbstract: '',
                couponLogoUrl: '',
                couponEcommerceUrl: ''
            },
            dispatchRules: [],
            periodTypes: [],
            commentReplayRule: [],
            incentiveCreditRule: [
                {
                    value: '1',
                    key: '销售和推广会员双重承认业绩'
                },
                {
                    value: '0',
                    key: '销售和推广会员单独核算业绩'
                }
            ],
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
            ]
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("callCenterColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }

        this.getTypes()
        this.getCallcenter()
        this.callcenterData.couponDateRangeType = 'DATE_TYPE_FIX_TIME_RANGE'
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        },
        reponseDelayInfoNum () {
          return 40 - this.callcenterData.reponseDelayInfo.length
        },
        sessionCloseInfoNum () {
          return 40 - this.callcenterData.sessionCloseInfo.length
        }
    },
    watch: {
      $route () {
        this.getCallcenter()
      }
    },
    methods: {
        telChange () {
            this.callcenterData.servicePhone = this.callcenterData.servicePhone.replace(/[^\d]/g, '')
        },
        collChange () {
            localStorage.setItem("callCenterColl", this.activeNames)
        },
        changeImg (data) {
          this.callcenterData.couponLogoUrl = data.url
        },
        getCallcenter () {
            util.request({
                method: 'get',
                interface: 'findCallCenterConfig',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    if (res.result.result.id) {
                        res.result.result.couponDateRangeType = 'DATE_TYPE_FIX_TIME_RANGE'
                        this.callcenterData = res.result.result
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'getEnterpriseConfigDic',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.dispatchRules = res.result.result.dispatchRule
                    this.periodTypes = res.result.result.reviewPeriod
                    this.commentReplayRule = res.result.result.commentReplayRule
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveCallcenter () {    
          if (this.callcenterData.id) {
            this.updateCallCenter()
          } else {
            this.callcenterData.enterpriseCode = this.$route.query.enterpriseCode
            this.insertCallCenter()
          }
          
        },
        insertCallCenter () {
          util.request({
              method: 'post',
              interface: 'insertCallCenterConfig',
              data: this.callcenterData
          }).then(res => {
              if (res.result.success == '1') {
                    this.getCallcenter()
                    this.$message({
                        message: '恭喜你！保存成功',
                        type: 'success'
                    })
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        updateCallCenter () {
          util.request({
              method: 'post',
              interface: 'updateCallCenterConfig',
              data: this.callcenterData
          }).then(res => {
              if (res.result.success == '1') {
                    this.getCallcenter()
                    this.$message({
                        message: '恭喜你！保存成功',
                        type: 'success'
                    })
              } else {
                  this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
      templateList,
      upload
    }
}
</script>
<style lang="scss">
.callcenter {
  .mess-box {
    line-height: 24px;
    font-size: 12px;
    padding-left: 120px;
    color: #333333;
  }

  .formDiscount .formBox {
      &>span {
          width: 120px;
      }

      .input-box {
          float: left;
          width: 200px;

          .el-select {
              width: 200px;
          }
      }
  }

  .formDiscount .bigF {
      .input-box {
          width: 880px;

          .el-select {
              width: 880px;
          }
      }

      .el-textarea {
        width: 880px;
      }
  }
}
</style>