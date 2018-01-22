<template>
    <div class="wrap">
        <div class="loginBox">
            <div class="l">
                <swiper :options="swiperOption" ref="mySwiper">
                  <!-- slides -->
                  <swiper-slide v-for="item in swiperData"><img :src="item.picUrl"></swiper-slide>
                  <!-- Optional controls -->
                </swiper>

                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <div class="r">
                <el-form class="login-box" :label-position="'left'" label-width="80px">
                    <el-form-item label="用户名称">
                        <el-input v-model="userLoginAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="userPassword" type="password"></el-input>
                        <div class="forget-p" @click="dialogVisible = true">
                            忘记密码
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="subBtn">平台登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="message-box">欢迎来到商房云管理平台。通过商房云管理平台。物业管理员可以创建、更新物业信息；企业管理员可以创建和管理企业信息；证券管理员可以创建和更新证券信息。请使用您的手机号和商房云管理平台密码登录。如果您无法登录，请主动联系商房云平台的运营经理，请其为您创建账号、设置初始化密码和相应的权限。</div>
            </div>
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
    import util from '../../assets/common/util';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'Jquery'
    export default {
        name: 'index',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                userLoginAccount: '',
                userPassword: '',
                swiperData: [
                    {picUrl: '/static/images/ip_big1.jpg'},
                    {picUrl: '/static/images/ip_big2.jpg'},
                    {picUrl: '/static/images/ip_big4.jpg'},
                    {picUrl: '/static/images/ip_big3.jpg'}
                ],
                dialogVisible: false,
                forgetData: {
                    tel: '',
                    password: ''
                },
                swiperOption: {
                    // swiper options 所有的配置同swiper官方api配置
                    direction: 'horizontal',
                    mousewheelControl: true,
                    observeParents: true,
                    autoplay: 3000,
                    initialSlide: 1,
                    loop: true,
                    pagination: '.swiper-pagination'
                },
                codeInput: '',
                timer: null,
                seconds: 90,
                enterPassword: '',
                isClick: false
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
            }, 0)
        },
        methods: {
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
                    method: 'post',
                    interface: 'sendSmsCode',
                    data: {
                        mobile: this.forgetData.tel
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
            updaetPassword () {
                if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.forgetData.tel.trim())) {
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
                    loginType: 'platform'
                }

                util.request({
                    method: 'post',
                    interface: 'authentication',
                    data: data
                }).then((res) => {
                    if (res.result.success != '0') {
                        var pathUrl = {}

                        if (res.result.enterpriseCode) {
                            pathUrl = {
                                name: 'market',
                                query: {
                                    enterpriseCode: res.result.enterpriseCode
                                }
                            }
                        } else {
                            pathUrl = {
                                name: 'platform-detail'
                            }
                        }

                        this.$router.replace(pathUrl)
                    } else {
                        this.$message.error(res.result.message)
                    }
                    
                });
            }
        }
    }
</script>
<style lang="scss">
.wrap {
    background: #383a4c;
    overflow: hidden;

    .swiper-container .swiper-wrapper .swiper-slide img {
        display: block;
        width: 100%;
    }
}

.loginBox {
  width: 1160px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 125px 0 0;
  background: #383a4c;
  margin: auto;

  .l {
    width: 756px;
    overflow: hidden;
    float: left;

    .swiper-pagination {
      position: static;
      display: block;
      margin-top: 20px;
      text-align: center;

      .swiper-pagination-bullet {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0 6px;
        background: #7d7f8a;
        box-shadow: 0 1px 1px 0 #000000 inset;
        cursor: pointer;
      }

      .swiper-pagination-bullet-active {
        background: #64a0d7;
        box-shadow: 0 1px 1px 0 #f0f0f0 inset;
      }
    }
  }

  .r {
    width: 360px;
    height: 426px;
    background-color: #424458;
    float: right;
    overflow: hidden;
    box-sizing: border-box;
    padding: 30px 24px 20px;
    box-shadow: 0 0 10px 1px #1f1e1e;

    .login-box {
      
    }

    .el-form-item__label {
      color: #ffffff;
    }

    .el-form-item {
      margin-bottom: 10px;
    }

    .el-button--primary {
      width: 100%;
    }

    .dased-border {
      width: 120%;
      height: 1px;
      border-top: 1px dashed #999999;
      margin: 20px 0 20px -40px;
    }

    .forget-p {
      font-size: 12px;
      color: #a1a3a0;
      text-align: right;
      cursor: pointer;
      line-height: 20px;
      margin-top: 8px;

      &:hover {
        text-decoration: underline;
      }
    }

    .message-box {
      font-size: 14px;
      color: #75778d;
      line-height: 26px;
      margin-top: 30px;
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
