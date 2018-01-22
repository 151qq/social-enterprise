<template>
  <div class="echar-box" :id="idName"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: ['idName', 'echartsDate'],
  data () {
    return {
      isNoFirst: false,
      option: {
        title: {
          text: ''
        },
        color: ['#1563CA', '#50E3C2', '#F8E71C'],
        tooltip: {},
        legend: [
          {
            data:[]
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name:'',
            type:'graph',
            roam: true,
            layout: 'circular',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
                normal: {
                    color: 'target',
                    curveness: 0.3
                }
            },
            data: [],
            links: [],
            categories: []
          }
        ]
      }
    }
  },
  methods: {
    // 获取echarts数据
    setEcharts () {
      let datas = this.echartsDate
      // 设置标题
      this.option.title.text = datas.title ? datas.title : ''
      // 设置legend
      this.option.legend[0].data = datas.categories ? datas.categories : []
      this.option.series[0].categories = datas.categories ? datas.categories : []

      
      // 设置关系数据
      this.option.series[0].data = [].concat(datas.nodes)
      this.option.series[0].links = [].concat(datas.links)

      this.drawEchart()
    },
    drawEchart () {
      // 使用刚指定的配置项和数据显示图表。
      if (!this.isInit) {
        // 基于准备好的dom，初始化echarts实例
        var dom = document.getElementById(this.idName)
        this.myChart = echarts.init(dom)
      }
      this.myChart.setOption(this.option)
      this.isInit = true
    }
  }
}
</script>
<style lang="scss">
  .echar-box {
    width: 100%;
    height: 350px;
    box-sizing: border-box;
  }
</style>
