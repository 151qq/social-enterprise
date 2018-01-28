<template>
  <div>
    <section class="upload-box-img">
      <div class="img-big" @click="showMedia">
        <img v-if="!curPath && !bgPath"
            src="../../assets/images/img-default.jpg">
        <img v-if="!curPath && bgPath"
            src="../../assets/images/page-img.jpg">
        <img v-if="curPath" class="img-big" :src="curPath">
      </div>
    </section>
  </div>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['path', 'bgPath', 'isOperate'],
    data() {
      return {
        curPath: ''
      }
    },
    mounted () {
      this.curPath = this.path
    },
    watch: {
      path () {
        this.curPath = this.path
      }
    },
    methods: {
      showMedia () {
        if (!this.isOperate) {
          return false
        }
        this.$emit('imgClick')
      }
    }
}
</script>

<style lang="scss">
.upload-box-img {
  width: 240px;
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
</style>