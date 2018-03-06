<template>
  <section class="header-web">
    <router-link class="logo-box" :to="{name: 'market'}"><img src="../../assets/images/logo.png"></router-link>

    <div class="nav-box">
      <router-link :to="{ name: 'article',query:{enterpriseCode: userInfo.enterpriseCode}}">
        推广文章
      </router-link>
      <router-link :to="{ name: 'market',query:{enterpriseCode: userInfo.enterpriseCode}}">
        营销方案
      </router-link>
      <router-link :to="{ name: 'source',query:{enterpriseCode: userInfo.enterpriseCode}}">
        素材库
      </router-link>
      <!-- <router-link  v-if="isProduct"
                    :to="{ name: 'product',query:{
                      enterpriseCode: userInfo.enterpriseCode,
                      catalogCode: 'e2',
                      catalogLevel: 1
                    }}">
        产品中心
      </router-link> -->
      <router-link  v-if="isProduct"
                    :to="{ name: 'gift',query:{
                      enterpriseCode: userInfo.enterpriseCode,
                      catalogCode: 'e2',
                      catalogLevel: 1
                    }}">
        礼品中心
      </router-link>
      <!-- <router-link :to="{ name: 'survey',query:{enterpriseCode: userInfo.enterpriseCode}}">
        调研发布
      </router-link>
      <router-link :to="{ name: 'cultivate',query:{enterpriseCode: userInfo.enterpriseCode}}">
        营销培训
      </router-link>
      <router-link  v-if="isMember"
                    :to="{ name: 'member',query:{enterpriseCode: userInfo.enterpriseCode}}">
        会员管理
      </router-link> -->
      <router-link  v-if="isConfig"
                    :to="{ name: 'callcenter',query:{enterpriseCode: userInfo.enterpriseCode}}">
        营销配置
      </router-link>
      <router-link  v-if="isRoot"
                    :to="{ name: 'enterprise',query:{enterpriseCode: userInfo.enterpriseCode}}">
        企业信息
      </router-link>
    </div>

    <div class="member-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          您好
          <span>{{userInfo.userCnName}}</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="logout">
              <img src="../../assets/images/logout.png">
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>
<script>
import util from '../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      roleCodes: []
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      }),
      isRoot () {
        return this.roleCodes.indexOf('enterprise_root') > -1
      },
      isProduct () {
        return this.roleCodes.indexOf('product_admin') > -1
      },
      isMember () {
        return this.roleCodes.indexOf('enterprise_member_admin') > -1
      },
      isConfig () {
        return this.roleCodes.indexOf('enterprise_config_admin') > -1
      }
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    getUserInfo () {
      util.request({
        method: 'get',
        interface: 'getUserInfo',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          if (res.result.result.enterpriseCode) {
            var roleCodes = []
            res.result.result.roleDefs.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            this.roleCodes = roleCodes

            res.result.result.roleCodes = roleCodes.concat([])

            this.setUserInfo(res.result.result)
            this.$emit('loadPage', '1')
          } else {
            this.$emit('loadPage', '0')
          }
        } else {
          this.$message.error(res.result.message)
        }
      })
    },
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          this.$router.replace({name: 'login'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .el-dropdown-menu__item {
    font-size: 14px;

    img {
      float: left;
      width: 16px;
      height: 16px;
      margin: 10px 10px 0 2px;
    }

    div {
      line-height: 36px;
      overflow: hidden;
    }
  }

  .el-dropdown-menu {
    min-width: 120px;
  }

  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
  }

  .header-web {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000000;
    color: #fff;
    padding: 0 20px;
    z-index: 2000;
    box-sizing: border-box;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;

      img {
        height: 30px;
      }
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 13px;
        color: #A4A4A4;
        line-height: 50px;
        margin-right: 30px;

        &:hover {
          color: #ffffff;
        }
      }

      .router-link-active {
        color: #ffffff;
      }
    }

    .member-box {
      float: right;
      margin-left: 20px;

      .member-show-message {
        font-size: 14px;
        line-height: 50px;
        color: #A4A4A4;
        cursor: pointer;
      }

      .img-box {
        float: left;
        width: 24px;
        height: 24px;
        margin: 13px 20px 0 0;
        border-radius: 50%;
        overflow: hidden;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
        background-size: 100% auto;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }


    .line-box {
      float: right;
      width: 1px;
      height: 20px;
      margin: 15px 0;
      background: #555555;
    }
  }
</style>

