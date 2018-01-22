<template>
    <section class="big-article-box">
        <router-link class="card-box"
                     target="_blank"
                     v-for="(item, index) in articleData"
                     :key="index"
                     :to="{name: 'article-detail', query: {enterpriseCode: item.enterpriseCode, pageCode: item.pageCode, templateCode: item.templateCode}}">
            <div class="card-img">
                <img v-if="item.pageCover" :src="item.pageCover">
            </div>
            
            <div class="card-content">
                <div class="card-title">{{item.pageTitle}}</div>
                <div class="card-desc">{{item.pageAbstract}}</div>
            </div>
        </router-link>
        <div class="null-box" v-if="!articleData.length">
            暂无内容！
        </div>
    </section>
</template>
<script>
export default {
    props: ['articleData'],
    data () {
        return {}
    }
}
</script>
<style lang="scss">
.big-article-box {

    .null-box {
        height: 80px;
        font-size: 16px;
        color: #999999;
        text-align: center;
        line-height: 60px;
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
            width: 120px;
            height: 80px;
            background: #cfcfd0;

            img {
                display: block;
                width: 120px;
                height: 80px;
            }
        }

        .card-content {
            float: right;
            width: 860px;

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
</style>