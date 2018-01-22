<template>
    <section class="coments-box">
      <section class="comment-b" v-for="(item, index) in commentDatas">
        <div class="avatar-box"> <img :src="item.author.avatar"></div>
        <div class="right-box">
          <div class="user-name">
            <span>
              {{index + 1}}楼 &nbsp;&nbsp;
              <span class="time-box">{{item.submitTime | strDate}}</span>
            </span>
            {{item.author.name}}
          </div>
          <div class="content-box">
            <section v-if="item.commentContent" class="text-box">{{item.commentContent}}</section>
            <section v-if="item.commentImgs && item.commentImgs.length" class="imgList-box">
              <div>
                <img :src="urlC" v-for="(urlC, indexC) in item.commentImgs" :key="indexC">
              </div>
            </section>
          </div>

          <section class="author-box" v-if="item.responseComment">
            <p class="des-title">
              作者回复:
              <section class="com-time">{{item.responseComment.submitTime | strDate}}</section>
            </p>
            <div class="content-box art-content-box">
              <section v-if="item.responseComment.commentContent"
                      class="text-box">{{item.responseComment.commentContent}}</section>
              <section v-if="item.responseComment.commentImgs && item.responseComment.commentImgs.length"
                      class="imgList-box">
                <div>
                  <img :src="urlA" v-for="(urlA, indexA) in item.responseComment.commentImgs" :key="indexA">
                </div>
              </section>
              <section v-if="item.responseComment.commentArticles && item.responseComment.commentArticles.length"
                      class="articles-box">
                  <a class="link-arc" v-for="(articleA, indexAA) in item.responseComment.commentArticles"
                      :key="indexAA">
                    <img :src="articleA.imgUrl" class="arc-img">
                    <div class="con-arc">
                      <p class="title-a">{{articleA.title}}</p>
                      <p class="content-a">{{articleA.des}}</p>
                    </div>
                  </a>
              </section>
            </div>

          </section>
          <div class="btn-box">
            <el-button type="primary" icon="delete2" size="small">删除</el-button>
          </div>
        </div>
      </section>
    </section>
</template>
<script>
import commonJs from '../../../../assets/common/common.js'

export default {
    props: ['comments'],
    data () {
      return {
        commentDatas: [
            {
                id: 0,
                author: {
                    name: '大家好，我是ms',
                    avatar: '/static/images/bench1.png'
                },
                zanNum: 11,
                hateNum: 12,
                commentContent: '其实吧，没什么想说的，哎，都不容呀！',
                commentImgs: [
                    '/static/images/bench1.png',
                    '/static/images/bench1.png',
                    '/static/images/bench1.png',
                    '/static/images/bench1.png',
                    '/static/images/bench1.png'
                ],
                submitTime: '2017-11-20',
                responseComment: {
                    id: 1,
                    author: {
                        name: '大家好，我是ms',
                        avatar: '/static/images/detail1.png'
                    },
                    commentContent: '其实吧，没什么想说的，哎，都不容呀！',
                    commentImgs: [
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png',
                        '/static/images/bench1.png'
                    ],
                    commentArticles: [
                        {
                            id: 0,
                            title: '咋啦，妹砸，被煮啦！',
                            imgUrl: '/static/images/bench1.png',
                            des: '我不活了我啊。。。。',
                            href: ''
                        },
                        {
                            id: 1,
                            title: '论妹砸被煮二三事！',
                            imgUrl: '/static/images/bench1.png',
                            des: '什么事啊这是。。。',
                            href: ''
                        }
                    ],
                    submitTime: '2017-12-21'
                }
            }
        ]
      }
    },
    filters: {
      strDate (value) {
        return commonJs.getDateDiff(value)
      }
    }
}
</script>
<style lang="scss">
.coments-box {
  .comment-b {
    margin-bottom: 20px;
    overflow: hidden;

    .avatar-box {
      float: left;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
        display: block;
        width: 60px;
        height: 60px;
      }
    }

    .right-box {
      float: right;
      width: 560px;

      .btn-box {
        text-align: right;
      }

      .user-name {
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        margin-bottom: 10px;
        overflow: hidden;
        
        span {
          float: right;
          font-size: 14px;

          .time-box {
            color: #5E6D82;
          }
        }
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

      .des-title {
        font-size: 14px;
        color: #20A0FF;
        line-height: 30px;
        margin: 10px 0;

        .com-time {
          float: right;
          text-align: right;
          font-size: 14px;
          line-height: 30px;
          color: #5E6D82;
        }
      }

      .art-content-box {
        padding: 18px 10px 10px;
        background: #F9F9F9;
        margin-bottom: 10px;

        .imgList-box div img {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>