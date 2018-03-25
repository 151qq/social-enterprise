<template>
  <el-dialog title="头像更改" v-model="dialogFormVisible.visibleF" size="tiny">
    <div class="el-upload file-container">
      <div class="el-dragger">
        <img class="preview-img" :src="imgPath" v-show="imgPath" />
        <input class="btn_file" type="file" accept="image/*" @change="fileChange"/>
      </div>
      {{remark}}
    </div>
  </el-dialog>
</template>
<script>
import util from '../../assets/common/util'
import interfaces from '../../assets/common/interfaces'

export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    },
    path: String,
    remark: {
      type: String,
      default: '请上传1:1的图片'
    }
  },
  data () {
    return {
      curFile: null,
      imgPath: ''
    }
  },
  mounted () {
    this.imgPath = this.path
  },
  watch: {
    path (val) {
      this.imgPath = this.path
    }
  },
  methods: {
    fileChange (e) {
      var opotion = {
        url: 'headImage',
        event: e,
        data: {
          enterpriseCode: this.$route.query.enterpriseCode,
          fileType: 'pic',
          oldFilePath: this.imgPath
        }
      }

      util.uploadFile(opotion).then(res => {
        if (res.result.success == '1') {
          this.imgPath = res.result.result.filePath
          this.$emit('imgChange', this.imgPath)
          this.dialogFormVisible.visibleF = false
        } else {
          this.$message.error(res.result.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .file-container {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    .el-dragger {
      position: relative;
      width: 180px;
      height: 180px;
      margin: 0 auto 10px;
      background: url(http://img2.imgtn.bdimg.com/it/u=1651318081,2860235060&fm=214&gp=0.jpg) center no-repeat;
      background-size: 100% auto;
      border: 1px solid #f2f2f2;
      border-radius: 50%;
      overflow: hidden;
    }

    .preview-img {
      width: 100%;
      height: 100%;
    }

    .btn_file {
      position: absolute;
      top: 0;
      left: 0;
      width: 180px;
      height: 180px;
      opacity: 0.001;
      cursor: pointer;
    }

    .el-button--small {
      width: 80px;
    }
  }
</style>
