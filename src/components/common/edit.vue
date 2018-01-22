<template>
    <section class="edit-box">
        <section class='bodyMain' :style="arTextBody">
            <div :style="arContent" 
                    v-for="(item, index) in articleList"
                    :data-id="index"> 
                
                <template v-if="!isLook">
                    <div class="show-box" v-if="item.type === 'upload'">
                        <upload
                            :path="item.imgUrl"
                            :id-name="'edit-img' + index"
                            :item-index="index"
                            @changeImg="changeImg"></upload>
                    </div>

                    <div class="show-box" v-if="item.type === 'text'">
                        <ueditor :editor-id="'editorText' + index"
                                    :editor-type="'text'"
                                    :index="index"
                                    :content="item.content"
                                    @setContent="setContent"></ueditor>
                    </div>

                    <div class="show-box" v-if="item.type === 'table'">
                        <ueditor :editor-id="'editorTable' + index"
                                    :editor-type="'table'"
                                    :index="index"
                                    :content="item.content"
                                    @setContent="setContent"></ueditor>
                    </div>

                    <div class="show-box" v-if="item.type === 'map'">
                        <div v-html="item.content"></div>
                    </div>

                    <div class="show-box" v-if="item.type === 'title'">
                        <input  type="text"
                                class="input-title" 
                                v-model="item.title"
                                @blur="titleBlur(item, index)"
                                :style="arInTitle"
                                placeholder="编辑中的内标题样式">
                    </div>

                    <div class="show-box" v-if="item.type === 'specList'">
                        <div class="spec-box" v-html="item.content"></div>
                    </div>

                    <div class="show-box" v-if="item.type === 'userScence'">
                        <div class="scence-box" v-html="item.content"></div>
                    </div>
                </template>

                <div v-if="isLook" v-html="item.content"></div>

                <section v-if="!isLook" class="btn-show">
                    <div class="btn-hover">
                        <el-button class="delete-btn" type="danger"
                                :plain="true" size="small"
                                :icon="btnShowIndex === index ? 'caret-left' : 'caret-right'"
                                @click="showHiddenBtn(index)">操作</el-button>

                        <template v-if="btnShowIndex === index">
                            <el-button class="delete-btn" type="danger"
                                :plain="true" size="small"icon="delete"
                                @click="deleteArticleArea(item.pageAreaCode, index)">删除</el-button>
                            <el-button class="delete-btn" type="danger"
                                    v-if="item.type == 'map'"
                                    :plain="true" size="small" icon="setting"
                                    @click="changeMap(index)">更改</el-button>
                            <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small" icon="caret-bottom"
                                    @click="downMove(index)">下移</el-button>
                            <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small" icon="caret-top"
                                    @click="upMove(index)">上移</el-button>
                            <div class="sort-box">
                                编号：{{index}} &nbsp;&nbsp;
                                移动至
                                <el-input
                                    class="sortInput"
                                    size="small"
                                    min="0"
                                    placeholder="编号"
                                    v-model="sortNum">
                                    <el-button slot="append" @click="moveArea(index)">go</el-button>
                                </el-input>
                            </div>
                        </template>
                    </div>
                </section>
            </div>
        </section>
        <div class="edit-btn">
            <div @click="addTem('look')">
                <img class="gray-box" src="../../assets/images/add-look-icon.png">
                <img class="now-box" src="../../assets/images/look-icon.png">
            </div>
            <div @click="addTem('upload')">
                <img class="gray-box" src="../../assets/images/add-img-icon.png">
                <img class="now-box" src="../../assets/images/img-now.png">
            </div>
            <div @click="addTem('text')">
                <img class="gray-box" src="../../assets/images/add-text-icon.png">
                <img class="now-box" src="../../assets/images/text-now.png">
            </div>
            <div @click="addTem('table')">
                <img class="gray-box" src="../../assets/images/add-table-icon.png">
                <img class="now-box" src="../../assets/images/table-now.png">
            </div>
            <div @click="addTem('specList')">
                <img class="gray-box" src="../../assets/images/add-table-icon.png">
                <img class="now-box" src="../../assets/images/table-now.png">
            </div>
            <div @click="addTem('userScence')">
                <img class="gray-box" src="../../assets/images/add-table-icon.png">
                <img class="now-box" src="../../assets/images/table-now.png">
            </div>
            <div @click="addTem('map')">
                <img class="gray-box" src="../../assets/images/add-map-icon.png">
                <img class="now-box" src="../../assets/images/map-now.png">
            </div>
            <div class="title-box" @click="addTem('title')">
                <img class="gray-box" src="../../assets/images/add-title-icon.png">
                <img class="now-box" src="../../assets/images/title-now.png">
            </div>
            <div class="save-box" @click="saveAll">
                <img class="gray-box" src="../../assets/images/save-all-data.png">
                <img class="now-box" src="../../assets/images/save-now.png">
            </div>
        </div>

        <search-map :is-add="isMapBox" :map-data="mapData" ref="searchMap" @setMap="setMap"></search-map>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import templateMixin from '../../assets/common/templateMixin'
