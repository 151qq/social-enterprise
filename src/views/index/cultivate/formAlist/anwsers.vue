<template>
    <section class="anwsers-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addItem">增加</el-button>
        <div class="content-body-box" v-for="(item, index) in anwsersData">
            <div class="content-box">
                {{item.subjectContent}}
            </div>
            <div class="imgs-box">
                <upload-imgs :imgs-data="item.attachments"
                             :object-code="item.subjectCode"
                             :is-operate="isOperate"
                             :item-index="index"
                             :id-name="'question' + index"
                             @changeImg="changeQsImg"></upload-imgs>
            </div>
            <section class="btn-show">
                <div class="btn-hover">
                    <el-button class="delete-btn" type="danger"
                        :plain="true" size="small"icon="delete"
                        @click="deleteItem(item)">删除</el-button>

                    <el-button class="delete-btn" type="danger"
                            :plain="true" size="small" icon="setting"
                            @click="editItem(item)">修改</el-button>
                </div>
            </section>
        </div>

        <el-dialog title="添加答案" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addFormData" label-width="80px">
            <el-form-item label="序号">
                <el-input
                    type="number"
                    :min="0"
                    placeholder="请输入"
                    v-model="addFormData.subjectSequence">
                </el-input>
            </el-form-item>
            <el-form-item label="答案">
                <el-switch
                    v-model="addFormData.subjectAnswer"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="选项">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addFormData.subjectContent">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import anwsers from './anwsers'
import uploadImgs from '../../../../components/common/upload-imgs'

export default {
    props: ['anwsersData', 'anwserType'],
    data () {
        return {
            isOperate: true,
            isAddItem: false,
            addFormData: {
                subjectContent: '',
                subjectAnswer: '0',
                subjectSequence: 0
            }
        }
    },
    mounted () {
        // this.getQuestions()
    },
    methods: {
        changeQsImg (data) {
            var obj = {
                attachmentSourceCode: data.url
            }
            this.questionsList[data.index].attachments.push(obj)
        },
        deleteItem (item) {
            util.request({
                method: 'post',
                interface: 'deleteSurveySubject',
                data: {
                  subjectCode: item.subjectCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getQuestions()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        addItem () {
            this.addFormData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                surveyCode: this.$route.query.surveyCode,
                subjectChooseType: this.anwserType,
                subjectType: 'survey_subject_type_2',
                subjectContent: '',
                subjectAnswer: '0'
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.addFormData = Object.assign({}, item)

            this.isAddItem = true
        },
        confirmItem () {
            util.request({
                method: 'post',
                interface: 'manageSurveySubject',
                data: this.addFormData
            }).then(res => {
                if (res.result.success == '1') {
                    this.getQuestions()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        anwsers,
        uploadImgs
    }
}
</script>
<style lang="scss">
.anwsers-box {
    .content-body-box {

    }

    .btn-show {
        margin-bottom: 10px;

        .btn-hover {
            display: block;
            margin-top: 10px;
            overflow: hidden;

            .sort-box {
                float: left;

                .sortInput {
                    width: 80px;
                    height: 28px;

                    .el-input__inner {
                        height: 28px;
                    }

                    .el-input-group__append {
                        padding: 0;
                    }
                }
            }
        }

        .btns {
            background: #EFF2F7;
            display: block;
            padding: 12px;
            overflow: hidden;

            .del-btn {
              float: right;
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 9px;

              &:hover {
                opacity: 0.8;
              }
            }
        }


        .delete-btn {
            float: right;
            margin-left: 10px;
        }
    }
}
</style>