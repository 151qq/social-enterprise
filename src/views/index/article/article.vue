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

export default {
    data () {
        return {
            tabDatas: [
              {
                label: '宣传文章',
                value: 'propagate_article'
              },
              {
                label: '产品介绍',
                value: 'product_introduction'
              },
              {
                label: '演讲材料',
                value: 'speech_material'
              }
            ],
            activeName: 'propagate_article'
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