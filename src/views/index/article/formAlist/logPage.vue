<template>
    <section class="coments-box">
      <section class="comment-b" v-for="(item, index) in commentDatas">
        <div class="left-box">
          
        </div>
        <div class="right-box">
          <div class="user-name">
            {{item.author.name}}
          </div>
          <div class="content-box">
            <section v-if="item.commentContent" class="text-box">{{item.commentContent}}</section>
            <section v-if="item.commentImgs && item.commentImgs.length" class="imgList-box">
              <div>
                <img :src="urlC" v-for="(urlC, indexC) in item.commentImgs" :key="indexC">
              </div>
            </section>
            <section v-if="item.responseComment.commentArticles && item.responseComment.commentArticles.length"
                    class="articles-box">
                <router-link class="link-arc"
                              v-for="(articleA, indexAA) in item.responseComment.commentArticles"
                              :key="indexAA">
                  <img :src="articleA.imgUrl" class="arc-img">
                  <div class="con-arc">
                    <p class="title-a">{{articleA.title}}</p>
                    <p class="content-a">{{articleA.des}}</p>
                  </div>
                </router-link>
            </section>
          </div>

          
        </div>
      </section>
    </section>
</template>
<script>
import commonJs from '../../../../assets/common/common.js'
import util from '../../../../assets/common/util'

export default {
    data () {
      return {
        base: {

        },
        logList: []
      }
    },
    mounted () {
      this.getBase()
      this.getLogs()
    },
    filters: {
      strDate (value) {
        return commonJs.getDateDiff(value)
      }
    },
    methods: {
        getBase () {
            util.request({
                method: 'post',
                interface: 'pageInfoDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                  this.base = res.result.result

                  this.$emit('baseChange', Object.assign({}, this.base))
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        getLogs () {
          util.request({
              method: 'post',
              interface: 'pageLogList',
              data: {
                  enterpriseCode: this.$route.query.enterpriseCode,
                  pageCode: this.$route.query.pageCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.logList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        }
    }
}
</script>
<style lang="scss">
.coments-box {
  .comment-b {
    margin-bottom: 20px;
    overflow: hidden;

    .left-box {
      float: left;
      width: 90px;
      overflow: hidden;
      font-size: 16px;
      color: #000000;
      line-height: 30px;
    }

    .right-box {
      float: right;
      width: 860px;

      .btn-box {
        text-align: right;
      }

      .user-name {
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        margin-bottom: 10px;
        overflow: hidden;
      }

      .content-box {
        .text-box {
          font-size: 14px;
          color: #000000;
          line-height: 30px;
          margin-bottom: 10px;
        }

        .imgList-box {
          div {
            width: 110%;
            overflow: hidden;
            margin-bottom: 10px;

            img {
              float: left;
              width: 175px;
              height: 120px;
              margin-right: 15px;
              margin-bottom: 8px;
            }
          }
        }

        .articles-box {
          .link-arc {
            padding: 10px;
            background: #EFF2F7;
            display: flex;
            margin-bottom: 10px;

            .arc-img {
              display: block;
              width: 140px;
              height: 100px;
            }

            .con-arc {
              flex: 1;
              margin-left: 10px;

              .title-a {
                font-size: 16px;
                color: #000000;
                line-height: 28px;
                margin-bottom: 10px;
              }

              .content-a {
                font-size: 14px;
                color: #475669;
                line-height: 28px;
                height: 56px;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>