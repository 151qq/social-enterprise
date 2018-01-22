<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="float-form-box" title="基本信息" name="0">
            <form-article-base></form-article-base>
          </el-collapse-item>

          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="文章正文" name="1">
            <edit></edit>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="文章推荐" name="2">
            <form-article></form-article>
          </el-collapse-item>
          
          <template>
            <div class="line-bold"></div>

            <el-collapse-item class="float-form-box" title="传播路径" name="4">
              <section class="graph-box">
                <echart-graph :id-name="'spreadGraph'"
                      :echarts-date="echartData.spreadGraph"
                      ref="spreadGraph"></echart-graph>
              </section>
            </el-collapse-item>
          </template>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import edit from '../../../components/common/edit'
import formArticleBase from './formAlist/formArticleBase'
import formArticle from './formAlist/formArticle'
import echartGraph from '../../../components/common/echart-graph'

export default {
    data () {
        return {
            activeNames: ['1'],
            templateData: {},
            echartData: {},
            comments: []
        }
    },
    mounted () {
        var articleColl = localStorage.getItem("articleColl")
        if (articleColl) {
            this.activeNames = articleColl.split(',')
        }
    },
    methods: {
        collChange () {
            localStorage.setItem("articleColl", this.activeNames)
        }
    },
    components: {
        edit,
        formArticleBase,
        formArticle,
        echartGraph,
    }
}
</script>
<style lang="scss">

</style>