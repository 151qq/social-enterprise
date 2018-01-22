<template>
    <section class="questions-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addItem">题目</el-button>
        <div class="content-body-box" v-for="(item, index) in questionsList">
            <div class="content-box">
                {{item.subjectContent}}
            </div>
            <div class="imgs-box">
                <upload-imgs :imgs-data="item.attachments"
                             :object-code="item.subjectCode"
                             :is-operate="isOperate"
                             :item-index="index"
                             :item-code="item.subjectCode"
                             :id-name="'question' + index"
                             @changeImg="changeQsImg"
                             @deleteImg="deleteImg"></upload-imgs>
            </div>
            <div class="up-down-box" @click="anwserShowOrHidden(index)">
                <i :class="showStatus[index] ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            </div>
            <section class="anwsers-box" v-if="showStatus[index]">
                <el-button class="add-btn" type="primary" icon="plus" size="mini" @click="addAnwser(item)">答案</el-button>
                <div class="content-body-box anwser-box" v-for="(anwser, indexA) in item.options">
                    <div class="select-box">
                        <template v-if="item.subjectChooseType == 'survey_subject_choose_type_1'">
                            <img v-if="anwser.subjectAnswer == '0'"
                                 class="radio-icon" 
                                 src="../../../../assets/images/radio-icon.png">
                            <img v-if="anwser.subjectAnswer == '1'"
                                 class="radio-icon" 
                                 src="../../../../assets/images/radio-now.png">
                        </template>
                        <template v-if="item.subjectChooseType == 'survey_subject_choose_type_2'">
                            <img v-if="anwser.subjectAnswer == '0'"
                                 class="check-icon" 
                                 src="../../../../assets/images/check-icon.png">
                            <img v-if="anwser.subjectAnswer == '1'"
                                 class="check-icon"
                                 src="../../../../assets/images/check-now.png">
                        </template>
                    </div>
                    <section class="cont-box">
                        <div class="content-box">
                            {{anwser.subjectContent}}
                        </div>
                        <div class="imgs-box">
                            <upload-imgs :imgs-data="anwser.attachments"
                                         :object-code="anwser.subjectCode"
                                         :is-operate="isOperate"
                                         :item-index="indexA"
                                         :item-code="anwser.subjectCode"
                                         :id-name="'anwser' + index + 'I' + indexA"
                                         @changeImg="changeQsImg"
                                         @deleteImg="deleteImg"></upload-imgs>
                        </div>
                        <section class="btn-show">
                            <div class="btn-hover">
                                <el-button class="delete-btn" type="danger"
                                    :plain="true" size="mini"icon="delete"
                                    @click="deleteItem(anwser)">删除</el-button>

                                <el-button class="delete-btn" type="danger"
                                        :plain="true" size="mini" icon="setting"
                                        @click="editAnwser(anwser)">修改</el-button>
                            </div>
                        </section>
                    </section>
                </div>
            </section>
            <section class="btn-show" v-if="!showStatus[index]">
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

        <el-dialog title="添加题目" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addFormData" label-width="80px">
            <el-form-item label="序号">
                <el-input
                    type="number"
                    :min="0"
                    placeholder="请输入"
                    v-model="addFormData.subjectSequence">
                </el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="addFormData.subjectChooseType"
                            placeholder="请选择">
                    <el-option
                      v-for="(item, index) in subjectTypes"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目">
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

        <el-dialog title="添加答案" :visible.sync="isAddAnwser">
          <el-form :label-position="'left'" :model="addAnwserData" label-width="80px">
            <el-form-item label="序号">
                <el-input
                    type="number"
                    :min="0"
                    placeholder="请输入"
                    v-model="addAnwserData.subjectSequence">
                </el-input>
            </el-form-item>
            <el-form-item label="答案">
                <el-switch
                    v-model="addAnwserData.subjectAnswer"
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
                    v-model="addAnwserData.subjectContent">
                </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddAnwser = false">取 消</el-button>
                <el-button type="primary" @click="confirmAnwser">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import anwsers from './anwsers'
import uploadImgs from '../../../../components/common/upload-imgs'

