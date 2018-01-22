<template>
    <section>
      <div class="jsons-box">
        <section class="t-cont">
            <span class="one">阅读总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">潜客阅读</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">会员总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">分享总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">分享朋友圈</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">分享朋友</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">评论总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">正面评论</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">负面评论</span>
            <div class="two">1</div>
        </section>
      </div>
    </section>
</template>
<script>
import '../../../../components/list/common/list.scss'
import util from '../../../../assets/common/util'

export default {
    props: ['baseData'],
    data () {
        return {
        }
    },
    methods: {
        initData () {
          
        },
        getInvestors () {
            util.request({
                method: 'get',
                interface: 'getInvestors',
                data: {
                    roleCode: 'entadconsultant'
                }
            }).then(res => {
                this.investors = res.result.result
            })
        }
    }
}
</script>