<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <div class="formDiscount">
              <section class="formBox btnB">
                  <span>企业工商名称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入标题，最多25个字"
                    @blur="checkCname"
                    v-model="base.enterpriseCname">
                  </el-input>
                  <div class="btn-box"
                      :class="base.enterpriseCname ? '' : 'noClick'"
                      @click="getEnterpriseInfo">查询</div>
              </section>

              <section class="formBox">
                  <span>企业简称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    @blur="checkReg"
                    v-model="base.enterpriseNameReg">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>企业类型</span>
                  <el-select class="input-box"
                            v-model="base.enterpriseType"
                            :disabled="true"
                            placeholder="请选择">
                      <el-option
                        v-for="item in enterpriseTypes"
                        :key="item.id"
                        :label="item.dictKeyValue"
                        :value="item.dictKeyCode">
                      </el-option>
                  </el-select>
              </section>

              <section class="formBox">
                  <span>企业法人</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseCorporateRep">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>公司税号</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseTaxNo">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>结算银行</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseBank">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>银行账号</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseBankAccount">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>公司网站</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseWeb">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>快递城市</span>
                  <el-select v-model="base.enterpriseAddrCity"
                              class="input-box"
                              @change="cityChange"
                              filterable placeholder="请选择">
                      <el-option
                              :label="'无'"
                              :value="''">
                      </el-option>
                      <el-option
                        v-for="(item, index) in cityData"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                  </el-select>
              </section>

              <section class="formBox">
                  <span>邮政编码</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    :disabled="true"
                    v-model="base.enterpriseZipCode">
                  </el-input>
              </section>

              <section class="formBox bigF">
                  <span>具体地址</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseAddrDetail">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>企业编码</span>
                  <el-input
                    class="input-box"
                    placeholder="非手添项"
                    :disabled="true"
                    v-model="base.enterpriseCode">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>超级管理员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    @blur="checkTel"
                    v-model="base.userMobile">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>企业职务</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.userPosition">
                  </el-input>
              </section>

              <section class="formBox">
                <span>企业LOGO</span>
                <div class="input-box">
                  <upload :path="base.enterpriseLogo"
                          :bg-path="true"
                          :is-operate="isOperate"
                          @changeImg="changeImg"></upload>
                </div>
              </section>
              
              <div class="clear"></div>
              <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
              @click="saveBase">保存</el-button>
            </div>
          </el-collapse-item>
          <!-- 财务信息 -->
          <template v-if="base.enterpriseCode">
            <div class="line-bold"></div>
            <el-collapse-item class="float-form-box" title="微信信息配置" name="2">
              <div class="formDiscount">
                <!-- <div class="add-btn">
                  <el-button type="primary"
                            size="small"
                            :icon="isPlatformPub ? 'check' : 'close'"
                            @click="getPlatformPub">使用平台微信服务号</el-button>
                  <el-button type="primary"
                            size="small"
                            :icon="isPlatformWechat ? 'check' : 'close'"
                            @click="getPlatformWechat">使用平台企业微信</el-button>
                </div> -->

                <section class="formBox">
                    <span>企业微信ID</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformWechat"
                      v-model="enterpriseWechat.enterpriseWechatCorpId">
                    </el-input>
                </section>
                <section class="formBox">
                    <span>微信服务号</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatAccount">
                    </el-input>
                </section>

                <section class="formBox">
                    <span>服务号名称</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatCname">
                    </el-input>
                </section>
                <section class="formBox">
                    <span>服务号APPID</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatAppId">
                    </el-input>
                </section>
                <section class="formBox">
                    <span>服务号secret</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatSecret">
                    </el-input>
                </section>

                <section class="formBox">
                    <span>接收消息密钥</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatReceiverSecret">
                    </el-input>
                </section>
                <section class="formBox">
                    <span>接收消息令牌</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      :disabled="isPlatformPub"
                      v-model="enterpriseWechat.pubWechatReceiverToken">
                    </el-input>
                </section>

                <section class="clear"></section>

                <section class="formBox">
                    <span>企业微信LOGO</span>
                    <div class="input-box">
                      <upload :path="enterpriseWechat.enterpriseWechatLogo"
                              :bg-path="true"
                              :id-name="'qywxlogo'"
                              :is-operate="isOperate && !isPlatformWechat"
                              @changeImg="changeImgQL"></upload>
                    </div>
                </section>
                <section class="formBox">
                    <span>服务号LOGO</span>
                    <div class="input-box">
                      <upload :path="enterpriseWechat.pubWechatLogo"
                              :bg-path="true"
                              :id-name="'fwhlogo'"
                              :is-operate="isOperate && !isPlatformPub"
                              @changeImg="changeImgFL"></upload>
                    </div>
                </section>
                <section class="formBox">
                    <span>服务号二维码</span>
                    <div class="input-box">
                      <upload :path="enterpriseWechat.pubWechatQrcode"
                              :bg-path="true"
                              :id-name="'fuhewm'"
                              :is-operate="isOperate && !isPlatformPub"
                              @changeImg="changeImgFE"></upload>
                    </div>
                </section>

                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveWechat">保存</el-button>
              </div>
            </el-collapse-item>
          </template>
          <!-- 管理员 -->
          <template v-if="enterpriseWechat.id">
            <div class="line-bold"></div>
            <el-collapse-item class="float-form-box" title="服务管理" name="3">
              <div class="formDiscount">
                <template v-for="(item, index) in productEventList">
                  <section class="formBox">
                      <span class="font-b">{{item.productInfo.productCname}}</span>
                  </section>
                  <section class="formBox">
                      <span>Agent ID</span>
                      <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        :disabled="item.productStatus1 == '1'"
                        v-model="item.enterpriseWechatAgentid">
                      </el-input>
                  </section>
                  <section class="formBox">
                      <span>Secret</span>
                      <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        :disabled="item.productStatus1 == '1'"
                        v-model="item.enterpriseWechatAgentSecret">
                      </el-input>
                  </section>
                  <section class="formBox">
                      <div class="btn-right-box">
                        <el-tooltip class="item" effect="dark" :content="item.productPrice.priceDesc" placement="top">
                          <el-button>服务费用说明</el-button>
                        </el-tooltip>
                        
                        <el-button class="btn-right" type="primary" size="small" @click="setOrder(item)">
                          {{item.productStatus1 == '1' ? '关闭' : '开通'}}
                        </el-button>
                      </div>
                  </section>
                </template>

                <template v-if="!productEventList.length">
                  <div class="null-page-box">
                      请您先去
                      <router-link :to="{
                        name: 'product',
                        query:{
                          enterpriseCode: $route.query.enterpriseCode
                        }
                      }">
                          <el-button type="text">添加产品</el-button>
                      </router-link>
                      !!!
                  </div>
                </template>
                
                <div class="clear"></div>
                <!-- <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveBase">保存</el-button> -->
              </div>
            </el-collapse-item>
          </template>
        </el-collapse>

        <el-dialog
            title="手机验证"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-check-tel">
                <section>
                    <span>手机</span>
                    <el-input placeholder="请输入内容" :disabled="true" v-model="base.userMobile"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" v-model="checkData.code">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox clickBox" @click="getCode">获取验证码</span>
                        </template>
                    </el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkTelphone">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import $ from 'Jquery'
