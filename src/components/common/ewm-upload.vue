<template>
  <div class="ewm-upload-box" :style="{width:width}">
    <label :for="idName">
      <img v-if="!curPath" class="img-big"
          src="../../assets/images/img-default.jpg">
      <img v-else class="img-big" :src="curPath">    
    </label>
    <input v-if="isOperate" class="input-u" :id="idName" type="file" accept="image/*" name="" @change="postImg">

    <div class="title-box">{{titleName}}</div>
  </div>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['path', 'titleName', 'idName', 'width', 'isOperate'],
    data() {
      return {
        curPath: '',
        curTitle: ''
      }
    },
    mounted () {
      this.curPath = this.path
      this.curTitle = this.titleName
    },
    watch: {
      path () {
        this.curPath = this.path
        this.curTitle = this.titleName
      }
    },
    methods: {
      changeTitle () {
        var data = {
          url: this.curPath,
          title: this.curTitle
        }

        this.$emit('changeImg', data)
      },
      postImg (e) {
        var opotion = {
          url: 'uploadFile',
          event: e,
          data: {
            enterpriseCode: this.$route.query.enterpriseCode,
            fileType: 'pic',
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
.ewm-upload-box {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #f5f5f5;
  border-radius: 3px;

  .img-big {
    display: block;
    width: 100%;
    height: 160px;
  }

  .input-u {
    display: none;
  }

  .title-box {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    border-top: 1px solid #f5f5f5;
    display: block;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>