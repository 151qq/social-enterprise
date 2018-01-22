<template>
    <div class="survey-list-big-box">
        <el-tabs v-model="activeName">
            <el-tab-pane v-for="(item, index) in tabDatas"
                          :label="item.label" :name="item.value">
                <survey-list :survey-type="item.value"></survey-list>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>
<script>
import util from '../../../assets/common/util'
import surveyList from './surveyList'

export default {
    data () {
        return {
            tabDatas: [
              {
                label: '客服调研',
                value: 'survey_type_1'
              },
              {
                label: '销售培训',
                value: 'survey_type_2'
              }
            ],
            activeName: 'survey_type_1'
        }
    },
    components: {
      surveyList
    }
}
</script>
<style lang="scss">
.survey-list-big-box {
  width: 1000px;
  margin: 80px auto 30px;
}
</style>