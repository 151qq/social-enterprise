<template>
  <section class="header-web">
    <router-link class="logo-box" :to="{name: 'market'}"><img src="../../assets/images/logo.png"></router-link>

    <div class="nav-box">
      <router-link :to="{ name: 'market',query:{enterpriseCode: userInfo.enterpriseCode}}">营销方案</router-link>
      <router-link :to="{ name: 'article',query:{enterpriseCode: userInfo.enterpriseCode}}">推广文章</router-link>
      <router-link :to="{ name: 'survey',query:{enterpriseCode: userInfo.enterpriseCode}}">调研发布</router-link>
      <router-link :to="{ name: 'product',query:{
        enterpriseCode: userInfo.enterpriseCode,
        catalogCode: 'e2',
        catalogLevel: 1
      }}">产品中心</router-link>
      <!-- <router-link :to="{ name: 'gift'}">礼品中心</router-link> -->
      <router-link :to="{ name: 'enterprise'}">企业信息</router-link>
      <router-link :to="{ name: 'callcenter',query:{enterpriseCode: userInfo.enterpriseCode}}">营销配置</router-link>
      <router-link :to="{ name: 'source',query:{enterpriseCode: userInfo.enterpriseCode}}">素材库</router-link>
      <router-link :to="{ name: 'member'}">会员管理</router-link>
    </div>

    <div class="member-box">
      <span class="member-show-message">
        您好
        <span>{{userInfo.userCnName}}</span>
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
    </div>
  </section>
</template>
<script>
import util from '../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  created () {
    this.getUserInfo()
  },
  computed: {
      ...mapGetters({
          userInfo: 'getUserInfo'
      })
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
    z-index: 99999;
    box-sizing: border-box;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;
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

