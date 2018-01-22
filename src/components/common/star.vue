<template>
    <div class="star-box">
        <section class="stars-b" v-for="item in this.scoreArr">
            <img v-if="item === 0" src="../../assets/images/star-yellow.png">
            <img v-if="item === 1" src="../../assets/images/star-half.png">
            <img v-if="item === 2" src="../../assets/images/star-gray.png">
        </section>
        <section class="score-b">
            {{score}}分
        </section>
    </div>
</template>
<script>
export default {
    props: ['score'],
    data () {
        return {
            // 0-y 1-h 2-g
            scoreArr: []
        }
    },
    mounted () {
        if (this.score < 0 || typeof this.score !== 'number') {
            console.error('请传入正确分数')
            return false
        }
        var pointBefore = Math.floor(this.score)
        var pointBehind = this.score % 1 * 10 >= 5 ? 1 : 2
        for (var i = 0; i < 5; i++) {
            if (i < pointBefore) {
                this.scoreArr.push(0)
            } else if (i === pointBefore) {
                this.scoreArr.push(pointBehind)
            } else {
                this.scoreArr.push(2)
            }
        }
    }
}
</script>
<style lang="scss">
.star-box {
    display: inline-block;
    overflow: hidden;

    .stars-b {
        float: left;

        img {
            float: left;
            width: 18px;
            height: 18px;
            margin-right: 7px;
        }
    }

    .score-b {
        float: left;
        margin-left: 18px;
        font-size: 14px;
        color: #1F2D3D;
        line-height: 18px;
    }
}
</style>