import upload from './upload'
import ueditor from './ueditor'
import $ from 'Jquery'
import searchMap from '../../components/common/searchMap'

export default {
    data () {
        return {
            base: {},
            articleList: [],
            isMapBox: {
                value: false
            },
            mapData: {
                address: '',
                point: '',
                content: ''
            },
            sortNum: '',
            btnShowIndex: '',
            isLook: false,
            tableStyle: {
                'border': '1px solid #D3DCE6',
                'border-bottom': 'none'
            },
            rowStyle: {
                'overflow': 'hidden',
                'min-height': '40px',
                'box-sizing': 'border-box',
                'padding': ' 10px 10px 10px 180px',
                'position': 'relative',
                'font-size': '14px',
                'color': '#000000',
                'line-height': '20px',
                'border-bottom': '1px solid #D3DCE6'
            },
            leftStyle: {
                'width': '180px',
                'box-sizing': 'border-box',
                'position': 'absolute',
                'left': '0',
                'top': '0',
                'font-size': '14px',
                'color': '#000000',
                'line-height': '20px',
                'padding': '10px'
            },
            oddStyle: {
                'background': '#f9f9f9'
            },
            headStyle: {
                'background': '#F0F0F0'
            }
        }
    },
    mixins: [templateMixin],
    mounted () {
        this.getTemplate()
        this.getAreaList()
    },
    methods:{
        // 初始
        editInte (data) {
            var arrData = []
            data.forEach((item) => {
                if (item.pageAreaSequence >= 20) {
                    switch (item.pageAreaType) {
                        case 'upload':
                            var data = {
                                type: 'upload',
                                imgUrl: $(item.pageAreaContent).attr('src'),
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                        case 'text':
                            var data = {
                                type: 'text',
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                        case 'table':
                            var data = {
                                type: 'table',
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                        case 'specList':
                            var data = {
                                type: 'specList',
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                        case 'userScence':
                            var data = {
                                type: 'userScence',
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                        case 'map':
                            var data = {
                                type: 'map',
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode,
                            }
                            data = Object.assign(data, this.getMapData(item.pageAreaContent))

                            arrData.push(data)
                            break
                        case 'title':
                            var data = {
                                type: 'title',
                                title: $(item.pageAreaContent).text(),
                                content: item.pageAreaContent,
                                pageAreaCode: item.pageAreaCode
                            }
                            arrData.push(data)
                            break
                    }
                }
            })
            this.articleList = arrData
        },
        getMapData (el) {
            var url = $(el).attr('src')
            var queryArr = url.split('&')
            var len = queryArr.length
            return {
                address: queryArr[len - 1].split('=')[1],
                point: queryArr[len - 2].split('=')[1]
            }
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
                    this.editInte(res.result.result)
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
                    this.base = Object.assign(res.result.result[0], this.base)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        // 增加
        addTem (type) {
            switch (type) {
                case 'upload':
                    var data = {
                        type: 'upload',
                        imgUrl: '',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'text':
                    var data = {
                        type: 'text',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'table':
                    var data = {
                        type: 'table',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'specList':
                    this.getSpecList()
                    break
                case 'userScence':
                    this.getUserScence()
                    break
                case 'map':
                    this.mapData = {
                        type: 'map',
                        address: '',
                        point: '',
                        content: ''
                    }
                    this.isMapBox.value = true
                    setTimeout(() => {
                        this.$refs.searchMap.initMap()
                    }, 0)
                    break
                case 'title':
                    var data = {
                        type: 'title',
                        title: '',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'look':
                    this.isLook = !this.isLook
                    break
            }
        },
        formDataStyle (styleData) {
            var str = JSON.stringify(styleData).trim()
            str = str.substring(1, str.length - 1)
            return str.replace(/,/g, ';').replace(/"/g, '')
        },
        getSpecList () {
            var data = {
                type: 'specList',
                content: ''
            }

            var content = '<div style="' + this.formDataStyle(this.rowStyle) + ';' + this.formDataStyle(this.headStyle) + '"><div style="' + this.formDataStyle(this.leftStyle) + '">规格名称</div>规格说明</div>'

            util.request({
                method: 'get',
                interface: 'productParameterList',
                data: {
                  productCode: 'productcatalog20171217151955507173'
                }
            }).then(res => {
                if (!res.result.result.length) {
                    this.$message({
                          message: '该产品未添加规格数据！',
                          type: 'warning'
                    })
                }

                res.result.result.forEach((item, index) => {
                    var evenOoddStyle = ''
                    if (index % 2 == 1) {
                        evenOoddStyle = this.formDataStyle(this.oddStyle)
                    }
                    var template = '<div style="' + this.formDataStyle(this.rowStyle) + ';' + evenOoddStyle + '"><div style="' + this.formDataStyle(this.leftStyle) + '">' + item.productParameterKey + '</div>' + item.productParameterValue + '</div>'

                    content += template
                })

                content = '<div style="' + this.formDataStyle(this.tableStyle) + '">' + content + '</div>'

                data.content = content

                this.articleList.push(data)
            })
        },
        getUserScence () {
            var data = {
                type: 'userScence',
                content: ''
            }

            var content = '<div style="' + this.formDataStyle(this.rowStyle) + ';' + this.formDataStyle(this.headStyle) + '"><div style="' + this.formDataStyle(this.leftStyle) + '">场景名称</div>推荐产品</div>'

            util.request({
                method: 'get',
                interface: 'productScenarioList',
                data: {
                  productCode: 'productcatalog20171217151955507173'
                }
            }).then(res => {
                if (!res.result.result.length) {
                    this.$message({
                          message: '该产品未添加规格数据！',
                          type: 'warning'
                    })
                }

                res.result.result.forEach((item, index) => {
                    var evenOoddStyle = ''
                    if (index % 2 == 1) {
                        evenOoddStyle = this.formDataStyle(this.oddStyle)
                    }
                    var template = '<div style="' + this.formDataStyle(this.rowStyle) + ';' + evenOoddStyle + '"><div style="' + this.formDataStyle(this.leftStyle) + '">' + item.productScenarioCname + '</div>' + item.productScenarioProductName + '</div>'

                    content += template
                })

                content = '<div style="' + this.formDataStyle(this.tableStyle) + '">' + content + '</div>'

                data.content = content

                this.articleList.push(data)
            })
        },
        // 删除
        deleteArticleArea (code, index) {
            if (code) {
                util.request({
                    method: 'post',
                    interface: 'deletePageArea',
                    data: {
                        pageAreaCode: code
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.getAreaList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            } else {
                this.articleList.splice(index, 1)
            }
        },
        // 修改
        setMap (data) {
            if (data.index === '') {
                var obj = {
                    type: 'map',
                    point: data.point,
                    content: data.content,
                    address: data.address
                }
                this.articleList.push(obj)
            } else {
                var obj = this.articleList[data.index]
                obj.point = data.point
                obj.content = data.content
                obj.address = data.address
            }

            this.isMapBox.value = false
        },
        changeMap (index) {
            this.mapData = Object.assign({}, this.articleList[index])
            this.isMapBox.value = true
            setTimeout(() => {
                this.$refs.searchMap.initMap(index)
            }, 0)
        },
        changeImg (data) {
            var obj = {
                imgUrl: data.url,
                content: '<img src="' + data.url + '" style="' + this.formDataStyle(this.arImg) +'">'
            }

            var imgData = Object.assign(this.articleList[data.index], obj)

            this.articleList.splice(data.index, 1, imgData)
        },
        setContent (data) {
            this.articleList[data.index].content = data.content
        },
        titleBlur (item, index) {
            this.articleList[index].content = '<div style="' + this.formDataStyle(this.arInTitle) + '">' + item.title + '</div>'
        },
        // 保存
        saveData (item, index) {
            util.request({
                method: 'post',
                interface: 'html5PageAreaSave',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode,
                    pageAreaCode: item.pageAreaCode,
                    pageAreaType: item.type,
                    pageAreaSequence: index + 20,
                    pageAreaContent: item.content
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.articleList[index].pageAreaCode = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveAll () {
            this.articleList.forEach((item, index) => {
                this.saveData(item, index)
            })
        },
        // 操作按钮
        showHiddenBtn (index) {
            if (this.btnShowIndex === index) {
                this.sortNum = ''
                this.btnShowIndex = ''
                return false
            }
            this.btnShowIndex = index
        },
        upMove (index) {
            this.moveTo(index, index - 1)
            console.log(this.articleList)
        },
        downMove (index) {
            this.moveTo(index, index + 1)
        },
        moveArea (index) {
            if (this.sortNum === '') {
                return
            }
            this.moveTo(index, Math.floor(this.sortNum))
        },
        moveTo (oldIndex, newIndex) {
            var toIndex = ''
            if (newIndex < 0) {
                toIndex = 0
            } else if (newIndex > this.articleList.length - 1) {
                toIndex = this.articleList.length - 1
            } else {
                toIndex = newIndex
            }

            var obj = this.articleList[oldIndex]
            
            if (oldIndex > toIndex) {
                // 上移 先移除，后添加
                this.articleList.splice(oldIndex, 1)
                this.articleList.splice(toIndex, 0, obj)
            } else if (oldIndex < toIndex) {
                // 下移 先添加，后移除
                this.articleList.splice(toIndex, 0, obj)
                this.articleList.splice(oldIndex, 1)
            }

            this.btnShowIndex = toIndex
            this.sortNum = ''

            if (oldIndex === toIndex) {
                return
            }

            var data = this.articleList.concat([])
            this.articleList = []
            setTimeout(() => {
                this.articleList = data.concat([])
            }, 0)
        }
    },
    components: {
        upload,
        ueditor,
        searchMap
    }
}
</script>
<style lang="scss">
.edit-box {
    position: relative;
    min-height: 500px;

    .edui-editor {
        min-height: 180px;
    }

    .bodyMain {
        min-height: 500px;
    }

    .show-box {
        cursor: pointer;

        .img-default {
            display: block;
            width: 100%;
            margin: auto;
        }
    }

    .input-title {
        width: 100%;
        margin: 0;
        padding: 0;
        border: none;
    }

    .btn-show {
        .btn-hover {
            display: block;
            margin-top: 10px;
            overflow: hidden;

            .sort-box {
                float: left;

                .sortInput {
                    width: 80px;
                    height: 28px;

                    .el-input__inner {
                        height: 28px;
                    }

                    .el-input-group__append {
                        padding: 0;
                    }
                }
            }
        }

        .btns {
            background: #EFF2F7;
            display: block;
            padding: 12px;
            overflow: hidden;

            .del-btn {
              float: right;
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 9px;

              &:hover {
                opacity: 0.8;
              }
            }
        }


        .delete-btn {
            float: right;
            margin-left: 10px;
        }
    }

    .edit-btn {
        position: absolute;
        width: 100px;
        right: -110px;
        bottom: 0;

        div {
            width: 48px;
            height: 48px;
            overflow: hidden;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;

            img {
                display: block;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #ffffff;
            }

            .now-box {
                display: none;
            }

            &:hover {
                .gray-box {
                    display: none;
                }

                .now-box {
                    display: block;
                }
            }
        }

        .title-box {
            width: 54px;
            height: 54px;
            margin-left: -3px;
        }

        .save-box {
            width: 42px;
            height: 42px;
            margin-left: 3px;
        }
    }
}
</style>