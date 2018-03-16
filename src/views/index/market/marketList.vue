<template>
    <div class="market-list-box">
        <div class="input-box">
            <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
            <el-button class="search-btn" type="primary" icon="search" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="plus" @click="addItem">增加</el-button>
        </div>
        <section class="big-cards-box">
            <router-link class="card-box"
                         target="_blank"
                         v-for="(item, index) in marketList"
                         :to="{name: 'market-detail', query: {eventCode: item.eventCode, enterpriseCode: item.enterpriseCode}}">
                <div class="card-img">
                    <img v-if="item.eventPlanCover" :src="item.eventPlanCover">
                </div>
                
                <div class="card-content">
                    <div class="card-title">{{item.eventPlanTitle}}</div>
                    <div class="card-desc">{{item.eventPlanDesc}}</div>
                    <div class="card-tag">
                        <el-tag v-if="item.eventStatus == '1' || item.eventStatus == '2'" type="gray">草稿</el-tag>
                        <el-tag v-if="item.eventStatus == '3'" type="success">已发布</el-tag>
                        <el-tag v-if="item.eventStatus == '5'">正常结束</el-tag>
                        <el-tag v-if="item.eventStatus == '4'">提前终止</el-tag>
                    </div>
                </div>
                <section class="card-btns">
                    <i class="el-icon-delete2"
                        v-if="item.eventStatus == '1'"
                        @click.prevent="deleteItemByCode(item)"></i>
                </section>
            </router-link>
        </section>
        <section class="null-box" v-if="!marketList.length && isPage">
          暂无内容！！！
        </section>
        <div class="more-load"
                v-if="total && marketList.length < total"
                @click="loadMore">加载更多...</div>
  </div>
</template>
<script>
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            keyValue: '',
            marketList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        searchItem () {
          this.getList()
        },
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventDesigner: this.userInfo.userCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            if (this.keyValue) {
                formData.keyValue = this.keyValue
            }

            util.request({
                method: 'post',
                interface: 'eventInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                this.isPage = true
                if (!type) {
                    this.marketList = res.result.result
                } else {
                    this.marketList = this.marketList.concat(res.result.result)
                }
            })
        },
        deleteItemByCode (item) {
            util.request({
              method: 'post',
              interface: 'eventInfoDelete',
              data: {
                eventCode: item.eventCode
              }
            }).then(res => {
              if (res.result.success == '1') {
                this.getList()

                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                this.$message.error(res.result.message)
              }
            })
        },
        addItem () {
            var pathUrl = {
              name: 'market-detail',
              query: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
            }

            this.$router.push(pathUrl)
        },
        loadMore () {
            this.pageNumber++
            this.getList('more')
        }
    }
}
</script>
<style lang="scss">
.market-list-box {
    width: 1000px;
    margin: 80px auto 30px;

    .input-box {
        display: block;
        width: 800px;
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

    .no-add {
      width: 696px;
    }

    .big-cards-box {

      .card-btns {
        text-align: right;
        position: absolute;
        font-size: 16px;
        color: #000000;
        right: 10px;
        bottom: 23px;
      }

      .card-box {
        position: relative;
        display: block;
        overflow: hidden;
        padding-bottom: 20px;
        border-bottom: 1px solid #C0CCDA;
        margin-bottom: 20px;

        .card-img {
          float: left;
          width: 160px;
          height: 100px;
          background: #cfcfd0;

          img {
            display: block;
            width: 160px;
            height: 100px;
          }
        }

        .card-content {
          float: right;
          width: 820px;

          .card-title {
            font-size: 16px;
            line-height: 24px;
            color: #000000;
            margin-bottom: 3px;
          }

          .card-desc {
            font-size: 14px;
            line-height: 24px;
            color: #475669;
            height: 48px;
            overflow: hidden;
          }
        }
      }
    }
}
</style>