export default {
    data () {
        return {
            isOperate: true,
            questionsList: [],
            isAddItem: false,
            addFormData: {
                subjectContent: '',
                subjectChooseType: '',
                subjectSequence: 0
            },
            isAddAnwser: false,
            addAnwserData: {
                subjectContent: '',
                subjectAnswer: '0',
                subjectSequence: 0
            },
            subjectTypes: [
                {
                    label: '单选',
                    value: 'survey_subject_choose_type_1'
                },
                {
                    label: '多选',
                    value: 'survey_subject_choose_type_2'
                }
            ],
            showStatus: []
        }
    },
    mounted () {
        this.getQuestions()
    },
    methods: {
        getQuestions (type) {
            util.request({
                method: 'get',
                interface: 'selectSurveySBySC',
                data: {
                  surveyCode: this.$route.query.surveyCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var arrs = []

                    res.result.result.forEach((item) => {
                        arrs.push(false)
                    })

                    if (type) {
                        this.showStatus = arrs
                    }

                    this.questionsList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeQsImg (data) {
            var obj = {
                attachmentSourceCode: data.url
            }

            util.request({
                method: 'post',
                interface: 'attachmentInsert',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    attachmentSourceCode: data.code,
                    attachmentTargetCode: data.url
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getQuestions()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteImg (item) {
            util.request({
                method: 'post',
                interface: 'attachmentDelete',
                data: {
                    id: item.id
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
        anwserShowOrHidden (index) {
            if (!this.showStatus[index]) {
                this.showStatus.splice(index, 1, true)
            } else {
                this.showStatus.splice(index, 1, false)
            }
        },
        deleteItem (item) {
            util.request({
                method: 'get',
                interface: 'deleteSurveySubject',
                data: {
                  surveySubjectCode: item.subjectCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getQuestions('init')
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
                subjectSetCode: this.$route.query.surveyCode,
                subjectSetType: this.$route.query.surveyType,
                subjectSequence: '',
                subjectContent: '',
                subjectChooseType: '',
                subjectType: 'survey_subject_type_1'
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
                    this.getQuestions('init')
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        addAnwser (item) {
            this.addAnwserData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                subjectSetCode: this.$route.query.surveyCode,
                subjectSetType: this.$route.query.surveyType,
                subjectParent: item.subjectCode,
                subjectSequence: '',
                subjectType: 'survey_subject_type_2',
                subjectContent: '',
                subjectAnswer: '0'
            }

            this.isAddAnwser = true
        },
        editAnwser (item) {
            this.addAnwserData = Object.assign({}, item)

            this.isAddAnwser = true
        },
        confirmAnwser () {
            util.request({
                method: 'post',
                interface: 'manageSurveySubject',
                data: this.addAnwserData
            }).then(res => {
                if (res.result.success == '1') {
                    this.getQuestions('init')
                    this.isAddAnwser = false
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
.questions-box {
    .el-form-item__content .el-switch__label {
        top: 0;
    }

    .content-body-box {
        margin-bottom: 15px;

        .content-box {
            font-size: 16px;
            line-height: 24px;
        }

        .imgs-box {
            margin-top: 10px;
        }

        .up-down-box {
            font-size: 14px;
            color: #000000;
            line-height: 30px;
            cursor: pointer;
            margin-top: 5px;
        }
    }

    .anwsers-box {
        position: relative;
        .content-body-box {
            margin-bottom: 0;
        }


        .add-btn {
            top: -26px;
        }

        .anwser-box {
            display: flex;

            .select-box {
                width: 30px;

                .radio-icon {
                    margin-top: 3px;
                    display: block;
                    width: 16px;
                    height: 16px;
                }

                .check-icon {
                    margin-top: 2px;
                    display: block;
                    width: 18px;
                    height: 18px;
                }
            }

            .cont-box {
                flex: 1;
            }

            .img-big {
              display: block;
              width: 96px;
              height: 56px;
            }

            .btn-show {
                margin-top: 10px;
            } 
        }

        .content-box {
            font-size: 14px;
        }
    }

    .btn-show {
        float: right;
        margin-top: -30px;

        .btn-hover {
            display: block;
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