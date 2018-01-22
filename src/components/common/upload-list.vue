<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists" :key="index">
      <img class="img-big" :src="item" @click="showImg(index)">
      <div class="delete-box">
        <i class="el-icon-setting" @click="setImg(item)"></i>
        <i class="el-icon-delete2" @click="deleteImg(index)"></i>
      </div>
    </section>
    <label class="img-box" :for="idName">
      <img class="img-big" src="../../assets/images/add-img.jpg">
    </label>
    <input :id="idName" type="file" class="img-input" @change="postImg($event)">

    <!-- 大图 -->
    <swiper-img :is-show="isShow" :index="nowIndex" :big-imgs="imgLists"></swiper-img>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import swiperImg from './swiper-img.vue'

export default {
    props: ['imgLists', 'idName'],
    data() {
      return {
        imgList: [],
        nowIndex: 0,
        isShow: {
          value: false
        }
      }
    },
    mounted () {
    },
    methods: {
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
          this.$emit('changeImg', res.result.result.filePath)
        })
      },
      showImg (index) {
        this.nowIndex = index
        this.isShow.value = true
      },
      setImg (url) {
        this.$emit('setImg', url)
      },
      deleteImg (index) {
        this.imgLists.splice(index, 1)
        this.$emit('deleteImg', index)
      }
    },
    components: {
      swiperImg
    }
}
</script>

<style lang="scss">
.imgs-box {
  width: 110%;
  overflow: hidden;

  .img-input {
    display: none;
  }

  .img-box {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;

    .img-big {
      display: block;
      width: 240px;
      height: 160px;
    }

    .delete-box {
      display: block;
      padding-right: 5px;
      text-align: right;
      font-size: 14px;
      line-height: 30px;
      cursor: pointer;
      background: #f1f1f1;

      i {
        margin-right: 3px;
      }
    }

    &:hover {
      .delete-box {
        display: block;
      }
    }
  }
}
</style>