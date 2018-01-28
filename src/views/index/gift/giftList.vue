<template>
    <div class="product-list-box">

        <div class="input-box">
            <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
            <el-button class="search-btn" type="primary" icon="search" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="arrow-left" @click="goToBack">返回</el-button>
        </div>

        <!-- 右侧操作按钮 -->
        <section class="btns-op" v-if="isEdit">
            <!-- 多选模式切换 -->
            <img v-show="!isCheck" src="../../../assets/images/select-icon.png" @click="setCheck">
            <img v-show="isCheck" src="../../../assets/images/select-now.png" @click="setCheck">
            <span></span>
            <!-- 选中操作-删除 -->
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/delete-icon-n.png"
                    @click="deleteOpt">
            <span></span>
            <!-- 添加 最多三层限制 -->
            <div v-if="floorNumber < 4" class="up-box">
                <img  @click="addItem" src="../../../assets/images/adds-icon.png">
            </div>
        </section>

        <!-- 目录路径 -->
        <!-- <section class="dirSteps">
            <template v-for="(item, index) in dirSteps">
                <span v-if="index"
                      :class="floorNumber == index + 1 ? 'nowActive' : ''"> | </span>
                <a :key="index"
                   :class="floorNumber == index + 1 ? 'nowActive' : ''"
                   @click="goToDir(item, index)">
                    {{item.catalogCname}}
                </a>
            </template>
            
        </section> -->
        
        <!-- 列表 -->
        <div class="clear"></div>
        <template v-if="sourceDatas.length">
            <section class="check-box" v-for="(item, index) in sourceDatas" :key="index">
                <!-- 选择框 -->
                <section class="select-box"
                         v-if="isCheck && (item.catalogType == 'dir' || item.productStatus == 'draft') && isEdit"
                         @click.stop="selectItem(item)"
                         :class="selectItemList.indexOf(item.catalogCode) > -1 ? 'active' : ''"></section>
                
                <!-- 产品和目录列表 -->
                <section class="sou-box" :class="item.catalogType == 'dir' ? 'dir-box' : ''">
                    <div class="cover-box"
                         @click="showItems(item)"
                         v-if="isCheck || item.catalogType == 'dir'">
                        <img v-if="item.catalogImage" :src="item.catalogImage">
                    </div>
                    <!-- 详情页 -->
                    <router-link class="cover-box"
                                 target="_blank"
                                 v-else
                                 :to="{
                                    name: 'gift-detail',
                                    query: {
                                        enterpriseCode: item.enterpriseCode,
                                        productCode: item.catalogCode
                                    }
                                 }">
                        <img :src="item.catalogImage">
                    </router-link>
                    <div class="title-box">
                        <div class="title" v-text="item.catalogCname"></div>
                        <div class="time">
                            <span v-if="item.catalogType == 'dir'">
                                {{item.catalogCreateTime}}
                            </span>
                            <span v-else>
                                <template v-if="item.productStatus == 'draft'">
                                    草稿
                                </template>
                                <template v-if="item.productStatus == 'submitted'">
                                    已发布
                                </template>
                                <template v-if="item.productStatus == 'closed'">
                                    已下架
                                </template>
                            </span>
                            <span class="btn-box"
                                  v-if="(item.catalogType == 'dir' || item.productStatus == 'draft' || item.productStatus == 'submitted') && isEdit">
                                <!-- draft，submitted，approved，frozen，closed -->
                                <i @click.stop="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </div>
                    </div>
                </section>
            </section>
            
            <div class="clear"></div>
            <el-pagination
                v-if="total"
                class="page-box"
                @current-change="pageChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </template>
        <!-- 无内容 -->
        <section v-else class="no-img">
            当前暂无内容，请添加！！！
        </section>
        
        <!-- 添加弹窗 -->
        <el-dialog :title="operateText" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="添加类型">
                <el-select v-model="addItemForm.catalogType"
                            placeholder="请选择"
                            :disabled="!isChangeType">
                    <el-option
                      v-for="(item, index) in dicAdd"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <template v-if="addItemForm.catalogType == 'dir'">
                <el-form-item label="封面">
                    <popup-img :path="addItemForm.catalogImage"
                                :is-operate="true"
                                :bg-path="false"
                                @imgClick="imgClick"></popup-img>
                </el-form-item>
            </template>
            <el-form-item label="标题">
                <el-input v-model="addItemForm.catalogCname" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.catalogDesc">
                </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>

        <popup-load :path="addItemForm.catalogImage"
                     :is-operate="true"
                     :bg-path="true"
                     :id-name="'catalogImage'"
                     :is-upload="isUpload"
                     @changeImg="changeItemImg"></popup-load>
    </div>
