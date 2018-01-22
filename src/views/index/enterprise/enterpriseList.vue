<template>
    <div class="enterprise-list-box">

        <div class="input-box">
            <el-input
              placeholder="请输入需查询条件"
              v-model="keyValue"
              >
            </el-input>
            <el-button class="search-btn" type="primary" icon="search"
                        @keyup.13="searchItem" @click="searchItem">
              搜索
            </el-button>

            <!-- <el-button class="add-new-btn" type="primary" icon="plus" @click="goToNew">新增</el-button> -->
        </div>
        
        <!-- 列表 -->
        <div class="clear"></div>
        <template v-if="sourceDatas.length">
            <section class="sou-box" v-for="(item, index) in sourceDatas" :key="index">
                <router-link class="cover-box"
                             target="_blank"
                             :to="{
                                name: item.enterpriseType == 'enterprise_type_0' ? 'platform-detail' : 'enterprise-detail',
                                query: {
                                    enterpriseCode: item.enterpriseCode
                                }
                             }">
                    <img :src="item.enterpriseLogo">
                </router-link>
                <div class="title-box">
                    <div class="title" v-text="item.enterpriseNameReg"></div>
                    <div class="time">
                        <span>
                            {{item.enterpriseRegDate}}
                        </span>
                        <!-- <span class="btn-box">
                            <i @click.stop="deleteOpt(item)" class="el-icon-delete2"></i>
                        </span> -->
                    </div>
                </div>
            </section>
            
            <div class="clear"></div>
            <el-pagination
                v-if="total"
                class="page-box"
                @current-change="pageChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </template>
        <!-- 无内容 -->
        <section v-else class="no-img">
            当前暂无内容，请添加！！！
        </section>
    </div>
</template>
<script>
import popupImg from '../../../components/common/popupImg.vue'
import popupLoad from '../../../components/common/popupLoad.vue'
import util from '../../../assets/common/util'

export default {
    props: ['productType'],
    data() {
        return {
            keyValue: '',
            // 获取
            sourceDatas: [],
            pageNumber: 1,
            pageSize: 20,
            total: 0
        }
    },
    mounted () {
        this.getItems()
    },
    methods: {
        searchItem () {
            this.getItems()
        },
        // 增删改查
        getItems () {

            var formData = {
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            if (this.keyValue) {
                formData.keyValue = this.keyValue
            }

            util.request({
                method: 'get',
                interface: 'showAllEnterprise',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.total = Number(res.result.total)

                    // 格式化时间
                    if (res.result.result.length) {
                        res.result.result.forEach((item) => {
                            if (item.enterpriseRegDate) {
                                item.enterpriseRegDate = item.enterpriseRegDate.split(' ')[0]
                            }
                        })
                    }

                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItem (item) {
            util.request({
                method: 'post',
                interface: 'removeEnterpriseInfo',
                data: {
                    enterpriseCode: item.enterpriseCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                        message: '恭喜你，删除成功！',
                        type: 'success'
                    })
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.pageNumber = size
            this.getItems()
        },
        goToNew () {

        },
        // 删除操作弹窗
        deleteOpt (item) {
            this.$confirm('确定执行删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteItem(item)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })     
            })
        }
    }
}
</script>
<style lang="scss">
.enterprise-list-box {
    position: relative;
    width: 1000px;
    margin: 80px auto 30px;

    .input-box {
        display: block;
        width: 800px;
        height: 50px;
        margin: 0 auto 30px;

        .el-input {
          float: left;
          width: 600px;
          height: 50px;

          input {
            font-size: 14px;
            height: 50px;
          }
        }

        .search-btn {
          position: relative;
          float: left;
          margin-left: -10px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          height: 50px;
          font-size: 16px;
          padding: 0 23px;
        }

        .add-new-btn {
            float: right;
            height: 50px;
        }
    }

    .page-box {
        margin-top: 10px;
    }

    .no-img {
        text-align: center;
        line-height: 160px;
        font-size: 20px;
        color: #999999;
    }

    .go-back {
        height: 30px;
        position: absolute;
        right: -30px;
        top: -38px;
        padding: 0 15px;
    }

    .sou-box {
        float: left;
        width: 170px;
        margin-right: 20px;
        margin-bottom: 20px;
        border: 1px solid #D3DCE6;
        border-radius: 3px;

        .cover-box {
            height: 170px;
            overflow: hidden;
            cursor: pointer;
            
            img {
                display: block;
                width: 100%;
                min-height: 170px;
            }
        }

        .title-box {
            padding: 5px 10px;
            border-top: 1px solid #D3DCE6;
            
            .title {
                display: block;
                font-size: 14px;
                line-height: 20px;
                border: none;
                color: #000000;
            }

            .time {
                display: block;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                color: #999999;
            }

            .btn-box {
               float: right;
               font-size: 14px;
               color: #333333;

               i, label {
                    cursor: pointer;
               }
            }
        }
    }
}
</style>