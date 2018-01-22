<template>
  <div class="imgs-dirs-box">
    <router-link class="sou-box"
                  target="_blank"
                  v-for="(item, index) in dirLists"
                  :to="{name: 'source', query: {docCode: item.docCode}}">
        <div class="cover-box">
            <img :src="item.docCover">
        </div>
        <div class="title-box">
            <div class="title" v-text="item.docTitle"></div>
            <div class="time">
                {{item.docCreateTime}}
                <span class="btn-box">
                    <i @click.prevent="deleteItem(item)" class="el-icon-delete2"></i>
                </span>
            </div>
        </div>
    </router-link>
    <div class="img-box" @click="showDirList">
      <img class="img-big" src="../../assets/images/add-img.jpg">
    </div>

    <file-lists :doc-type="docType"
                :select-data="selectData"
                @suSelect="suSelect"></file-lists>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import fileLists from './fileLists'

export default {
    props: ['dirLists'],
    data() {
      return {
        selectData: {
          isShow: false
        },
        docType: 'dir'
      }
    },
    methods: {
      showDirList () {
        this.selectData.isShow = true
      },
      suSelect (imgData) {
        var data = {
          url: imgData.url,
          file: imgData.file,
          code: imgData.code
        }
        this.selectData.isShow = false
        this.$emit('changeDir', data)
      },
      deleteItem (item) {
        this.$emit('deleteDir', item)
      }
    },
    components: {
      fileLists
    }
}
</script>

<style lang="scss">
.imgs-dirs-box {
  width: 110%;
  overflow: hidden;

  .sou-box {
      float: left;
      width: 184px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: 1px solid #D3DCE6;
      border-radius: 3px;

      .cover-box {
          height: 184px;
          overflow: hidden;
          cursor: pointer;
          
          img {
              display: block;
              width: 100%;
              min-height: 184px;
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
             position: relative;
             float: right;
             font-size: 14px;
             color: #333333;

             i, label {
                  cursor: pointer;
             }
          }
      }
  }

  .img-box {
    float: left;
    position: relative;
    cursor: pointer;

    .img-big {
      display: block;
      width: 184px;
      height: 184px;
    }
  }
}
</style>