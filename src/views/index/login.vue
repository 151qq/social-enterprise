<template>
    <div class="wrap">
        <img class="bg-img-box" v-if="bgPath" :src="bgPath">
        <div class="loginBox">
            <div class="login-title">
                密码登录
            </div>
            <div class="login-mess">{{platformMess}}</div>
            <div class="login-box">
                <el-input class="login-input" v-model="userLoginAccount" placeholder="用户名／手机"></el-input>
                <el-input class="login-input" v-model="userPassword" type="password" placeholder="密码"></el-input>
                <el-button :disabled="!isUse"
                            class="login-btn"
                            type="primary"
                            @click="subBtn">平台登录</el-button>
                <div class="forget-p" v-if="isUse">
                    <span @click="forgetPassword">忘记密码</span>
                    <span @click="gotoRegistor">注册企业</span>
                </div>
            </div>
        </div>
        <div class="message-box">
            <div class="mess-title">{{bgTitle}}</div>
            <div class="mess-content">{{bgDesc}}</div>
        </div>
        <el-dialog
            title="忘记密码"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-b">
                <section>
                    <span>手机</span>
                    <el-input placeholder="请输入内容" v-model="forgetData.tel" @input="checkTel"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" v-model="codeInput">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox" :class="{clickBox: isClick}" @click="getCode">获取验证码</span>
                        </template>
                    </el-input>
                </section>
                <section>
                    <span>新密码</span>
                    <el-input placeholder="请输入内容" type="password" v-model="forgetData.password"></el-input>
                </section>
                <section>
                    <span>确认密码</span>
                    <el-input placeholder="请输入内容" type="password" v-model="enterPassword"></el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updaetPassword">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import $ from 'Jquery'
    export default {
        name: 'index',
        data() {
            return {
                userLoginAccount: '',
                userPassword: '',
                dialogVisible: false,
                forgetData: {
                    tel: '',
                    password: ''
                },
                codeInput: '',
                timer: null,
                seconds: 90,
                enterPassword: '',
                isClick: false,
                bgTitle: '',
                bgDesc: '',
                bgPath: '',
                platformMess: '营销精英欢迎您',
                isUse: true
            }
        },
        mounted() {
            setTimeout(() => {
                var _selt = this
                $('.swiper-pagination-bullet').click(function(){
                    var index = $('.swiper-pagination-bullet').index($(this)) + 1
                    _selt.$refs.mySwiper.swiper.slideTo(index)
                })
            }, 150)

            setTimeout(() => {
                $('.wrap').height($(document).height())
                var userAgent = navigator.userAgent
                var isWebkit = userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Safari") > -1

                if (!isWebkit) {
                    this.$message({
                        message: '更好的体验，请您移驾Chrome或Safari浏览器！',
                        type: 'warning'
                    })
                }
            }, 0)
            this.getPlatformStatus()
            this.getBackground()
        },
        methods: {
            getPlatformStatus () {
                util.request({
                    method: 'get',
                    interface: 'getPlatformStatus',
                    data: {}
                }).then((res) => {
                    if (res.result.success == '1') {
                        this.isUse = res.result.result == 'a' ? false : true
                        if (!this.isUse) {
                            this.platformMess = '非常抱歉，系统正在维护中！！！'
                        }
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            getBackground () {
                util.request({
                    method: 'get',
                    interface: 'loginBackground',
                    data: {}
                }).then((res) => {
                    if (res.result.success == '1') {
                        var data = res.result.result
                        this.bgPath = data.fileCode
                        this.bgTitle = data.docTitle
                        this.bgDesc = data.docDesc
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            checkTel () {
                if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]\d{8}$/).test(this.forgetData.tel.trim())) {
                    this.isClick = false
                } else {
                    this.isClick = true
                }
            },
            getCode () {
                if (!this.isClick) {
                    return
                }

                util.request({
                    method: 'get',
                    interface: 'getValidateCode',
                    data: {
                        mobile: this.forgetData.tel
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
            updaetPassword () {
                if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]{9}$/).test(this.forgetData.tel.trim())) {
                    this.$message.error('请输入11位注册手机号')
                    return
                }

                if (this.codeInput == '') {
                    this.$message.error('请输入验证码')
                    return
                }

                if (this.forgetData.password == '') {
                    this.$message.error('请输入新密码')
                    return
                }

                if (this.enterPassword == '') {
                    this.$message.error('请确认新密码')
                    return
                }

                if (this.enterPassword != this.forgetData.password) {
                    this.$message.error('前后密码不一致')
                    return
                }
                util.request({
                    method: 'post',
                    interface: 'resetPassword',
                    data: {
                        mobile: this.forgetData.tel,
                        password: this.forgetData.password,
                        code: this.codeInput
                    }
                }).then((res) => {
                    if (res.result.success == '1') {
                        this.dialogVisible = false
                        this.$message({
                          message: '恭喜你，密码修改成功',
                          type: 'success'
                        })
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            subBtn() {
                if (!this.isUse) {
                    return false
                }

                if (this.userLoginAccount == '') {
                    this.$message.error('请输入用户名');
                    return;
                }
                if (this.userPassword == '') {
                    this.$message.error('请输入密码');
                    return;
                }

                var data = {
                    userLoginAccount: this.userLoginAccount,
                    userPassword: this.userPassword,
                    loginType: 'enterprise'
                }

                util.request({
                    method: 'post',
                    interface: 'authentication',
                    data: data
                }).then((res) => {
                    if (res.result.success != '0') {
                        var pathUrl = {
                            name: 'market',
                            query: {
                                enterpriseCode: res.result.result.enterpriseCode
                            }
                        }

                        this.$router.replace(pathUrl)
                    } else {
                        this.$message.error(res.result.message)
                    }
                    
                })
            },
            forgetPassword () {
                this.dialogVisible = true
            },
            gotoRegistor () {
                util.request({
                    method: 'post',
                    interface: 'addDefaultCookie',
                    data: {}
                }).then((res) => {
                    if (res.result.success == '1') {
                        var pathUrl = {
                            name: 'enterprise'
                        }

                        this.$router.replace(pathUrl)
                    } else {
                        this.$message.error(res.result.message)
                    }
                    
                })
            }
        }
    }
</script>
<style lang="scss">
.wrap {
    background: #000000;
    overflow: hidden;
    position: relative;

    .form-b {
        margin-top: 0;
    }

    .bg-img-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
    }

    .message-box {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        margin-top: -80px;
        width: 380px;

        .mess-title {
            font-size: 26px;
            color: #FFFFFF;
            line-height: 36px;
            margin-bottom: 10px;
            font-weight: bold;
        },
        .mess-content {
            padding-top: 10px;
            box-sizing: border-box;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 30px;

            span {
                margin-right: 15px;
            }
        }
    }
    
    .loginBox {
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
        width: 380px;
        padding: 22px 25px 50px;
        background: #ffffff;

        .login-title {
            font-size: 18px;
            color: #373D41;
            line-height: 24px;
            width: 100px;
            font-weight: bold;
        }

        .login-mess {
            font-size: 14px;
            color: #73777A;
            line-height: 24px;
            margin-top: 20px;
        }

        .login-box {
            margin-top: 20px;



            .login-input {
                margin-bottom: 20px;

                input {
                    height: 40px;
                    border-radius: 0;
                }
            }

            .login-btn {
                width: 100%;
                border-radius: 0;
            }

            .forget-p {
              font-size: 12px;
              color: #a1a3a0;
              text-align: right;
              cursor: pointer;
              line-height: 20px;
              margin-top: 8px;

              span {
                margin-left: 10px;
            
                  &:hover {
                    text-decoration: underline;
                  }
              }
            }
        }
    }
}


.form-b {
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

  .code-b {
    cursor: pointer;
  }
}
</style>
