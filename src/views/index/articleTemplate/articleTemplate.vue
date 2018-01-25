<template>
    <section class="article-template-box">
        <section class="left-content form-b">
            <div class="formStylePro">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="block-title">模版信息</section>
                    <section class="baseInput">
                        <span>模板标题</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.templateTitle">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>模板类型</span>
                        <el-select class="input-box"
                                   v-model="base.templateType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in templateTypes"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <!-- 大标题样式 -->
                    <section class="block-title">大标题样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.titleFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.titleFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.titleAlignment"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>背景图片</span>
                        <div class="input-box">
                            <upload :path="base.titleBackground"
                                    :is-operate="isEdit"
                                    :bg-path="false"
                                    @changeImg="changeTitleBg"></upload>
                        </div>
                    </section>

                    <!-- 日期作者 -->
                    <section class="block-title">日期作者样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.editorDateFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.editorDateFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.editorDateStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentDateStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>日期作者间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateSpace">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>作者链接</span>
                        <el-input
                                class="input-box"
                                placeholder="eg:http://www.xxxx.com"
                                v-model="base.editorLink">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>日期风格</span>
                        <el-select class="input-box"
                                   v-model="base.dateStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in dateStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>作者最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorMaxInput">
                        </el-input>
                    </section>

                    <!-- 内标题样式 -->
                    <section class="block-title">内标题样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleFontType">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.innerTitleFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.innerTitleFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.innerTitleAlignment"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>背景图片</span>
                        <div class="input-box">
                            <upload :path="base.innerTitleBackground"
                                    :is-operate="isEdit"
                                    :bg-path="false"
                                    @changeImg="changeInnerTitleBg"></upload>
                        </div>
                    </section>


                    <!-- 文本区域样式 -->
                    <section class="block-title">文本区域样式</section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileTaxtMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileTaxtLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.fileTaxtFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileBlcokTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>文章背景</span>
                        <div class="input-box">
                            <upload :path="base.fileBackground"
                                    :is-operate="isEdit"
                                    :bg-path="false"
                                    @changeImg="changeFileBackground"></upload>
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>文章结尾图片</span>
                        <div class="input-box">
                            <upload :path="base.fileEndPic"
                                    :is-operate="isEdit"
                                    :bg-path="false"
                                    @changeImg="changeFileEndPic"></upload>
                        </div>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isEdit"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </div>
        </section>
        <section class="right-content">
            <div class="ar-title" :style="arTitle">
                Sagmeister & Walsh 这次又搞了个大新闻！24小时全球直播工作室状态
            </div>
            <div class="ar-author-date" :style="arAuthorDate">
                <span class="ar-date">{{ '2019-10-10' | formatDate(base.dateStyle)}}</span>
                <a  class="ar-author"
                    target="_blank" 
                    :style="arAuthor"
                    :href="base.editorLink">
                        Sagmeister & Walsh杂志
                </a>
            </div>
            <section class="ar-text-body" :style="arTextBody">
                <img class="ar-img" :style="arImg" src="/static/images/bench1.png">
                <div class="ar-in-title" :style="arInTitle">
                    Sagmeister & Walsh 搞事
                </div>
                <div class="ar-content" :style="arContent">
                    Sagmeister & Walsh 最近把网站和办公室都全新改版了，网站变得很酷，首页是他们办公室的24小时动态录像直播（中国内地可能需要翻墙才能观看）！听起来是不是很有创意呢？这可是前无古人后无来者事儿！
                </div>
                <img class="ar-img" :style="arImg" src="/static/images/detial1.png">
                <div class="ar-in-title" :style="arInTitle">
                    凉州词(王翰)
                </div>
                <div class="ar-content" :style="arContent">
                    <div style="text-align: center;">
                        葡萄美酒夜光杯，欲饮琵琶马上催。 <br>
                        醉卧沙场君莫笑，古来征战几人回？
                    </div>
                </div>
                <img class="ar-img" :style="arImg" src="/static/images/img1.png">
                <div class="ar-in-title" :style="arInTitle">
                    产品详细规格参数
                </div>
                <div class="ar-content" :style="arContent">
                    Sagmeister & Walsh 最近把网站和办公室都全新改版了，网站变得很酷，首页是他们办公室的24小时动态录像直播（中国内地可能需要翻墙才能观看）！
                </div>
            </section>
            
            <img class="ar-img" :style="arImg" :src="base.fileEndPic">
        </section>
    </section>
