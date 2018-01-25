const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/market',
    component (resolve) {
      require.ensure(['./main.vue'], () => {
        resolve(require('./main.vue'))
      })
    },
    children: [
      {
        // 推广文章
        path: 'article',
        component (resolve) {
          require.ensure(['./article/main.vue'], () => {
            resolve(require('./article/main.vue'))
          })
        },
        children: [
          {
            // 推广文章
            path: '',
            name: 'article',
            component (resolve) {
              require.ensure(['./article/article.vue'], () => {
                resolve(require('./article/article.vue'))
              })
            }
          },
          {
            // 推广文章
            path: 'articleDetail',
            name: 'article-detail',
            component (resolve) {
              require.ensure(['./article/articleDetail.vue'], () => {
                resolve(require('./article/articleDetail.vue'))
              })
            }
          }
        ]
      },
      {
        // 产品中心
        path: 'product',
        component (resolve) {
          require.ensure(['./product/main.vue'], () => {
            resolve(require('./product/main.vue'))
          })
        },
        children: [
          {
            // 产品中心
            path: '',
            name: 'product',
            component (resolve) {
              require.ensure(['./product/productList.vue'], () => {
                resolve(require('./product/productList.vue'))
              })
            }
          },
          {
            // 产品中心
            path: 'productDetail',
            name: 'product-detail',
            component (resolve) {
              require.ensure(['./product/productDetail.vue'], () => {
                resolve(require('./product/productDetail.vue'))
              })
            }
          }
        ]
      },
      {
        // 礼品中心
        path: 'gift',
        component (resolve) {
          require.ensure(['./gift/main.vue'], () => {
            resolve(require('./gift/main.vue'))
          })
        },
        children: [
          {
            // 礼品中心
            path: '',
            name: 'gift',
            component (resolve) {
              require.ensure(['./gift/giftList.vue'], () => {
                resolve(require('./gift/giftList.vue'))
              })
            }
          },
          {
            // 礼品中心
            path: 'giftDetail',
            name: 'gift-detail',
            component (resolve) {
              require.ensure(['./gift/giftDetail.vue'], () => {
                resolve(require('./gift/giftDetail.vue'))
              })
            }
          }
        ]
      },
      {
        // 素材库
        path: 'source',
        name: 'source',
        component (resolve) {
          require.ensure(['./source/source.vue'], () => {
            resolve(require('./source/source.vue'))
          })
        }
      },
      {
        // 企业信息
        path: 'enterprise',
        name: 'enterprise',
        component (resolve) {
          require.ensure(['./enterprise/enterpriseDetail.vue'], () => {
            resolve(require('./enterprise/enterpriseDetail.vue'))
          })
        }
      },
      
      {
        // 客服配置
        path: 'callcenter',
        name: 'callcenter',
        component (resolve) {
          require.ensure(['./callcenter/callcenter.vue'], () => {
            resolve(require('./callcenter/callcenter.vue'))
          })
        }
      },
      {
        // 调研
        path: 'survey',
        component (resolve) {
          require.ensure(['./survey/main.vue'], () => {
            resolve(require('./survey/main.vue'))
          })
        },
        children: [
          {
            // 调研详情
            path: '',
            name: 'survey',
            component (resolve) {
              require.ensure(['./survey/survey.vue'], () => {
                resolve(require('./survey/survey.vue'))
              })
            }
          },
          {
            // 调研详情
            path: 'surveyDetail',
            name: 'survey-detail',
            component (resolve) {
              require.ensure(['./survey/surveyDetail.vue'], () => {
                resolve(require('./survey/surveyDetail.vue'))
              })
            }
          }
        ]
      },
      {
        // 营销方案
        path: 'market',
        component (resolve) {
          require.ensure(['./market/main.vue'], () => {
            resolve(require('./market/main.vue'))
          })
        },
        children: [
          {
            // 营销方案
            path: '',
            name: 'market',
            component (resolve) {
              require.ensure(['./market/marketList.vue'], () => {
                resolve(require('./market/marketList.vue'))
              })
            }
          },
          {
            // 营销方案详情
            path: 'marketDetail',
            name: 'market-detail',
            component (resolve) {
              require.ensure(['./market/marketDetail.vue'], () => {
                resolve(require('./market/marketDetail.vue'))
              })
            }
          }
        ]
      },
      
      {
        // 券
        path: 'coupon',
        name: 'coupon',
        component (resolve) {
          require.ensure(['./coupon/coupon.vue'], () => {
            resolve(require('./coupon/coupon.vue'))
          })
        }
      },
      {
        // 文章模版
        path: 'articleTemplate',
        name: 'article-template',
        component (resolve) {
          require.ensure(['./articleTemplate/articleTemplate.vue'], () => {
            resolve(require('./articleTemplate/articleTemplate.vue'))
          })
        }
      },
      {
        // 会员搜索页
        path: 'member',
        component (resolve) {
          require.ensure(['./member/main.vue'], () => {
            resolve(require('./member/main.vue'))
          })
        },
        children: [
          {
            // 会员
            path: '',
            name: 'member',
            component (resolve) {
              require.ensure(['./member/member.vue'], () => {
                resolve(require('./member/member.vue'))
              })
            }
          },
          {
            // 会员详情
            path: 'memberDetail',
            name: 'member-detail',
            component (resolve) {
              require.ensure(['./member/memberDetail.vue'], () => {
                resolve(require('./member/memberDetail.vue'))
              })
            }
          }
        ]
      }
    ]
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['./login.vue'], () => {
        resolve(require('./login.vue'))
      })
    }
  }
]

export default routers
