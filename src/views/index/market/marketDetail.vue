<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="float-form-box" title="基本信息" name="0">
                <market-base @hasBase="hasBase"></market-base>
            </el-collapse-item>

            <template v-if="baseData.eventCode">
                <div class="line-bold"></div>
                <el-collapse-item class="float-form-box" title="活动优惠" name="1">
                    <discount :base="baseData"></discount>
                </el-collapse-item>
            </template>
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
            baseData: {},
            activeNames: ['0']
        }
    },
    mounted () {
        var marketColl = localStorage.getItem("marketColl")
        if (marketColl) {
            this.activeNames = marketColl.split(',')
        }
    },
    methods: {
        hasBase (base) {
            this.baseData = Object.assign({}, base)
        },
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