</template>
<script>
import upload from '../../../components/common/upload'
import util from '../../../assets/common/util'
import templateMixin from '../../../assets/common/templateMixin'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            isOperate: true,
            base: {
                templateTitle: '',
                templateType: '',
                titleBackground: '/static/images/ar-title-top.jpg',
                titleBlockHeight: 76,
                titleMaxInput: 30,
                titleFontSize: 18,
                titleLineHeight: 30,
                titleFontColor: '#000000',
                titleFontStyle: 'normal',
                titleAlignment: 'center',
                titleTopHeight: 3,
                titleMarginTop: 0,
                editorDateBlockHeight: '36',
                editorDateFontSize: '14',
                editorDateLineHeight: '36',
                editorDateFontColor: '#999999',
                editorDateFontStyle: 'normal',
                editorDateStyle: 'space-between',
                editorDateSpace: '',
                editorLink: '',
                dateStyle: 'yyyy-MM-dd',
                editorMaxInput: 30,
                innerTitleBackground: '/static/images/ar-title-bg.jpg',
                innerTitleBlockHeight: 60,
                innerTitleMaxInput: 30,
                innerTitleFontSize: 16,
                innerTitleFontType: 30,
                innerTitleFontColor: '#000000',
                innerTitleFontStyle: 'normal',
                innerTitleAlignment: 'center',
                innerTitleTopHeight: 15,
                innerTitleMarginTop: 20,
                fileTaxtMaxInput: 500,
                fileFontSize: 14,
                fileTaxtLineHeight: 24,
                fileFontType: 'normal',
                fileBlcokTopHeight: 0,
                fileBackground: '',
                fileMarginTop: 20,
                fileEndPic: '/static/images/end-img.jpg'
            },
            templateTypes: [],
            fontStyles: [
                {
                    label: '标准',
                    value: 'normal'
                },
                {
                    label: '斜体',
                    value: 'italic'
                },
                {
                    label: '倾斜',
                    value: 'oblique'
                }
            ],
            alignmentStyles: [
                {
                    label: '左对齐',
                    value: 'left'
                },
                {
                    label: '居中',
                    value: 'center'
                },
                {
                    label: '右对齐',
                    value: 'right'
                },
                {
                    label: '两端对齐',
                    value: 'justify'
                }
            ],
            alignmentDateStyles: [
                {
                    label: '左对齐',
                    value: 'flex-start'
                },
                {
                    label: '居中',
                    value: 'center'
                },
                {
                    label: '右对齐',
                    value: 'flex-end'
                },
                {
                    label: '两端对齐',
                    value: 'space-between'
                },
                {
                    label: '间隔对齐',
                    value: 'space-around'
                }
            ],
            dateStyles: [
                {
                    label: '2017年10月10日',
                    value: 'yyyy年MM月dd日'
                },
                {
                    label: '2017-10-10',
                    value: 'yyyy-MM-dd'
                },
                {
                    label: '2017/10/10',
                    value: 'yyyy/MM/dd'
                },
                {
                    label: '2017-10-10 12:12:12',
                    value: 'yyyy-MM-dd hh:mm:ss'
                }
            ]
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate: util.formatDate
    },
    mounted () {
        this.getBase()
        this.getTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    methods: {
        getBase () {
            util.request({
                method: 'get',
                interface: 'getTemplates',
                data: {
                    templateCode: this.$route.query.templateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var obj = res.result.result[0]

                    if (obj) {
                        for (var key in obj) {
                            if (!obj[key]) {
                                delete obj[key]
                            }
                        }
                    }

                    this.base = Object.assign(this.base, obj)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'disOfEnterpriseInfo',
                data: {
                  types: 'template_type'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.templateTypes = res.result.result.template_type
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveBase () {
            if (!this.base.templateTitle) {
                this.$message({
                    message: '请填写模版标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.base.templateType) {
                this.$message({
                    message: '请选择模版类型！',
                    type: 'warning'
                })
                return false
            }

            util.request({
                method: 'post',
                interface: 'insertTemplate',
                data: this.base
            }).then(res => {
                if (res.result.success == '1') {
                    this.getBase()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeTitleBg (data) {
            this.base.titleBackground = data.url
        },
        changeInnerTitleBg (data) {
            this.base.innerTitleBackground = data.url
        },
        changeFileBackground (data) {
            this.base.fileBackground = data.url
        },
        changeFileEndPic (data) {
            this.base.fileEndPic = data.url
        }
    },
    components: {
        upload
    }
}
</script>
<style lang="scss">
.article-template-box {
    width: 1060px;
    margin: 80px auto 30px;
    overflow: hidden;

    .el-color-picker {
        width: 200px;

        .el-color-picker__trigger {
            height: 30px;
            padding: 3px;
        }
    }

    .block-title {
        clear: both;
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .left-content {
        float: left;
        width: 640px;
    }

    .right-content {
        box-sizing: border-box;
        padding: 15px 0;
        border: 1px solid #bfcbd9;
        border-radius: 3px;
        float: right;
        width: 350px;
        margin-top: 180px;
    }
}
</style>