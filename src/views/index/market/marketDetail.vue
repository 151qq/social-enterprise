<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="float-form-box" title="基本信息" name="0">
            <market-base></market-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="活动优惠" name="3">
            <discount></discount>
          </el-collapse-item>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import marketBase from './formAlist/marketBase'
import discount from './formAlist/discount'

export default {
    data () {
        return {
            id: 0,
            activeNames: ['1']
        }
    },
    mounted () {
        var marketColl = localStorage.getItem("marketColl")
        if (marketColl) {
            this.activeNames = marketColl.split(',')
        }
    },
    methods: {
        collChange () {
            localStorage.setItem("marketColl", this.activeNames)
        }
    },
    components: {
        marketBase,
        discount
    }
}
</script>