<template>
    <div class="article-list-big-box">
        <el-tabs v-model="activeName">
            <el-tab-pane v-for="(item, index) in tabDatas"
                          :label="item.label" :name="item.value">
                <article-list :article-type="item.value"></article-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import articleList from './articleList'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isPage: false,
            tabDatas: [
              {
                label: '宣传文章',
                value: 'template_type_1'
              },
              {
                label: '产品介绍',
                value: 'template_type_4'
              },
              {
                label: '演讲材料',
                value: 'template_type_2'
              },
              {
                label: '培训材料',
                value: 'template_type_3'
              }
            ],
            activeName: 'template_type_1'
        }
    },
    mounted () {
      if (!this.$route.query.enterpriseCode) {
        var pathUrl = {
          name: 'article',
          query: {
            enterpriseCode: this.userInfo.enterpriseCode
          }
        }

        this.$router.replace(pathUrl)
      } else {
        this.isPage = true
      }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    watch: {
      $route () {
        if (this.$route.query.enterpriseCode) {
          this.isPage = true
        }
      }
    },
    components: {
      articleList
    }
}
</script>
<style lang="scss">
.article-list-big-box {
  width: 1000px;
  margin: 80px auto 30px;
}
</style>