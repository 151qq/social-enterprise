<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="float-form-box" title="基本信息" name="0">
            <survey-base></survey-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="调研正文" name="1">
            <questions></questions>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="调研记录" name="2">
            <record-list></record-list>
          </el-collapse-item>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import surveyBase from './formAlist/surveyBase'
import questions from './formAlist/questions'
import recordList from './formAlist/recordList'

export default {
    data () {
        return {
            id: 0,
            activeNames: ['1']
        }
    },
    mounted () {
        var surveyColl = localStorage.getItem("surveyColl")
        if (surveyColl) {
            this.activeNames = surveyColl.split(',')
        }
    },
    methods: {
        collChange () {
            localStorage.setItem("surveyColl", this.activeNames)
        }
    },
    components: {
        surveyBase,
        questions,
        recordList
    }
}
</script>