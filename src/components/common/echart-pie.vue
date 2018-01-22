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
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data:[]
        },
        series: [
          {
            name:'',
            type:'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                    fontSize: '24',
                    fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                  show: false
              }
            },
            data:[]
          }
        ]
      },
      colors: [
        {
          normal: {
            color: '#2C82BE'
          }
        },
        {
          normal: {
            color: '#76DDFB'
          }
        },
        {
          normal: {
            color: '#DBECF8'
          }
        }
      ]
    }
  },
  methods: {
    // 获取echarts数据
    setEcharts () {
      let datas = this.echartsDate
      // 设置标题
      this.option.title.text = datas.title ? datas.title : ''
      // 设置legend
      this.option.legend.data = datas.legend
      
      // 设置纵轴数据
      this.option.series[0].data = [].concat(this.setStyle(datas.series))

      this.drawEchart()
    },
    setStyle (arrs) {
      if (!arrs) {
        return []
      }
      var arrList = arrs.map((item, index) => {
        item.itemStyle = this.colors[index]
        return item
      })
      return arrList
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
