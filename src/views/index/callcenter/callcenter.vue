<template>
    <div class="form-discount callcenter">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="float-form-box" title="基本配置" name="1">
                <div class="formDiscount">
                    <section class="formBox bigF">
                        <span>客户接入欢迎词</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入"
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
                                placeholder="请输入"
                                v-model="callcenterData.reponseDelayInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序联系客服后，客服人员未能在X秒内响应，客户将收到等候提醒消息
                        </div>
                    </section>
                    <section class="formBox bigF">
                        <span>客服结束问候语</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入"
                                v-model="callcenterData.sessionCloseInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序内超过X秒没有输入消息，客户将受到结束问候
                        </div>
                    </section>
                    <section class="formBox">
                        <span>等候致歉时间(m)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.inbandResonseTime">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>客服电话</span>
                        <el-input
                                class="input-box"
                                type="tel"
                                v-model="callcenterData.servicePhone">
                        </el-input>
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
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="软文推广规则" name="2">
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
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="外呼规则" name="3">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>外呼间隔期</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandMinPeriod">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>外呼冷却期</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandCoolingMinPeriod">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="商机新建外呼规则" name="4">
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
                        <span>地推签到权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberOffllineSignRate">
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
                        <span>线上活动注册权重</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.memberOnlineEventSignRate">
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
                        <span>接触外呼观察期</span>
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
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="商机推进外呼规则" name="5">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>接触期外呼限制</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandEngagementLimit">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>预约期外呼限制</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandReserveLimit">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>体验期外呼限制</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.outbandTrailLimit">
                        </el-input>
                    </section>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="商机客户差异度计算规则" name="6">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>接触失败</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineEngagementFailRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>预约失败</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineReserveFailRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>体验失败</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.pipelineTrailFailRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>销售成功</span>
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
          <el-collapse-item class="float-form-box" title="外呼绩效计算规则" name="7">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>外呼积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userOutbandRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>预约积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userReserveRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>体验积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.userOfflineSignRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>考核周期</span>
                        <el-select
                          class="input-box"
                          v-model="callcenterData.outbandReviewPeriod"
                          filterable
                          placeholder="请选择">
                          <el-option
                            v-for="(item, index) in periodTypes"
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
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="地面推广绩效计算规则" name="8">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>到场人数积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.partySignRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>新增潜客积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.partyMemberRate">
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
                        <span>推广积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelSpreadRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>阅读积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelReadRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>新增潜客积分</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.adChannelMemberRate">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>评估周期</span>
                        <el-select
                          class="input-box"
                          v-model="callcenterData.adChannelReviewPeriod"
                          filterable
                          placeholder="请选择">
                          <el-option
                            v-for="(item, index) in periodTypes"
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
          <div class="line-bold"></div>
          <el-collapse-item class="float-form-box" title="优惠券基本信息设置" name="10">
                <div class="formDiscount">
                    <section class="formBox">
                        <span>微信券按钮标题</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponBtnTitle">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>微信券核销提示</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponNotice">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>微信券使用链接</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponBtnUrl">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>企业电商名称</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponEcommerceUrlName">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>企业电商提示</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponEcommerceUrlSubTitle">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>企业电商链接</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.couponEcommerceUrl">
                        </el-input>
                    </section>
                    <section class="formBox">
                      <span>微信券Logo</span>
                      <div class="input-box">
                        <upload :path="callcenterData.wechatCouponLogo"
                                :bg-path="true"
                                :is-operate="isEdit"
                                @changeImg="changeImg"></upload>
                      </div>
                    </section>
                    <section class="formBox">
                        <span>微信券时间类型</span>
                        <el-input
                                class="input-box"
                                :disabled="true"
                                v-model="callcenterData.wechatCouponDateRangeType">
                        </el-input>
                    </section>
                    <section class="formBox">
                        <span>微信券品牌</span>
                        <el-input
                                class="input-box"
                                v-model="callcenterData.wechatCouponBrand">
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
                // 软文推广规则
                pagePromotionOpt: '',
                commentReplayRule: '',
                // 外呼规则
                outbandMinPeriod: '',
                outbandCoolingMinPeriod: '',
                // 外呼筛选规则
                memberReadingRate: '',
                memberCommentRate: '',
                memberSharePageRate: '',
                memberShareWxappRate: '',
                memberCouponRate: '',
                memberOffllineSignRate: '',
                memberConsultingRate: '',
                memberOnlineEventSignRate: '',
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
                outbandReserveLimit: '',
                outbandTrailLimit: '',
                // 商机客户差异度计算规则
                pipelineEngagementFailRate: '',
                pipelineReserveFailRate: '',
                pipelineTrailFailRate: '',
                pipelineOrderRate: '',
                // 外呼绩效计算规则
                userOutbandRate: '',
                userReserveRate: '',
                userOfflineSignRate: '',
                outbandReviewPeriod: '',
                // 地面推广绩效计算规则
                partySignRate: '',
                partyMemberRate: '',
                // 微信推广渠道绩效计算规则
                adChannelSpreadRate: '',
                adChannelReadRate: '',
                adChannelMemberRate: '',
                adChannelReviewPeriod: '',
                // 优惠券基本信息设置
                couponBtnTitle: '',
                couponNotice: '',
                couponBtnUrl: '',
                couponEcommerceUrlName: '',
                couponEcommerceUrlSubTitle: '',
                couponEcommerceUrl: '',
                wechatCouponLogo: '',
                wechatCouponDateRangeType: '',
                wechatCouponBrand: ''
            },
            dispatchRules: [],
            periodTypes: [],
            commentReplayRule: []
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("callCenterColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }

        this.getTypes()
        this.getCallcenter()
        this.callcenterData.wechatCouponDateRangeType = 'DATE_TYPE_FIX_TIME_RANGE'
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    watch: {
      $route () {
        this.getCallcenter()
      }
    },
    methods: {
        collChange () {
            localStorage.setItem("callCenterColl", this.activeNames)
        },
        changeImg (data) {
          this.callcenterData.wechatCouponLogo = data.url
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
                        res.result.result.wechatCouponDateRangeType = 'DATE_TYPE_FIX_TIME_RANGE'
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