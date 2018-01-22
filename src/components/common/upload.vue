<template>
  <div>
    <section class="upload-box">
      <div class="img-big" @click="showMedia">
        <img v-if="!curPath && !bgPath"
            src="../../assets/images/img-default.jpg">
        <img v-if="!curPath && bgPath"
            src="../../assets/images/page-img.jpg">
        <img v-else class="img-big" :src="curPath">
      </div>
    </section>

    <el-dialog
      title="上传"
      class="upload-dia"
      :visible.sync="dialogVisible"
      size="tiny">
      <section>
        <label class="input-label" :for="idFor">本地上传</label>
        <input type="file" v-if="isOperate" class="ben-input" :id="idFor" @change="postImg($event)">

        <el-button @click="getMediaList('2')" class="upload-btn" type="primary">图片素材</el-button>
        <el-button v-if="isMedia" @click="getMediaList('3')" class="upload-btn" type="primary">媒体素材</el-button>
      </section>
    </el-dialog>

    <file-lists :doc-type="docType"
                :select-data="selectData"
                @suSelect="suSelect"></file-lists>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import fileLists from './fileLists'

export default {
    props: ['path', 'bgPath', 'idName', 'isOperate', 'isMedia', 'itemIndex'],
    data() {
      return {
        curPath: '',
        curCode: '',
        idFor: '',
        dialogVisible: false,
        mediaList: [],
        enterprise: '',
        docType: '',
        selectData: {
          isShow: false
        }
      }
    },
    mounted () {
      this.idFor = this.idName ? this.idName : 'upload-file-single'
      this.curPath = this.path
    },
    watch: {
      path () {
        this.curPath = this.path
      },
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
          index: this.itemIndex
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
            fileType: '2',
            oldFilePath: this.curPath
          }
        }

        util.uploadFile(opotion).then(res => {
          let result = res.result.result
          this.curPath = result.filePath
          var data = {
            url: this.curPath,
            index: this.itemIndex
          }
          this.dialogVisible = false
          this.$emit('changeImg', data)
        })
      }
    },
    components: {
      fileLists
    }
}
</script>

<style lang="scss">
.upload-box {
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .img-big {
    display: block;
    width: 100%;
    height: auto;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}

.upload-dia {
  .input-label {
    display: block;
    width: 100%;
    color: #fff;
    background-color: #20a0ff;
    border: 1px solid #20a0ff;
    padding: 10px 15px;
    border-radius: 4px;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    margin: 0 0 15px 0;

    &:hover {
      opacity: 0.8;
    }
  }

  .ben-input {
    display: none;
  }

  .upload-btn {
    width: 100%;
    margin: 0 0 15px 0;
  }
}
</style>