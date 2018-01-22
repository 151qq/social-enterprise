<template>
  <div class="color-select-box" :style="{width:width}">
    <div class="color-box">
      <el-color-picker @change="colorChange" v-model="color"></el-color-picker>
    </div>

    <div class="title-box">{{titleName}}</div>
  </div>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['color', 'titleName', 'width'],
    data() {
      return {
      }
    },
    methods: {
      colorChange () {
        var data = {
          color: this.color,
        }
        this.$emit('colorChange', data)
      }
    }
}
</script>

<style lang="scss">
.color-select-box {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #f5f5f5;
  border-radius: 3px;

  .color-box {
    display: block;
    width: 100%;
    height: 160px;
  }

  .el-color-picker {
    width: 100%;
    height: 200px;

    .el-color-picker__trigger {
      width: 100%;
      height: 160px;
      border: none;
      border-radius: 0;
      padding: 0;

      .el-color-picker__icon {
        display: none;
      }

      .el-color-picker__color {
        border: none;
        width: 100%;
        height: 160px;

        .el-icon-close {
          width: 100%;
          text-align: center;
          font-size: 18px;
          line-height: 158px;
          top: 0;
          left: 0;
        }

        .el-icon-close:before {
          content: "点击选色";
        }
      }
    }
  }

  .title-box {
    display: block;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    border-top: 1px solid #f5f5f5;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>