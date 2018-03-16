<template>
    <div>
        <div class="ar-title" :style="arTitle">{{articleData.pageTitle}}</div>
        <div class="ar-author-date" :style="arAuthorDate">
            <span class="ar-date">{{ articleData.pageEditTime | formatDate(base.dateStyle)}}</span>
            <a  class="ar-author"
                target="_blank" 
                :style="arAuthor"
                :href="base.editorLink">
                    {{articleData.eidtorCode}}
            </a>
        </div>
        <div :style="arContent"
             v-html="item.pageAreaContent"
             v-for="(item, index) in articleList"></div>

        <img class="ar-img" :style="arImg" :src="base.fileEndPic">
    </div>
</template>
<script>
import util from '../../../../assets/common/util'
import templateMixin from '../../../../assets/common/templateMixin'

export default {
    data () {
        return {
            base: {},
            articleList: [],
            articleData: {
                pageTitle: '',
                pageEditTime: '',
                eidtorCode: ''
            }
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate: util.formatDate
    },
    mounted () {
        this.getBase()
        this.getTemplate()
        this.getAreaList()
    },
    methods: {
        getBase () {
            util.request({
                method: 'get',
                interface: 'getPageInfo',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                  this.articleData = res.result.result
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        getAreaList () {
            util.request({
                method: 'get',
                interface: 'listPageArea',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.articleList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTemplate () {
            util.request({
                method: 'get',
                interface: 'getTemplates',
                data: {
                    templateCode: this.$route.query.templateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.base = res.result.result[0]
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>