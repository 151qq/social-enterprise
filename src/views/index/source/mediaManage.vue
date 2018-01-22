<template>
    <div class="media-su-box">
        <section class="btns-op">
            <img v-show="!isCheck" src="../../../assets/images/select-icon.png" @click="setCheck">
            <img v-show="isCheck" src="../../../assets/images/select-now.png" @click="setCheck">
            <span></span>
            <img :class="isCheck ? '' : 'disable'"
                    src="../../../assets/images/import-icon.png"
                    v-if="showType != 'dir'"
                    @click="setImport">
            <span></span>
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/delete-icon-n.png"
                    @click="deleteOpt">
            <span v-if="showType == 'dir'"></span>
            <div v-if="showType == 'dir'" class="up-box">
                <img @click="addDir" src="../../../assets/images/adds-icon.png">
            </div>
            <div v-else class="up-box">
                <img  @click="addItem" src="../../../assets/images/adds-icon.png">
            </div>
        </section>
        
        <!-- 目录 -->
        <div class="clear"></div>
        <template v-if="showType == 'dir'">
            <section v-for="(item, index) in dirDatas"
                        v-if="dirDatas.length"
                        class="check-box">

                <section v-if="isCheck" @click.stop="selectDir(item)"
                        class="select-box"
                        :class="selectDirList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                <section class="sou-box">
                    <div class="cover-box" @click="showItems(item)">
                        <img :src="item.docCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <div class="time">
                            {{item.docCreateTime}}

                            <span class="btn-box">
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

                <section v-if="isCheck" @click.stop="selectItem(item)"
                            class="select-box"
                            :class="selectItemList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                <section class="sou-box">
                    <div class="cover-box" @click.stop="showMedia(item)">
                        <img :src="item.docCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <span class="time">
                            {{item.docCreateTime}}

                            <span class="btn-box">
                                <i @click="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </span>
                    </div>
                </section>
            </section>
            <section v-if="!sourceDatas.length" class="no-img">
                当前暂无媒体，请上传！！！
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
                        :is-operate="true"
                        :bg-path="true"
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

        <el-dialog title="媒体" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item v-if="!isNotImg" label="媒体文件">
                <upload-media :file-type="'media'"
                              :path="addItemForm.fileCode"
                              :media-name="fileName"
                              @mediaChange="mediaChange"></upload-media>
            </el-form-item>
            <el-form-item label="媒体封面">
                <upload-file :path="addItemForm.docCover"
                        :is-operate="true"
                        :bg-path="true"
                        :id-name="'itemCover' + fileType"
                        @changeImg="changeItemImg"></upload-file>
            </el-form-item>
            <el-form-item label="媒体标题">
                <el-input v-model="addItemForm.docTitle" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="媒体描述">
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
    </div>
</template>
<script>
import $ from 'Jquery'
import sortable from 'sortablejs'
import uploadFile from '../../../components/common/uploadFile.vue'
import uploadMedia from '../../../components/common/uploadMedia.vue'
import util from '../../../assets/common/util'

export default {
    props: ['fileType'],
    data() {
        return {
            dirDatas: [],
            sourceDatas: [],
            isCheck: false,
            showType: 'dir',
            isAddDir: false,
            addDirForm: {
                docType: 'dir',
                docTitle: '',
                docCover: '',
                docDesc: '',
                docFolder: ''
            },
            isNotImg: false,
            isAddItem: false,
            fileName: '',
            addItemForm: {
                docType: 'media',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docFolder: '',
                docCover: ''
            },
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
            itemTotal: 0
        }
    },
    mounted () {
        if (this.$route.query.docCode) {
            this.showType = 'pic'
            this.getItems(this.$route.query.docCode)
        }
        this.getDirs()
    },
    methods: {
        mediaChange (data) {
            this.addItemForm.fileCode = data.url
        },
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectDirList = []
            this.selectItemList = []
        },
        addDir () {
            this.addDirForm = {
                docType: 'dir',
                docTitle: '',
                docCover: '',
                docDesc: '',
                docFolder: this.fileType
            }

            this.isAddDir = true
        },
        addItem () {
            this.isNotImg = false
            this.addItemForm = {
                docType: 'media',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docCover: '',
                docFolder: this.nowDir.docCode
            }
            this.fileName = ''

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
        changeItemImg (data) {
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
            if (!this.addItemForm.fileCode) {
                this.$message({
                    message: '请添加媒体文件！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.docTitle) {
                this.$message({
                    message: '请填写媒体标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.docCover) {
                this.$message({
                    message: '请添加媒体封面！',
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
        showMedia (item) {
            if (this.isCheck) {
                this.selectItem(item)
            } else {
                window.open (item.fileCode, '_blank')
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
        showItems (item) {
            if (this.isCheck) {
                this.selectDir(item)
                return false
            }

            this.isCheck = false
            this.showType = 'pic'
            this.nowDir = item
            this.getItems()
        },
        showDir () {
            this.isCheck = false
            this.showType = 'dir'
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
                    this.itemTotal = Number(res.result.total)
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                    })

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
                    docType: 'pic',
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
                    docType: 'dir',
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
                if (this.showType == 'dir') {
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
            if (!this.isCheck || this.showType == 'dir') {
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
        uploadMedia
    }
}
</script>
<style lang="scss">
.el-tabs__content {
    overflow: visible;
}

.media-su-box {
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
            
            img {
                display: block;
                width: 100%;
                min-height: 170px;
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