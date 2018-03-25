<template>
  <div>
    <section class="upload-box">
      <label class="img-big" :for="idFor">
        <img v-if="!curPath && !bgPath"
            src="../../assets/images/img-default.jpg">
        <img v-if="!curPath && bgPath"
            src="../../assets/images/page-img.jpg">
        <img v-if="curPath" class="img-big" :src="curPath">
      </label>
      <input type="file" accept="image/*" v-if="isOperate" class="ben-input" :id="idFor" @change="postImg($event)">
    </section>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'

export default {
    props: ['path', 'bgPath', 'idName', 'isOperate'],
    data() {
      return {
        curPath: '',
        idFor: ''
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
            this.$emit('changeImg', data)
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
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

  .ben-input {
    display: none;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>