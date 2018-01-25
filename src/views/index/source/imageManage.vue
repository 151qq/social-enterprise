<template>
    <div class="image-su-box">
        <section class="btns-op" v-if="isEdit">
            <img v-show="!isCheck" src="../../../assets/images/select-icon.png" @click="setCheck">
            <img v-show="isCheck" src="../../../assets/images/select-now.png" @click="setCheck">
            <span v-if="showType != '1'"></span>
            <img :class="isCheck ? '' : 'disable'"
                    src="../../../assets/images/import-icon.png"
                    v-if="showType != '1'"
                    @click="setImport">
            <span></span>
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/delete-icon-n.png"
                    @click="deleteOpt">
            <span></span>
            <div v-if="showType == '1' && fileType != 'e2_2'" class="up-box">
                <img @click="addDir" src="../../../assets/images/adds-icon.png">
            </div>
            <div v-if="showType == '2'" class="up-box">
                <img  @click="addItem" src="../../../assets/images/adds-icon.png">
            </div>
        </section>
        
        <!-- 目录 -->
        <div class="clear"></div>
        <template v-if="showType == '1'">
            <section v-for="(item, index) in dirDatas"
                        v-if="dirDatas.length"
                        class="check-box">

                <section v-if="isCheck && isEdit" @click.stop="selectDir(item)"
                        class="select-box"
                        :class="selectDirList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                <section class="sou-box">
                    <div class="cover-box" @click="showItems(item, index)">
                        <img class="cover-img" :src="item.docCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <div class="time">
                            {{item.docCreateTime}}
                            
                            <span class="btn-box" v-if="isEdit">
                                <i @click.stop="editDir(item)" class="el-icon-document"></i>
                            </span>
                        </div>
                    </div>
                </section>
            </section>
            <section v-if="!dirDatas.length" class="no-img">
                当前暂无目录，请添加目录！！！
            </section>
            <div class="clear"></div>
            <el-pagination
                v-if="dirTotal"
                class="page-box"
                @current-change="dirPageChange"
                layout="prev, pager, next"
                :total="dirTotal">
            </el-pagination>
        </template>
        
        
        <!-- 内容 -->
        <template v-else>
            <el-button class="go-back" @click="showDir">返回</el-button>

            <section v-for="(item, index) in sourceDatas"
                        v-if="sourceDatas.length"
                        class="check-box">

                <section v-if="isCheck && isEdit" @click.stop="selectItem(item)"
                            class="select-box"
                            :class="selectItemList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                
                <section class="sou-box">
                    <!-- 图片 -->
                    <div class="cover-box" @click.stop="showBigImg(item)" v-if="item.docType == '2'">
                        <img class="cover-img" :src="item.fileCode">
                    </div>
                    <!-- 媒体 -->
                    <div class="cover-box media-play"
                        @click.stop="showMedia(item)" v-if="item.docType == '3'">
                        <div class="bg-box"></div>
                        <img class="play-btn" src="/static/images/play-icon.png">
                        <img class="cover-img" :src="item.docCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <span class="time">
                            {{item.docCreateTime}}

                            <span class="btn-box" v-if="isEdit">
                                <i @click="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </span>
                    </div>
                </section>
            </section>
            <section v-if="!sourceDatas.length" class="no-img">
                当前无素材，请上传素材！！！
            </section>
            
            <div class="clear"></div>
            <el-pagination
                v-if="itemTotal"
                class="page-box"
                @current-change="itemPageChange"
                layout="prev, pager, next"
                :total="itemTotal">
            </el-pagination>
        </template>
        <div class="clear"></div>
        
        <el-dialog title="目录" :visible.sync="isAddDir">
          <el-form :label-position="'left'" :model="addDirForm" label-width="80px">
            <el-form-item label="目录封面">
                <upload-file :path="addDirForm.docCover"
                        :is-operate="isEdit"
                        :bg-path="false"
                        :id-name="'dirCover' + fileType"
                        @changeImg="changeDirImg"></upload-file>
            </el-form-item>
            <el-form-item label="目录名称">
                <el-input v-model="addDirForm.docTitle" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="目录描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addDirForm.docDesc">
                </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddDir = false">取 消</el-button>
                <el-button type="primary" @click="confirmDir">保 存</el-button>
          </div>
        </el-dialog>

        <el-dialog title="素材" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="类型">
                <el-select v-model="addItemForm.docType"
                            placeholder="请选择"
                            :disabled="isNotImg">
                    <el-option
                      v-for="(item, index) in sourseTypes"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 图片 -->
            <template v-if="!isNotImg && addItemForm.docType == '2'">
                <el-form-item v-if="!isNotImg" label="图片">
                    <upload-file :path="addItemForm.fileCode"
                            :is-operate="true"
                            :bg-path="false"
                            :id-name="'itemCover' + fileType"
                            @changeImg="changeItem"></upload-file>
                </el-form-item>
            </template>
            <!-- 媒体 -->
            <template v-if="addItemForm.docType == '3'">
                <el-form-item v-if="!isNotImg" label="媒体文件">
                    <upload-media :file-type="'media'"
                                  :path="addItemForm.fileCode"
                                  :media-name="fileName"
                                  @mediaChange="changeItem"></upload-media>
                </el-form-item>
                <el-form-item label="媒体封面">
                    <upload-file :path="addItemForm.docCover"
                            :is-operate="isEdit"
                            :bg-path="false"
                            :id-name="'itemCover' + fileType"
                            @changeImg="coverChange"></upload-file>
                </el-form-item>
            </template>
            
            <el-form-item label="素材标题">
                <el-input v-model="addItemForm.docTitle" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="素材描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.docDesc">
                </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>

        <!-- 移动 -->
        <el-dialog title="移动" :visible.sync="isselectVisible">
            <section class="dia-s-body">
                <el-checkbox-group 
                    v-model="checkedLabels"
                    :min="0"
                    :max="10">
                    <el-checkbox v-for="(item, index) in dirDatas" :label="item.docCode" :key="index">
                        {{item.docTitle}}
                    </el-checkbox>
                </el-checkbox-group>
            </section>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="isselectVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 大图 -->
        <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
    </div>