</template>
<script>
import popupImg from '../../../components/common/popupImg.vue'
import popupLoad from '../../../components/common/popupLoad.vue'
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            productType: 'gift',
            keyValue: '',
            // 获取
            sourceDatas: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0,
            // 当前parentCode
            currentParentCode: 'e2',
            // 添加
            operateText: '添加',
            isAddItem: false,
            addItemForm: {
                enterpriseCode: '',
                catalogCode: '',
                catalogCname: '',
                catalogImage: '',
                catalogParentCode: '',
                catalogType: '',
                catalogDesc: ''
            },
            dicAdd: [
                {
                    label: '目录',
                    value: 'dir'
                },
                {
                    label: '产品',
                    value: 'pro'
                }
            ],
            // 楼层 路径
            floorNumber: 1,
            dirSteps: [],
            // 多选
            isCheck: false,
            selectItemList: [],
            // 弹窗选择图片
            isUpload: {
                value: false
            },
            isChangeType: true,
            productTypes: []
        }
    },
    mounted () {
        var stepOne = {
            catalogCname: '根目录',
            enterpriseCode: this.$route.query.enterpriseCode,
            catalogCode: this.$route.query.catalogCode,
            catalogLevel: Number(this.$route.query.catalogLevel)
        }

        this.floorNumber = Number(this.$route.query.catalogLevel)

        this.dirSteps.push(stepOne)
        this.getItems(this.$route.query.catalogCode)

        this.geProductTypes('gift_type')
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.$route.query.enterpriseCode == this.userInfo.enterpriseCode
        }
    },
    watch: {
        $route () {
            this.floorNumber = Number(this.$route.query.catalogLevel)
            this.dirSteps.splice(this.floorNumber)
            this.getItems(this.$route.query.catalogCode)
        }
    },
    methods: {
        searchItem () {
            this.getItems(this.$route.query.catalogCode)
        },
        // 增删改查
        getItems (parentCode) {
            // 记录当前parentCode
            this.currentParentCode = parentCode

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                catalogParentCode: parentCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            if (parentCode == 'e2') {
                formData.catalogParentCode = parentCode + '_' + this.productType
            }

            if (this.keyValue) {
                formData.keyValue = this.keyValue
            }

            util.request({
                method: 'get',
                interface: 'pruductCatalogList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.total = Number(res.result.total)

                    // 格式化时间
                    if (res.result.result.length) {
                        res.result.result.forEach((item) => {
                            if (item.catalogCreateTime) {
                                item.catalogCreateTime = item.catalogCreateTime.split(' ')[0]
                            }
                        })
                    }

                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterItem () {
            if (this.currentParentCode == 'e2') {
                this.addItemForm.catalogParentCode = this.currentParentCode + '_' + this.productType
            } else {
                this.addItemForm.catalogParentCode = this.currentParentCode
            }

            if (this.addItemForm.catalogType != '1') {
                this.addItemForm.productClass = this.productType
            }

            this.addItemForm.catalogCreator = this.userInfo.userCode
            
            util.request({
                method: 'post',
                interface: 'saveProductCatalog',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 重置分页 刷新列表 关闭弹窗
                    this.itemPageNumber = 1
                    this.isAddItem = false
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            if (this.addItemForm.catalogType != '1') {
                this.addItemForm.productClass = this.productType
            }

            util.request({
                method: 'post',
                interface: 'saveProductCatalog',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 刷新列表 关闭弹窗
                    this.isAddItem = false
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItems () {
            util.request({
                method: 'post',
                interface: 'deleteProductCatalog',
                data: {
                    catalogCodes: this.selectItemList
                }
            }).then(res => {
                if (res.result.success == '1') {
                    if (res.result.result.length) {
                        this.$message({
                            message: '部分目录下有产品存在，未能删除！',
                            type: 'warning'
                        })
                    }
                    // 刷新列表 关闭多选模式
                    this.isCheck = false
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.itemPageNumber = size
            this.getItems(this.currentParentCode)
        },
        // 添加 编辑
        addItem () {
            this.operateText = '添加'
            this.isChangeType = true
            this.addItemForm = {
                enterpriseCode: this.$route.query.enterpriseCode,
                catalogCode: '',
                catalogCname: '',
                catalogImage: '',
                catalogParentCode: '',
                catalogType: '',
                catalogDesc: '',
                catalogLevel: Number(this.$route.query.catalogLevel) + 1
            }

            if (this.floorNumber == 3) {
                this.isChangeType = false
                this.addItemForm.catalogType = 'pro'
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.operateText = '编辑'
            this.isChangeType = false
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        imgClick () {
            this.isUpload.value = true
        },
        changeItemImg (data) {
            this.addItemForm.catalogImage = data.url
        },
        confirmItem () {
            if (!this.addItemForm.catalogType) {
                this.$message({
                    message: '请选择类型！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.catalogCname) {
                this.$message({
                    message: '请填写标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.catalogImage && this.addItemForm.catalogType == 'dir') {
                this.$message({
                    message: '请添加封面！',
                    type: 'warning'
                })
                return false
            }

            if (this.addItemForm.catalogCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        // 多选模式
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectItemList = []
        },
        selectItem (item) {
            var index = this.selectItemList.indexOf(item.catalogCode)
            if (index > -1) {
                this.selectItemList.splice(index, 1)
            } else {
                this.selectItemList.push(item.catalogCode)
            }
        },
        // 单击card操作
        showItems (item) {
            // 多选模式下为多选
            if (this.isCheck && (item.catalogType == 'dir' || item.productStatus == 'draft')) {
                this.selectItem(item)
                return false
            }

            // 目录类型展开 产品类型跳到详情
            // 跳到下一级目录 重置分页 设置跳转路径
            this.pageNumber = 1
            this.keyValue = ''
            this.isCheck = false
            this.floorNumber++
            this.dirSteps.push(item)

            var pathData = {
                name: 'gift',
                query: {
                    enterpriseCode: item.enterpriseCode,
                    catalogCode: item.catalogCode,
                    catalogLevel: item.catalogLevel
                }
            }

            this.$router.push(pathData)
        },
        // 目录跳转
        goToBack () {
            // 根目录 不请求
            if (this.floorNumber == 1) {
                return false
            } else {
                this.floorNumber--
            }

            // 重置分页 重置目录路径 请求列表
            this.pageNumber = 1
            this.keyValue = ''
            this.isCheck = false
            this.dirSteps.splice(this.floorNumber)
            var data = this.dirSteps[this.floorNumber - 1]

            var pathData = {
                name: 'gift',
                query: {
                    enterpriseCode: data.enterpriseCode,
                    catalogCode: data.catalogCode,
                    catalogLevel: data.catalogLevel
                }
            }

            this.$router.push(pathData)
        },
        // 删除操作弹窗
        deleteOpt () {
            if (!this.isCheck) {
                return false
            }

            this.$confirm('确定执行删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteItems()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })     
            })
        },
        geProductTypes (type) {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: type
              }
          }).then(res => {
              if (res.result.success = '1') {
                this.productTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
        popupImg,
        popupLoad
    }
}
</script>
<style lang="scss">
.product-list-box {
    position: relative;
    width: 1000px;
    margin: 80px auto 30px;

    .input-box {
        display: block;
        width: 800px;
        height: 50px;
        margin: 0 auto 30px;

        .input-search {
          float: left;
          width: 600px;
          height: 50px;
          appearance: none;
          font-size: 14px;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          line-height: 1;
          outline: 0;
          padding: 3px 10px;
        }

        .search-btn {
          position: relative;
          float: left;
          margin-left: -10px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          height: 50px;
          font-size: 16px;
          padding: 0 23px;
        }

        .add-new-btn {
            float: right;
            height: 50px;
        }
    }

    .no-add {
      width: 696px;
    }

    .dirSteps {
        border-left: 3px solid #20a0ff;
        padding-left: 8px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 25px;
        font-size: 16px;

        a {
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }
        }

        a,span {
            color: #000000;
        }

        span.nowActive {
            color: #999999;
        }

        a.nowActive {
            color: #999999;
            cursor: unset;

            &:hover {
                opacity: 1;
            }
        }
    }

    .page-box {
        margin-top: 10px;
    }

    .btns-op {
        position: fixed;
        right: 10px;
        top: 160px;
        width: 43px;
        border: 1px solid #D3DCE6;
        border-radius: 3px;
        background: #F8FBFF;
        box-sizing: border-box;
        padding: 0 5px;
        text-align: center;
        line-height: 0;

        img {
            display: inline-block;
            margin: 13px 0;
            cursor: pointer;
            padding: 0 5px;

            &:hover {
                opacity: 0.7;
            }
        }

        .up-box {
            position: relative;
            height: 27px;

            img {
                display: block;
                width: 14px;
                height: 14px;
                margin: 13px auto;
                padding: 0;
            }

            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 27px;
                opacity: 0.01;
            }
        }

        .disable {
            opacity: 0.5;
            cursor: no-drop;
        }

        span {
            display: block;
            height: 1px;
            background: #D3DCE6;
        }
    }

    .is-active {
        color: #20A0FF;
    }

    .no-img {
        text-align: center;
        line-height: 160px;
        font-size: 20px;
        color: #999999;
    }

    .go-back {
        height: 30px;
        position: absolute;
        right: -30px;
        top: -38px;
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
            background: #f1f1f1;
            
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
                height: 20px;
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

    .dir-box {
        background: #f0f0f0;
    }
}
</style>