<template>
    <div class="member-detail-box">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="member-box" title="会员基本信息" name="0">
            <div class="member-base-box">
              <div class="img-box">
                <img :src="memberInfo.memberImage">
              </div>
              <div class="content-box">
                <div class="col-box">
                  <span class="key-box">微信昵称</span>
                  <span class="value-box">{{memberInfo.memberWechatNickname}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">消费能力</span>
                  <span class="value-box">{{memberInfo.memberConsumeLevel}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">姓名</span>
                  <span class="value-box">{{memberInfo.memberName}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">客户职业</span>
                  <span class="value-box">{{memberInfo.memberCareer}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">性别</span>
                  <span class="value-box">{{memberInfo.memberGender}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">工作单位</span>
                  <span class="value-box">{{memberInfo.memberUnit}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">年龄</span>
                  <span class="value-box">{{memberInfo.memberAge}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">消费冲动</span>
                  <span class="value-box">{{memberInfo.memberConsumeDecision}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">教育背景</span>
                  <span class="value-box">{{memberInfo.memberEdu}}</span>
                </div>
                <div class="col-box">
                  <span class="key-box">对导购态度</span>
                  <span class="value-box">{{memberInfo.memberShopguide}}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="member-box" title="会员关联企业" name="1">
            <el-table
              :data="enterpriseList"
              border
              style="width: 100%">
              <el-table-column
                prop="enterpriseMemberRegDate"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="enterpriseNameReg"
                label="企业">
              </el-table-column>
              <el-table-column
                prop="enterpriseType"
                label="类型">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="member-box" title="会员行为日志" name="2">
            <div class="date-box">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                align="right"
                @change="dateChange"
                placeholder="选择日期范围"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <el-table
              :data="logList"
              border
              style="width: 100%">
              <el-table-column
                prop="interactionDate"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="interactionDesc"
                label="行为">
              </el-table-column>
              <el-table-column
                prop="enterpriseCname"
                label="企业">
              </el-table-column>
            </el-table>

            <el-pagination
                v-if="total"
                class="page-box"
                @current-change="pageChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
          </el-collapse-item>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            memberInfo: {},
            activeNames: ['1', '2', '3'],
            enterpriseList: [],
            logList: [],
            dateRange: [],
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            pageNumber: 1,
            pageSize: 12,
            total: 0
        }
    },
    mounted () {
        var surveyColl = localStorage.getItem("surveyColl")
        if (surveyColl) {
            this.activeNames = surveyColl.split(',')
        }

        this.getBase()
        this.getLogList()
    },
    methods: {
        collChange () {
            localStorage.setItem("surveyColl", this.activeNames)
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'memberDetail',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode,
                memberCode: this.$route.query.memberCode
              }
          }).then(res => {
            if (res.result.success == '1') {
              this.memberInfo = res.result.result.mobileMemberInfo

              if (res.result.result.OrganizeMemberInfoList.length) {
                res.result.result.OrganizeMemberInfoList.forEach((item) => {
                  item.enterpriseMemberRegDate = item.enterpriseMemberRegDate.split(' ')[0]
                })

                this.enterpriseList = res.result.result.OrganizeMemberInfoList
              }
            } else {
              this.$message.error(res.result.message)
            }
          })
        },
        getLogList () {
          var formData = {
            enterpriseCode: this.$route.query.enterpriseCode,
            memberCode: this.$route.query.memberCode,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }

          if (this.dateRange.length) {
            formData.startDate = new Date(this.dateRange[0]).getTime()
            formData.stopDate = new Date(this.dateRange[1]).getTime()
          }

          util.request({
              method: 'post',
              interface: 'selectLogList',
              data: formData
          }).then(res => {
            if (res.result.success == '1') {
              this.total = Number(res.result.total)
              this.logList = res.result.result
            } else {
              this.$message.error(res.result.message)
            }
          })
        },
        dateChange () {
          if (!this.dateRange.length) {
            return false
          }

          this.pageNumber = 1
          this.getLogList()
        },
        pageChange (size) {
          this.pageNumber = size
          this.getLogList()
        }
    }
}
</script>
<style lang="scss">
.member-detail-box {
  margin: 80px auto 30px;
  
  .member-box {
    position: relative;
    width: 1000px;
    margin: auto;

    .date-box {
      position: absolute;
      right: 0;
      top: 3px;
    }

    .page-box {
      margin-top: 20px;
    }
  }

  .member-base-box {
    display: flex;

    .img-box {
      width: 150px;
      height: 150px;
      margin-right: 90px;

      img {
        display: block;
        width: 150px;
        height: 150px;
      }
    }

    .content-box {
      flex: 1;
      overflow: hidden;

      .col-box {
        width: 50%;
        box-sizing: border-box;
        float: left;
        height: 30px;

        .key-box {
          float: left;
          width: 80px;
          font-size: 14px;
          line-height: 30px;
          color: #000000;
        }

        .value-box {
          float: left;
          margin-right: 10px;
          font-size: 14px;
          line-height: 30px;
          color: #000000;
        }
      }
    }
  }
}
</style>