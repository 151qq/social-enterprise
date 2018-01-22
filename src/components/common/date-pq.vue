<template>
    <section class="date-body">
        <section class="head-box">
            <div v-if="!noLeft" class="down-box">
                <span class="year-btn-down" @click="downYear">
                    <i class="el-icon-d-arrow-left"></i>
                </span>
                <span class="month-btn-down" @click="downMonth">
                    <i class="el-icon-arrow-left"></i>
                </span>
            </div>
            <div class="text-box">
                <input class="year-input" type="text" v-model="year" @blur="changeYear" @keyup.13="changeYear">年
                <input class="month-input" type="text" v-model="month" @blur="changeMonth" @keyup.13="changeMonth">月
            </div>
            <div v-if="!noRight" class="up-box">
                <span class="month-btn-up" @click="addMonth">
                    <i class="el-icon-arrow-right"></i>
                </span>
                <span class="year-btn-up" @click="addYear">
                    <i class="el-icon-d-arrow-right"></i>
                </span>
            </div>
        </section>
        <section class="weeks-box">
            <span v-for="(week, index) in weeks"
                    :key="index"
                    v-text="week"></span>
        </section>
        <section class="days-box">
            <div v-for="(row, indexRow) in months" :key="indexRow">
                <span v-for="(col, indexCol) in row"
                        :key="indexCol"
                        @click="selectDate(col)"
                        :class="{
                            preDay: col.isPreday,
                            nextDay: !col.isPreday && ! col.isToday,
                            today: col.isToday,
                            selected: col.isSelect,
                            expier: !col.isHold && col.isSelect && col.isPreday,
                            hold: col.isSelect && col.isHold
                        }">
                            {{col.isToday ? '今天' : col.dayStr}}
                        </span>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    props: ['year', 'month', 'noClick', 'noLeft', 'noRight', 'selectData'],
    data () {
        return {
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            months: []
        }
    },
    mounted () {
        var today = new Date()
        this.todayYear = today.getFullYear()
        this.todayMonth = today.getMonth() + 1
        this.todayDay = today.getDate()

        console.log(this.todayMonth, this.todayDay)
        this.todayTimes = new Date(this.todayYear, today.getMonth(), this.todayDay).getTime()
        this.upDateHandle()
    },
    methods: {
        upDateHandle () {
            // 置空日历
            this.months = []

            //当前月的第一天的日期
            var firstDay = new Date(this.year, (this.month - 1), 1)

            //第一天是星期几
            var weekday = firstDay.getDay()

            /**求当前月一共有多少天
             *new Date(year,month,0) ： month是当前月，day为0即我们所需的当前月的最后一天。
             *getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
             **/
            var days = new Date(this.year, this.month, 0).getDate()

            var dayDatas = []

            //上个月末几天置空
            for (var i = 0; i < weekday; i++) {
                dayDatas.push({})
            }
            // 2017-09-10
            for (var i = 1; i <= days; i++) {

                // 当前日期times
                var dayTimes = new Date(this.year, Number(this.month) - 1, i).getTime()

                var day = {
                    isPreday: this.todayTimes > dayTimes,
                    isToday: this.todayTimes == dayTimes,
                    dayStr: i < 10 ? '0' + i : i
                }

                var seleteD = this.selectData.filter((item) => {
                    var dateArr = item.date.split('-')

                    // 被选中日期times
                    var dateTimes = new Date(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]).getTime()

                    return dayTimes == dateTimes
                })

                if (seleteD && seleteD.length) {
                    day.isHold = seleteD[0].isHold
                    day.isSelect = true
                } else {
                    day.isSelect = false
                    day.isHold = false
                }

                dayDatas.push(day)
            }

            while (dayDatas.length) {
                this.months.push(dayDatas.splice(0, 7))
            }
        },
        downYear () {
            this.year--
            this.upDateHandle()
        },
        selectDate (item) {
            if (item.isPreday || this.noClick) {
                return
            }
            var date = this.year + '-' + (this.month < 10 ? '0' + Number(this.month) : this.month) + '-' + item.dayStr
            if (item.isSelect) {
                item.isSelect = false
                for (var i = 0, len = this.selectData.length; i < len; i++) {
                    if (date == this.selectData[i].date) {
                        this.selectData.splice(i, 1)
                        break
                    }
                }
            } else {
                item.isSelect = true
                var date = {
                    date: date,
                    isHold: 0
                }
                this.selectData.push(date)
            }
        },
        addYear () {
            this.year++
            this.upDateHandle()
        },
        downMonth () {
            this.month--
            if (this.month == 0) {
                this.year--
                this.month = 12
            }
            this.upDateHandle()
        },
        addMonth () {
            this.month++
            if (this.month == 13) {
                this.year++
                this.month = 1
            }
            this.upDateHandle()
        },
        changeYear () {
            if (Number(this.year)) {
                this.upDateHandle()
            }
        },
        changeMonth () {
            if (Number(this.month)) {
                this.upDateHandle()
            }
        } 
    }
}
</script>
<style lang="scss">
.date-body {
    width: 238px;
    display: inline-block;
    overflow: hidden;

    .weeks-box {
        padding: 15px 0 10px;
        overflow: hidden;

        span {
            float: left;
            width: 34px;
            font-size: 12px;
            color: #000000;
            text-align: center;
        }
    }

    .days-box {
        div {
            overflow: hidden;
        }

        span {
            float: left;
            width: 34px;
            height: 34px;
            font-size: 12px;
            color: #000000;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
        }

        .preDay {
            color: #999999;
            cursor: initial;
        }

        .today {
            color: #20A0FF;
        }

        .selected {
            background: #87CEFA;
            color: #000000;
        }

        .hold {
            background: #20A0FF;
            color: #ffffff;
        }

        .expier {
            background: #FF0018;
            color: #000000;
        }
    }

    .head-box {
        padding: 0 3px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;

        .down-box {
            width: 60px;
            float: left;
            font-size: 14px;
            color: #99A9BF;

            span {
                cursor: pointer;
            }

            &:hover {
                color: #20A0FF;
            }

            .year-btn-down {
                margin-right: 14px;
            }
        }

        .text-box {
            position: absolute;
            width: 112px;
            left: 50%;
            top: 0;
            margin-left: -56px;
            font-size: 14px;
            color: #475669;
            text-align: center;
            
            input {
                width: 37px;
                border: none;
                margin: 0;
                padding: 0;
                font-size: 14px;
                color: #475669;
            }

            .month-input {
                width: 20px;
            }
        }

        .up-box {
            width: 60px;
            float: right;

            font-size: 14px;
            color: #99A9BF;

            &:hover {
                color: #20A0FF;
            }

            span {
                cursor: pointer;
            }

            .month-btn-up {
                margin-right: 14px;
            }
        }
    }
}
</style>