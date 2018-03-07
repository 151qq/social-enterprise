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
                    :disabled="!!$route.query.enterpriseCode"
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
                  <div class="input-btn-box">
                    <el-input
                      class="input-b"
                      placeholder="请输入内容"
                      @blur="checkUserName"
                      v-model="base.userName">
                    </el-input>

                    <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="hasTel"
                              @click="checkName">验证</el-button>
                  </div>
                  
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
                  <div class="logo-upload">
                    <upload :path="base.enterpriseLogo"
                            :bg-path="true"
                            :is-operate="isOperate"
                            @changeImg="changeImg"></upload>
                  </div>
                </div>
              </section>

              <section class="formBox" v-if="base.enterpriseWechatQrcode">
                  <span>企业微信二维码</span>
                  <div class="input-box">
                    <div class="logo-upload">
                      <upload :path="base.enterpriseWechatQrcode"
                              :bg-path="true"
                              :is-operate="false"></upload>
                    </div>
                  </div>
              </section>
              
              <div class="clear"></div>
              <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
              @click="saveBase">保存</el-button>
            </div>
          </el-collapse-item>
          <!-- 管理员 -->
          <template v-if="enterpriseWechat.id">
            <div class="line-bold"></div>
            <el-collapse-item class="float-form-box" title="服务管理" name="3">
              <div class="formDiscount">
                <template v-for="(item, index) in productEventList">
                  <section class="formBox">
                      <span class="font-b">{{item.productInfo.productCname}}</span>
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
                      暂无服务!!!
                  </div>
                </template>
                
                <div class="clear"></div>
              </div>
            </el-collapse-item>
          </template>
          <template v-if="enterpriseWechat.id">
            <div class="line-bold"></div>
            <el-collapse-item class="float-form-box" title="员工管理" name="4">
              <user-list></user-list>
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
                    <el-input placeholder="请输入内容" @input="checkTel" v-model="base.userMobile"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" v-model="checkData.code">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox clickBox" :class="{clickBox: isClick}" @click="getCode">获取验证码</span>
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
import userList from './formAlist/userList'

export default {
    data () {
        return {
            isOperate: true,
            activeNames: ['1'],
            enterpriseCname: '',
            isCheckCname: true,
            enterpriseNameReg: '',
            isCheckReg: true,
            isCheckTel: false,
            hasTel: false,
            userName: '',
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
              enterpriseType: 'enterprise_type_100',
              enterpriseWeb: '',
              userName: '',
              userMobile: '',
              userPosition: '',
              enterpriseWechatQrcode: ''
            },
            isPlatformPub: false,
            isPlatformWechat: false,
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
              pubWechatQrcode: '',
              enterpriseWechatAgentCname: '',
              enterpriseWechatAgentid: '',
              enterpriseWechatAgentSecret: ''
            },
            enterpriseTypes: [],
            cityData: [],
            postList: [],
            // 手机验证
            isClick: false,
            dialogVisible: false,
            checkData: {
                code: ''
            },
            timer: null,
            seconds: 90,
            productEventList: [],
            isPost: false
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
                    this.enterpriseCname = this.base.enterpriseCname
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
                    this.enterpriseNameReg = this.base.enterpriseNameReg
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
        checkUserName () {
          if (this.userName != '' && this.base.userName == this.userName) {
            this.hasTel = true
          } else {
            this.hasTel = false
          }
        },
        checkName () {
          if (this.isCheckTel) {
            return false
          }

          if (this.base.userName == '') {
              this.$message({
                message: '请先填写超级管理员!',
                type: 'warning'
              })
              return false
          }

          this.dialogVisible = true
        },
        checkTel () {
          if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.base.userMobile.trim())) {
              this.isClick = false
          } else {
              this.isClick = true
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
                            this.seconds = 90
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
                      this.userName = this.base.userName
                      this.isCheckTel = true
                      this.hasTel = true
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
                  this.userName = this.base.userName
                  this.isCheckTel = true
                  this.hasTel = true
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
        saveBase () {
          if (this.isPost) {
            return false
          }

          if (this.base.enterpriseCname && !this.isCheckCname) {
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

          if (this.base.enterpriseNameReg == '') {
              this.$message({
                message: '请填写企业简称!',
                type: 'warning'
              })
              return false
          }

          if (this.base.userName == '') {
              this.$message({
                message: '请填写超级管理员!',
                type: 'warning'
              })
              return false
          }

          if (/[^\u4e00-\u9fa5]/.test(this.base.userName)) {
            this.$message({
                message: '超级管理员请输入中文名字!',
                type: 'warning'
              })
              return false
          }

          if ((this.userName == '' || this.base.userName !== this.userName) && !this.isCheckTel) {
            this.$message({
              message: '请验证手机号!',
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

          if (this.base.enterpriseWeb.indexOf('http') > -1) {
              this.$message({
                message: '不需要填写http(s)://!',
                type: 'warning'
              })
              return false
          }

          this.isPost = true

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

                    window.location.replace('/enterprise?enterpriseCode=' + res.result.result)
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        setOrder (item) {
          var formData = {
            enterpriseCode: this.$route.query.enterpriseCode,
            enterpriseType: this.base.enterpriseType,
            platformProductCode: item.productInfo.productCode,
            orderQuotation: item.productPrice.productPrice,
            orderPriceRule: item.productPrice.priceDesc,
            orderCode: item.orderCode,
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
      upload,
      userList
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