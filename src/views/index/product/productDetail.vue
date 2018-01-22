<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <product-base ref="baseForm" @change="baseChange"></product-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 详细规格 -->
          <el-collapse-item class="float-form-box" title="产品规格" name="2">
            <spec-list ref="productSpec"></spec-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 产品场景化推荐 -->
          <el-collapse-item class="float-form-box" title="产品场景化推荐" name="3">
            <user-scence></user-scence>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 产品图片 -->
          <el-collapse-item class="float-form-box" title="产品相册" name="4">
            <upload-list :img-lists="imgList"
                          :id-name="'productAlbum'"
                          @changeImg="changeImg"
                          @setImg="setImg"
                          @deleteImg="deleteImg"></upload-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 介绍文章 -->
          <el-collapse-item class="float-form-box" title="产品介绍" name="5">
            <article-list :article-data="articleData"></article-list>
          </el-collapse-item>
          
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import productBase from './formAlist/productBase'
import specList from './formAlist/specList'
import articleList from './formAlist/articleList'
import userScence from './formAlist/userScence'
import uploadList from '../../../components/common/upload-list'

export default {
    data () {
        return {
            activeNames: ['1'],
            imgList: [],
            sourceData: [],
            baseData: '',
            articleData: []
        }
    },
    mounted () {
        var productColl = localStorage.getItem("productColl")
        if (productColl) {
            this.activeNames = productColl.split(',')
        }
    },
    methods: {
        baseChange (result) {
          this.baseData = result.productInfo
          this.articleData = result.htmlPage ? result.htmlPage : []
          this.getItems(this.baseData.productAlbum)
        },
        getItems (docCode) {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: docCode,
                    pageNumber: 1,
                    pageSize: 1000
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var arrs = []
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                        arrs.push(item.fileCode)
                    })

                    this.imgList = arrs
                    this.sourceData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        changeImg (url) {
          var addItemForm = {
              enterpriseCode: this.$route.query.enterpriseCode,
              docType: '2',
              docTitle: this.baseData.productCname + '-1',
              fileCode: url,
              docDesc: this.baseData.productCname + '-1',
              docCover: '',
              docFolder: this.baseData.productAlbum
          }

          util.request({
              method: 'post',
              interface: 'materialFolderInsert',
              data: addItemForm
          }).then(res => {
              if (res.result.success == '1') {
                  this.getItems(this.baseData.productAlbum)
              } else {
                  this.$message.error(res.result.message)
              }
          })       
        },
        deleteImg (index) {
          util.request({
              method: 'post',
              interface: 'materialFolderDelete',
              data: {
                  docType: '2',
                  docCodes: [this.sourceData[index].docCode]
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.getItems(this.baseData.productAlbum)
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        setImg (url) {
          util.request({
              method: 'get',
              interface: 'saveProductCover',
              data: {
                  productCode: this.$route.query.productCode,
                  productCover: url
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.$refs.baseForm.base.productCover = url
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        collChange () {
            localStorage.setItem("productColl", this.activeNames)
        }
    },
    components: {
        productBase,
        specList,
        articleList,
        userScence,
        uploadList
    }
}
</script>