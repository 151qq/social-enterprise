<template>
  <div class="imgs-attachment-box">
    <section class="img-box" v-for="(item, index) in imgsData" :key="index">
      <img class="img-big" :src="item.attachmentTargetCode" @click="showImg(index)">
      <div class="delete-box">
        <i class="el-icon-close" @click="deleteImg(item)"></i>
      </div>
    </section>

    <div class="img-box" v-if="imgsData.length < 9 && isOperate" @click="showMedia">
      <img class="img-big" src="../../assets/images/add-img.jpg">
    </div>

    <el-dialog
      title="上传"
      class="upload-dia"
      :visible.sync="dialogVisible"
      size="tiny">
      <section>
        <label class="input-label" :for="idFor">本地上传</label>
        <input type="file" accept="image/*" class="ben-input" :id="idFor" @change="postImg($event)">

        <el-button @click="getMediaList('pic')" class="upload-btn" type="primary">图片素材</el-button>
        <el-button v-if="isMedia" @click="getMediaList('media')" class="upload-btn" type="primary">媒体素材</el-button>
      </section>
    </el-dialog>

    <file-lists :doc-type="docType"
                :select-data="selectData"
                @suSelect="suSelect"></file-lists>

    <!-- 大图 -->
    <swiper-img :is-show="isShow" :index="nowIndex" :big-imgs="imgLists"></swiper-img>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import fileLists from './fileLists'
import swiperImg from './swiper-img.vue'

export default {
    props: ['imgsData', 'objectCode', 'idName', 'isMedia', 'itemIndex', 'itemCode', 'isOperate'],
    data() {
      return {
        selectData: {
          isShow: false
        },
        docType: 'pic',
        imgLists: [],
        nowIndex: 0,
        isShow: {
          value: false
        },
        idFor: '',
        dialogVisible: false,
      }
    },
    mounted () {
      this.idFor = this.idName ? this.idName : 'upload-file-single'
    },
    watch: {
      idName () {
        this.idFor = this.idName ? this.idName : 'upload-file-single'
      }
    },
    methods: {
      showMedia () {
        this.dialogVisible = true
      },
      getMediaList (type) {
        this.docType = type
        this.selectData.isShow = true
      },
      suSelect (imgData) {
        this.curPath = imgData.url
        var data = {
          url: this.curPath,
          file: imgData.file,
          index: this.itemIndex,
          code: this.itemCode
        }
        this.selectData.isShow = false
        this.dialogVisible = false
        this.$emit('changeImg', data)
      },
      postImg (e) {
        var opotion = {
          url: 'uploadFile',
          event: e,
          data: {
            enterpriseCode: this.$route.query.enterpriseCode,
            fileType: 'pic',
            oldFilePath: ''
          }
        }

        util.uploadFile(opotion).then(res => {
          if (res.result.success == '1') {
            let result = res.result.result
            this.curPath = result.filePath
            var data = {
              url: this.curPath,
              index: this.itemIndex,
              code: this.itemCode
            }
            this.dialogVisible = false
            this.$emit('changeImg', data)
          } else {
            this.$message.error(res.result.message)
          }
        })
      },
      showImg (index) {
        this.nowIndex = index

        var arrs = []
        this.imgsData.forEach((item) => {
          arrs.push(item.attachmentTargetCode)
        })
        this.imgLists = arrs

        this.isShow.value = true
      },
      deleteImg (item) {
        this.$emit('deleteImg', item)
      }
    },
    components: {
      fileLists,
      swiperImg
    }
}
</script>

<style lang="scss">
.imgs-attachment-box {
  width: 110%;
  overflow: hidden;

  .img-box {
    float: left;
    margin-right: 10px;
    position: relative;
    cursor: pointer;

    .img-big {
      display: block;
      width: 100px;
      height: 60px;
    }

    .delete-box {
      position: absolute;
      right: 3px;
      top: 0px;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        color: #20a0ff;
      }
    }

    .img-input {
      display: none;
    }
  }
}
</style>