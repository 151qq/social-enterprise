<template>
    <el-dialog class="file-list-box" title="素材库" :visible.sync="selectData.isShow">
      <div class="picBox">
        <section v-for="(item, index) in mediaList"
                    v-if="mediaList.length"
                    class="check-box">

            <section class="sou-box"
                      :class="curIndex === index ? 'active' : ''"
                      @click="selPic(item, index)">
                <div class="cover-box">
                    <img :src="docType == '2' ? item.fileCode : item.docCover">
                </div>
                <div class="title-box">
                    <div class="title" v-text="item.docTitle"></div>
                </div>
            </section>
        </section>
        <section v-else class="no-img">
            暂无数据，请到素材库上传！！！
        </section>
        
        <div class="clear"></div>
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="itemPageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectData.isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmH">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import util from '../../assets/common/util';

export default{
    props: ['selectData', 'docType'],
    data(){
        return {
          mediaList: [],
          pageNumber: 1,
          pageSize: 12,
          total: 0,
          curIndex: '',
          curCode: '',
          curPath: '',
          curFile: ''
        }
    },
    mounted (){
      if (this.docType) {
        this.getMediaList(this.docType)
      }
    },
    watch: {
      docType () {
        this.getMediaList('intePage')
      }
    },
    methods: {
        selPic(item, index){
          this.curIndex = index
          if (this.docType == '2') {
            this.curFile = ''
            this.curPath = item.fileCode
            this.curCode = item.docCode
          } else if (this.docType == '3') {
            this.curPath = item.docCover
            this.curFile = item.fileCode
            this.curCode = item.docCode
          } else {
            this.curFile = ''
            this.curPath = item.fileCode
            this.curCode = item.docCode
          }
          
        },
        confirmH () {
          var data = {
              url: this.curPath,
              file: this.curFile,
              code: this.curCode
          }
          this.$emit('suSelect', data)
        },
        itemPageChange (size) {
            this.pageNumber = size
            this.getMediaList()
        },
        getMediaList (type) {
          if (this.type) {
            this.pageNumber = 1
          }

          util.request({
              method: 'get',
              interface: 'listPage',
              data: {
                  enterpriseCode: this.$route.query.enterpriseCode,
                  docType: this.docType,
                  pageNumber: this.pageNumber,
                  pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.total = Number(res.result.total)

                  res.result.result.forEach((item) => {
                      item.docCreateTime = item.docCreateTime.split(' ')[0]
                  })

                  this.mediaList = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })       
        }
    }
}
</script>
<style lang="scss">
.file-list-box {
  .el-dialog--small {
    width: 760px !important;
  }
}

.picBox {
  max-height: 360px;
  overflow: scroll;

  .sou-box {
      float: left;
      width: 170px;
      margin: 0 5px 15px;
      border: 1px solid #D3DCE6;
      border-radius: 3px;

      &.active {
        border-color: #20A0FF;
      }

      .cover-box {
          height: 130px;
          overflow: hidden;
          cursor: pointer;
          
          img {
              display: block;
              width: 100%;
              min-height: 130px;
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
              overflow: hidden;
              height: 20px;
              text-overflow: ellipsis;
              word-break: keep-all;
          }

          .time {
              display: block;
              font-size: 12px;
              line-height: 20px;
              color: #999999;
          }

          .btn-box {
             float: right;
             font-size: 14px;
             color: #333333;

             i, label {
                  cursor: pointer;
             }
          }
      }
  }
}
</style>