import upload from '../../../components/common/upload'

export default {
    data () {
        return {
            isOperate: true,
            activeNames: [],
            enterpriseCname: '',
            isCheckCname: true,
            enterpriseNameReg: '',
            isCheckReg: true,
            isCheckTel: true,
            userMobile: '',
            base: {
              enterpriseAddrCity: '',
              enterpriseAddrDetail: '',
              enterpriseBank: '',
              enterpriseBankAccount: '',
              enterpriseCname: '',
              enterpriseCode: '',
              enterpriseCorporateRep: '',
              enterpriseIndustry: '',
              enterpriseInvoiceTitle: '',
              enterpriseInvoiceType: '',
              enterpriseLogo: '',
              enterpriseNameReg: '',
              enterprisePlatformSales: '',
              enterpriseRegDate: '',
              enterpriseScale: '',
              enterpriseStatus: '',
              enterpriseTaxNo: '',
              enterpriseZipCode: '',
              enterpriseType: 'enterprise_type_0',
              enterpriseWeb: '',
              userMobile: '',
              userPosition: ''
            },
            isPlatformPub: false,
            isPlatformWechat: false,
            platformWechat: {
              enterpriseWechatCorpId: '',
              enterpriseWechatLogo: ''
            },
            platformPub: {
              pubWechatAccount: '',
              pubWechatCname: '',
              pubWechatAppId: '',
              pubWechatSecret: '',
              pubWechatReceiverSecret: '',
              pubWechatReceiverToken: '',
              pubWechatLogo: '',
              pubWechatQrcode: ''
            },
            enterpriseWechat: {
              enterpriseWechatCorpId: '',
              enterpriseWechatLogo: '',
              pubWechatAccount: '',
              pubWechatCname: '',
              pubWechatAppId: '',
              pubWechatSecret: '',
              pubWechatReceiverSecret: '',
              pubWechatReceiverToken: '',
              pubWechatLogo: '',
              pubWechatQrcode: ''
            },
            enterpriseTypes: [],
            cityData: [],
            postList: [],
            // 手机验证
            dialogVisible: false,
            checkData: {
                code: ''
            },
            timer: null,
            seconds: 90,
            productEventList: []
        }
    },
    mounted () {
      var surveyColl = localStorage.getItem("enterpriseColl")
      if (surveyColl) {
          this.activeNames = surveyColl.split(',')
      }
      if (this.$route.query.enterpriseCode) {
        this.getBase()
        this.getEnterpriseWechat()
        this.getProductAndEvent()
      }
      
      this.getEnterpriseTypes()
      this.getCitys()
    },
    methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        checkCname () {
          if (this.base.enterpriseCname === this.enterpriseCname || this.base.enterpriseCname === '') {
            return false
          }

          util.request({
              method: 'get',
              interface: 'checkName',
              data: {
                  enterpriseCname: this.base.enterpriseCname
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  if (res.result.result == '1') {
                    this.isCheckCname = true
                  } else {
                    this.isCheckCname = false
                    this.$message({
                      message: '该企业已被注册过，不能重复注册!',
                      type: 'warning'
                    })
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getEnterpriseInfo () {
          if (this.base.enterpriseCname === '') {
            this.$message({
              message: '请填写企业工商名称!',
              type: 'warning'
            })
            return false
          }

          util.request({
              method: 'get',
              interface: 'enterpriseQCCGet',
              data: {
                  enterpriseCname: this.base.enterpriseCname
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  var data = res.result.result
                  if (data) {
                    var enterpriseData = {
                      enterpriseBank: data.enterpriseBank,
                      enterpriseBankAccount: data.enterpriseBankAccount,
                      enterpriseTaxNo: data.enterpriseTaxNo,
                      enterpriseCorporateRep: data.enterpriseCorporateRep
                    }

                    this.base = Object.assign(this.base, enterpriseData)
                  } else {
                    this.$message({
                      message: '该企业不存在!',
                      type: 'warning'
                    })
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        checkReg () {
          if (this.base.enterpriseNameReg === this.enterpriseNameReg || this.base.enterpriseNameReg === '') {
            return false
          }

          util.request({
              method: 'get',
              interface: 'checkName',
              data: {
                  enterpriseNameReg: this.base.enterpriseNameReg
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  if (res.result.result == '1') {
                    this.isCheckReg = true
                  } else {
                    this.isCheckReg = false
                    this.$message({
                      message: '该企业简称已被其它使用!',
                      type: 'warning'
                    })
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        checkTel () {
          if (this.base.userMobile === this.userMobile || this.base.userMobile === '') {
            return false
          }

          if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.base.userMobile.trim())) {
              this.$message({
                message: '请输入正确手机号!',
                type: 'warning'
              })
          } else {
              this.dialogVisible = true
          }
        },
        getCode () {
            util.request({
                method: 'get',
                interface: 'getValidateCode',
                data: {
                    mobile: this.base.userMobile
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.timer = setInterval(() => {
                        this.seconds--
                        if (this.seconds === 0) {
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    }, 1000)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        checkTelphone () {
          util.request({
                method: 'get',
                interface: 'valiSmsPass',
                data: {
                    mobile: this.base.userMobile,
                    smsContent: this.checkData.code
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    if (res.result.result == '1') {
                      this.isCheckTel = true
                      this.dialogVisible = false
                      this.checkData.code = ''
                      clearInterval(this.timer)
                      this.timer = null
                    } else {
                      this.isCheckTel = false
                      this.$message({
                        message: '手机验证码不正确!',
                        type: 'warning'
                      })
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'showEnterpriseInfo',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  this.base = res.result.result
                  this.enterpriseCname = this.base.enterpriseCname
                  this.enterpriseNameReg = this.base.enterpriseCname
                  this.userMobile = this.base.userMobile
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getPlatformWechat () {
          if (this.platformWechat.id) {
            if (this.isPlatformWechat) {
              this.isPlatformWechat = false

              var platformWechat = {
                pubWechatAccount: '',
                pubWechatCname: '',
                pubWechatAppId: '',
                pubWechatSecret: '',
                pubWechatReceiverSecret: '',
                pubWechatReceiverToken: '',
                pubWechatLogo: '',
                pubWechatQrcode: ''
              }

              this.enterpriseWechat = Object.assign(this.enterpriseWechat, platformWechat)
            } else {
              this.isPlatformWechat = true
              this.enterpriseWechat = Object.assign(this.enterpriseWechat, this.platformWechat)
            }
            return
          }

          util.request({
              method: 'get',
              interface: 'platfromEnterpriseWechatInfo',
              data: {}
          }).then((res) => {
              if (res.result.success == '1') {
                  if (res.result.result) {
                    this.platformWechat = res.result.result
                    this.isPlatformWechat = true
                    this.enterpriseWechat = Object.assign(this.enterpriseWechat, this.platformWechat)
                  } else {
                    this.$message.error('查询错误！')
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getPlatformPub () {
          if (this.platformPub.id) {
            if (this.isPlatformPub) {
              this.isPlatformPub = false

              var platformPub = {
                pubWechatAccount: '',
                pubWechatCname: '',
                pubWechatAppId: '',
                pubWechatSecret: '',
                pubWechatReceiverSecret: '',
                pubWechatReceiverToken: '',
                pubWechatLogo: '',
                pubWechatQrcode: ''
              }

              this.enterpriseWechat = Object.assign(this.enterpriseWechat, platformPub)
            } else {
              this.isPlatformPub = true
              this.enterpriseWechat = Object.assign(this.enterpriseWechat, this.platformPub)
            }
            
            return
          }

          util.request({
              method: 'get',
              interface: 'platformPubWechatInfo',
              data: {}
          }).then((res) => {
              if (res.result.success == '1') {
                  if (res.result.result) {
                    this.platformPub = res.result.result
                    this.isPlatformPub = true
                    this.enterpriseWechat = Object.assign(this.enterpriseWechat, this.platformPub)
                  } else {
                    this.$message.error('查询错误！')
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getEnterpriseWechat () {
          util.request({
              method: 'get',
              interface: 'platfromWechatInfo',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  if (res.result.result) {
                    this.enterpriseWechat = res.result.result
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getEnterpriseTypes () {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: 'enterprise_type'
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  this.enterpriseTypes = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getProductAndEvent () {
          util.request({
              method: 'get',
              interface: 'selectProductAndEvent',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  this.productEventList = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getCitys () {
            util.request({
                method: 'get',
                interface: 'getCitys',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    var citys = []
                    var posts = []

                    res.result.results.forEach((item) => {
                        citys = citys.concat(item.citys)
                        posts = posts.concat(item.posts)
                    })

                    this.cityData = citys
                    this.postList = posts
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        cityChange () {
            for (var i = 0, len = this.cityData.length; i < len; i++) {
                if (this.cityData[i] == this.base.enterpriseAddrCity) {
                    this.base.enterpriseZipCode = this.postList[i]
                    break
                }
            }
        },
        collChange () {
            localStorage.setItem("enterpriseColl", this.activeNames)
        },
        changeImg (data) {
          this.base.enterpriseLogo = data.url
        },
        changeImgQL (data) {
          this.enterpriseWechat.enterpriseWechatLogo = data.url
        },
        changeImgFL (data) {
          this.enterpriseWechat.pubWechatLogo = data.url
        },
        changeImgFE (data) {
          this.enterpriseWechat.pubWechatQrcode = data.url
        },
        saveBase () {
          if (this.base.enterpriseCname == '') {
              this.$message({
                message: '请填写企业工商名称!',
                type: 'warning'
              })
              return false
          }

          if (!this.isCheckCname) {
            this.$message({
              message: '该企业已被注册过，不能重复注册!',
              type: 'warning'
            })
            return false
          }

          if (!this.isCheckReg) {
            this.$message({
              message: '该企业简称已被其它使用!',
              type: 'warning'
            })
            return false
          }

          if (this.base.enterpriseCname == '') {
              this.$message({
                message: '请填写企业简称!',
                type: 'warning'
              })
              return false
          }

          if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.base.userMobile.trim())) {
              this.$message({
                message: '请填写正确格式超级管理员!',
                type: 'warning'
              })
              return false
          }

          if (this.base.enterpriseWeb == '') {
              this.$message({
                message: '请填写公司网站!',
                type: 'warning'
              })
              return false
          }

          if (!this.isCheckTel) {
            this.dialogVisible = true
            return false
          }

          util.request({
              method: 'post',
              interface: 'enterpriseBaseInfoSave',
              data: this.base
          }).then((res) => {
              if (res.result.success == '1') {
                  this.$message({
                    message: '恭喜你，保存成功!',
                    type: 'success'
                  })

                  if (this.$route.query.enterpriseCode) {
                    this.getBase()
                  } else {

                    window.location.replace('/enterprise/enterpriseDetail?enterpriseCode=' + res.result.result)
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        saveWechat () {
          if (this.enterpriseWechat.enterpriseWechatCorpId == '') {
              this.$message({
                message: '请填写企业微信ID!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.enterpriseWechatCorpId == '') {
              this.$message({
                message: '请填写微信服务号!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatCname == '') {
              this.$message({
                message: '请填写服务号名称!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatAppId == '') {
              this.$message({
                message: '请填写服务号APPID!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatSecret == '') {
              this.$message({
                message: '请填写服务号secret!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatReceiverSecret == '') {
              this.$message({
                message: '请填写接收消息密钥!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatReceiverToken == '') {
              this.$message({
                message: '请填写接收消息令牌!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.enterpriseWechatLogo == '') {
              this.$message({
                message: '请填加企业微信LOGO!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatLogo == '') {
              this.$message({
                message: '请填加服务号LOGO!',
                type: 'warning'
              })
              return false
          }

          if (this.enterpriseWechat.pubWechatQrcode == '') {
              this.$message({
                message: '请填加服务号二维码!',
                type: 'warning'
              })
              return false
          }

          this.enterpriseWechat.enterpriseCode = this.$route.query.enterpriseCode
          this.enterpriseWechat.isPlatformPub = 1

          util.request({
              method: 'post',
              interface: 'enterpriseWechatInfoSave',
              data: this.enterpriseWechat
          }).then((res) => {
              if (res.result.success == '1') {
                  this.$message({
                    message: '恭喜你，保存成功!',
                    type: 'success'
                  })

                  this.getEnterpriseWechat()
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        setOrder (item) {
          var formData = {
            isPlatformPub: '1',
            enterpriseCode: this.$route.query.enterpriseCode,
            platformProductCode: item.productInfo.productCode,
            orderQuotation: item.productPrice.productPrice,
            orderPriceRule: item.productPrice.priceDesc,
            orderCode: item.orderCode,
            enterpriseWechatAgentid: item.enterpriseWechatAgentid,
            enterpriseWechatAgentSecret: item.enterpriseWechatAgentSecret,
            enterpriseWechatAgentDesc: item.productInfo.productDesc,
            enterpriseWechatAgentCname: item.productInfo.productCname,
            enterpriseWechatAppHomepage: item.productInfo.productSku,
            platformProductName: item.productInfo.productSku,
            enterpriseWechatCorpid: this.enterpriseWechat.enterpriseWechatCorpId,
            enterpriseWechatMessageToken: this.enterpriseWechat.pubWechatReceiverToken,
            enterpriseWechatMessageAESKey: this.enterpriseWechat.pubWechatReceiverSecret
          }

          var interfaceName = 'enterpriseOrderStart'

          if (item.productStatus1 == '1') {
            interfaceName = 'enterpriseOrderStop'
            formData = {
              isPlatformPub: '1',
              enterpriseCode: this.$route.query.enterpriseCode,
              orderCode: item.orderCode
            }
          }

          util.request({
              method: 'post',
              interface: interfaceName,
              data: formData
          }).then((res) => {
              if (res.result.success == '1') {
                  this.$message({
                    message: '恭喜你，操作成功!',
                    type: 'success'
                  })

                  this.getProductAndEvent()
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
.null-page-box {
    text-align: center;
    font-size: 14px;
    line-height: 80px;
    color: #999999;
    padding-top: 20px;
}

.form-check-tel {
  section {
    position: relative;
    height: 36px;
    padding-left: 60px;
    margin-bottom: 15px;

    .el-input-group__append {
      background-color: #20a0ff;
      border: 1px solid #20a0ff;
      color: #f0f0f0;
    }

    &>span {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 40px;
      line-height: 36px;
    }

    .secondBox {
      color: #ffffff;
    }

    .clickBox {
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>