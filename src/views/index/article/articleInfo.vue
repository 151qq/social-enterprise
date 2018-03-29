<template>
    <div class="article-list-detail-box">
        <article-show></article-show>
        <!-- <el-tabs v-model="activeName">
            <el-tab-pane class="form-discount" label="文章正文" name="articleEdit">
                <article-show></article-show>
            </el-tab-pane>

            <el-tab-pane class="form-discount" label="传播路径" name="articleSpread">
                <section class="graph-box">
                  <echart-graph></echart-graph>
                </section>
            </el-tab-pane>
            
            <el-tab-pane class="form-discount" label="文章管理" name="articleManage">
                <log-page></log-page>
            </el-tab-pane>
        </el-tabs> -->
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import articleShow from './formAlist/articleShow'
// import logPage from './formAlist/logPage'
import echartGraph from './formAlist/echart-graph'

export default {
    data () {
        return {
            activeName: 'articleEdit'
        }
    },
    mounted () {},
    components: {
        articleShow,
        echartGraph
    }
}
</script>
<style lang="scss">
.article-list-detail-box {
    width: 1000px;
    margin: 80px auto 30px;

    .form-discount {
        padding: 0;
    }

    .block-title {
        width: 1000px;
        clear: both;
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        font-weight: bold;
        margin: auto;
        margin-bottom: 20px;
    }

    .el-tabs__content {
        overflow: visible;
    }
}
</style>