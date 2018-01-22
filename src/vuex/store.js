import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {
      userCode: '15164369647',
      userWechatUserid: 'YangNing',
      userImage: 'http://p.qlogo.cn/bizmail/vrch5KVpXx5Y1ZEV06hTsd8des35JhGGKo96NS0921LLicaFRRBCpUw/0',
      userLoginName: '杨宁',
      userInfo: {
        userMobile: '15164369647'
      },
      securityUserRole: [
        {
          roleCode: 'product_admin',
          roleDesc: '产品发布'
        },
        {
          roleCode: 'enterprise_member_admin',
          roleDesc: '会员管理'
        }
      ]
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    }
  }
})

export default userStore
