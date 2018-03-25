<template>
  <div>
    <el-dialog
      title="上传"
      class="upload-dia-img"
      :visible.sync="isUpload.value"
      size="tiny">
      <section>
        <label class="input-label" :for="idFor">本地上传</label>
        <input type="file" accept="image/*" class="ben-input" :id="idFor" @change="postImg($event)">

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
    props: ['path', 'bgPath', 'idName', 'isMedia', 'isUpload'],
    data() {
      return {
        curPath: '',
        curCode: '',
        idFor: '',
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
      getMediaList (type) {
        this.docType = type
        this.selectData.isShow = true
      },
      suSelect (imgData) {
        this.curPath = imgData.url
        var data = {
          url: this.curPath,
          file: imgData.file
        }
        this.selectData.isShow = false
        this.isUpload.value = false
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
          if (res.result.success == '1') {
            let result = res.result.result
            this.curPath = result.filePath
            var data = {
              url: this.curPath
            }
            this.isUpload.value = false
            this.$emit('changeImg', data)
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
    },
    components: {
      fileLists
    }
}
</script>

<style lang="scss">
.upload-dia-img {
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