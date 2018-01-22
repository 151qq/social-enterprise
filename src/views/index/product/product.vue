<template>
    <div class="product-list-big-box">
        <el-tabs v-model="activeName">
            <el-tab-pane v-for="(item, index) in tabDatas"
                          :label="item.label" :name="item.value">
                <product-list :product-type="item.value"></product-list>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>
<script>
import util from '../../../assets/common/util'
import productList from './productList'

export default {
    data () {
        return {
            tabDatas: [
              {
                label: '产品',
                value: 'product'
              },
              {
                label: '礼品',
                value: 'gigt'
              }
            ],
            activeName: 'product'
        }
    },
    components: {
      productList
    }
}
</script>
<style lang="scss">
.product-list-big-box {
  width: 1020px;
  margin: 80px auto 30px;
}
</style>