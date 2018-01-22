<template>
  <section class="member-list-box" @click.stop="hideMess">
      <div class="member-list-input" >
        <div class="input-box">
              <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
              <el-button class="search-btn" type="primary" icon="search"
                         @click="searchItem">
                搜索
              </el-button>
        </div>
        <div class="mess-box" v-show="messDate.length !== 0 && isShow">
          <router-link v-for="(item, index) in messDate"
                      target="_blank"
                      class="nav-r"
                      :key="index"
                      :to="{
                        name: 'member-detail',
                        query: {
                          enterpriseCode: $route.query.enterpriseCode,
                          memberCode: item.memberCode
                        }
                      }">
            <img :src="item.memberImage">
            <div>
              <span class="title">{{ item.memberName }}</span>
              <span class="tel">{{ item.memberMobile }}</span>
            </div>
          </router-link>
        </div>
      </div>
  </section>
</template>
<script>
import $ from 'Jquery'
import util from '../../../assets/common/util'

export default {
  props: {
    isPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [],
      count: 0
    }
  },
  mounted () {
    var _self = this
    $('body').click(function () {
      _self.messDate = []
      _self.isShow = false
    })
    setTimeout(() => {
      $('.member-list-box').height($(document).height() - 90)
    }, 0)
  },
  methods: {
    searchItem () {
      if (this.keyValue === '') {
        return false
      }

      var count = this.count

      var formData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          key: this.keyValue
      }

      util.request({
          method: 'post',
          interface: 'memberList',
          data: formData
      }).then(res => {
          if (res.result.success == '1' && count == this.count) {
              this.messDate = res.result.result
              this.isShow = true
          }
      })
    },
    hideMess () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss">
.member-list-box {

  .member-list-input {
    display: block;
    width: 696px;
    position: relative;
    top: 220px;
    margin: auto;

    .mess-box {
      position: absolute;
      left: 0;
      top: 49px;
      width: 591px;
      box-sizing: border-box;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      z-index: 10;
      
      .nav-r {
        display: flex;
        padding: 10px 15px;
        cursor: pointer;

        img {
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }

        div {
          flex: 1;

          .title {
            display: block;
            font-size: 14px;
            line-height: 30px;
            color: #000000;
          }

          .tel {
            display: block;
            font-size: 14px;
            line-height: 30px;
            color: #333333;
          }
        }

        &:hover {
          background: #f9f9f9;
        }
      }
    }

    .input-box {
        display: block;
        width: 696px;
        height: 50px;
        margin: 0 auto 30px;

        .input-search {
          float: left;
          width: 600px;
          height: 50px;
          appearance: none;
          font-size: 14px;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          line-height: 1;
          outline: 0;
          padding: 3px 10px;
        }

        .search-btn {
          position: relative;
          float: left;
          margin-left: -10px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          height: 50px;
          font-size: 16px;
          padding: 0 23px;
        }

        .add-new-btn {
            float: right;
            height: 50px;
        }
    }
  }
}
</style>