</template>
<script>
import $ from 'Jquery'
import sortable from 'sortablejs'
import uploadFile from '../../../components/common/uploadFile.vue'
import uploadMedia from '../../../components/common/uploadMedia.vue'
import swiperImg from '../../../components/common/swiper-img.vue'
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    props: ['fileType'],
    data() {
        return {
            dirDatas: [],
            sourceDatas: [],
            isCheck: false,
            showType: '1',
            isAddDir: false,
            addDirForm: {
                docType: '1',
                docTitle: '',
                docCover: '',
                docDesc: '',
                fileCode: '',
                docFolder: ''
            },
            isNotImg: false,
            isAddItem: false,
            fileName: '',
            addItemForm: {
                docType: '',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docCover: '',
                docFolder: ''
            },
            sourseTypes: [
                {
                    label: '图片',
                    value: '2'
                },
                {
                    label: '媒体',
                    value: '3'
                }
            ],
            checkedLabels: [],
            isselectVisible: false,
            nowDir: {},
            // 选中的图片
            selectDirList: [],
            selectItemList: [],
            bigImgs: [],
            dirPageNumber: 1,
            dirPageSize: 12,
            dirTotal: 0,
            itemPageNumber: 1,
            itemPageSize: 12,
            itemTotal: 0,
            isShow: {
              value: false
            },
            index: 0
        }
    },
    mounted () {
        if (this.$route.query.docCode) {
            this.showType = '2'
            this.getItems(this.$route.query.docCode)
        }
        this.getDirs()
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
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectDirList = []
            this.selectItemList = []
        },
        addDir () {
            this.addDirForm = {
                docType: '1',
                docTitle: '',
                docCover: '',
                docDesc: '',
                fileCode: '',
                docFolder: this.fileType
            }

            this.isAddDir = true
        },
        addItem () {
            this.isNotImg = false
            this.addItemForm = {
                docType: '',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docCover: '',
                docFolder: this.nowDir.docCode
            }

            this.isAddItem = true
        },
        editDir (item) {
            this.addDirForm = Object.assign({}, item)
            this.isAddDir = true
        },
        editItem (item) {
            this.isNotImg = true
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeDirImg (data) {
            this.addDirForm.docCover = data.url
        },
        changeItem (data) {
            this.addItemForm.fileCode = data.url
        },
        coverChange (data) {
            this.addItemForm.docCover = data.url
        },
        confirmDir () {
            if (!this.addDirForm.docTitle) {
                this.$message({
                    message: '请填写目录名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addDirForm.docCover) {
                this.$message({
                    message: '请添加目录封面！',
                    type: 'warning'
                })
                return false
            }

            this.addDirForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addDirForm.docCode) {
                this.updateDir()
            } else {
                this.insterDir()
            }
        },
        confirmItem () {
            if (!this.addItemForm.docTitle) {
                this.$message({
                    message: '请填写图片标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.fileCode) {
                this.$message({
                    message: '请添加图片封面！',
                    type: 'warning'
                })
                return false
            }

            this.addItemForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addItemForm.docCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        selectDir (item) {
            var index = this.selectDirList.indexOf(item.docCode)
            if (index > -1) {
                this.selectDirList.splice(index, 1)
            } else {
                this.selectDirList.push(item.docCode)
            }
        },
        selectItem (item) {
            var index = this.selectItemList.indexOf(item.docCode)
            if (index > -1) {
                this.selectItemList.splice(index, 1)
            } else {
                this.selectItemList.push(item.docCode)
            }
        },
        showBigImg (item, index) {
            if (this.isCheck) {
                this.selectItem(item)
                return false
            }

            this.index = index
            this.isShow.value = true
        },
        showMedia (item) {
            if (this.isCheck) {
                this.selectItem(item)
            } else {
                window.open (item.fileCode, '_blank')
            }
        },
        showItems (item) {
            if (this.isCheck) {
                this.selectDir(item)
                return false
            }

            this.isCheck = false
            this.showType = '2'
            this.nowDir = item
            this.getItems()
        },
        showDir () {
            this.isCheck = false
            this.showType = '1'
        },
        itemPageChange (size) {
            this.itemPageNumber = size
            this.getItems()
        },
        getItems (docCode) {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: docCode ? docCode : this.nowDir.docCode,
                    pageNumber: this.itemPageNumber,
                    pageSize: this.itemPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.bigImgs = []
                    var arrs = []
                    this.itemTotal = Number(res.result.total)
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                        arrs.push(item.fileCode)
                    })

                    this.bigImgs = arrs

                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.itemPageNumber = 1
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItems () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '2',
                    docCodes: this.selectItemList
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        dirPageChange (size) {
            this.dirPageNumber = size
            this.getDirs()
        },
        getDirs () {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: this.fileType,
                    pageNumber: this.dirPageNumber,
                    pageSize: this.dirPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirTotal = Number(res.result.totalPages)

                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                    })

                    this.dirDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirPageNumber = 1
                    this.getDirs()
                    this.isAddDir = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                    this.isAddDir = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteDirs () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '1',
                    docCodes: this.selectDirList
                }
            }).then(res => {
                if (res.result.success == '1') {
                    if (res.result.result.length) {
                        this.$message({
                            message: '部分目录下有文件存在，未能删除！',
                            type: 'warning'
                        })
                    }
                    this.getDirs()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteOpt () {
            if (!this.isCheck) {
                return false
            }

            this.$confirm('确定执行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.showType == '1') {
                    this.deleteDirs()
                } else {
                    this.deleteItems()
                }
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })     
            })
        },
        setImport () {
            if (!this.isCheck || this.showType == '1') {
                return false
            }
            this.checkedLabels = []
            this.isselectVisible = true
        },
        selectConfirm () {
            this.removeItem()
        },
        removeItem () {
            util.request({
                method: 'post',
                interface: 'materialMove',
                data: {
                    files: this.selectItemList,
                    dirs: this.checkedLabels
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isselectVisible = false
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        copyItem () {
            util.request({
                method: 'post',
                interface: 'materialCopy',
                data: {
                    files: this.selectItemList,
                    dirs: this.checkedLabels
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isselectVisible = false
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        }
    },
    components: {
        uploadFile,
        uploadMedia,
        swiperImg
    }
}
</script>
<style lang="scss">
.el-tabs__content {
    overflow: visible;
}

.image-su-box {
    position: relative;

    .page-box {
        margin-top: 10px;
    }

    .go-back {
        height: 30px;
        position: fixed;
        right: 10px;
        top: 100px;
        padding: 0 15px;
    }

    .check-box {
        position: relative;
        float: left;
        width: 170px;
        margin-right: 20px;
        margin-bottom: 20px;

        .select-box {
            position: absolute;
            left: 15px;
            top: 15px;
            width: 16px;
            height: 16px;
            cursor: pointer;
            background: url(../../../assets/images/check-icon.png) center no-repeat;

            &.active {
                background: url(../../../assets/images/check-now.png) center no-repeat;
            }
        }
    }

    .sou-box {
        border: 1px solid #D3DCE6;
        border-radius: 3px;

        .cover-box {
            height: 170px;
            overflow: hidden;
            cursor: pointer;
            
            .cover-img {
                display: block;
                width: 100%;
                min-height: 170px;
            }
        }

        .media-play {
            position: relative;

            .bg-box {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 170px;
                background: #000000;
                opacity: 0.5;
            }

            .play-btn {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 80px;
                height: 80px;
                margin: -40px 0 0 -40px;
            }
        }

        .title-box {
            padding: 5px 10px;
            border-top: 1px solid #D3DCE6;
            
            .title {
                display: block;
                font-size: 14px;
                line-height: 20px;
                border: none;
                color: #000000;
            }

            .time {
                display: block;
                font-size: 12px;
                line-height: 20px;
                color: #999999;
            }

            .btn-box {
               float: right;
               font-size: 14px;
               color: #333333;

               i, label {
                    cursor: pointer;
               }
            }
        }
    }
}
</style>