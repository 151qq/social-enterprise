<template>
    <!--    公司相册 管理员可以增删改查，其他人只能查
            活动现场 目录只能更新，素材可以增删改查
            系统图片 目录不能更改，素材可以增删改查
            平台图片 平台可以增删改查，企业只能查
     -->
    <div class="source-box">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="'公司相册'" :name="'e2_1'">
                <image-manage :file-type="'e2_1'"></image-manage>
            </el-tab-pane>
            <el-tab-pane :label="'活动现场'" :name="'e2_2'">
                <image-manage :file-type="'e2_2'"></image-manage>
            </el-tab-pane>
            <el-tab-pane :label="'产品相册'" :name="'e2_5'">
                <image-manage :file-type="'e2_5'"></image-manage>
            </el-tab-pane>
            <el-tab-pane :label="'系统图片'" :name="'e2_3'">
                <image-manage :file-type="'e2_3'"></image-manage>
            </el-tab-pane>
            <el-tab-pane :label="'平台图片'" :name="'e2_4'">
                <image-manage :file-type="'e2_4'"></image-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../../assets/common/util'
import imageManage from './imageManage'

export default {
    data() {
        return {
            activeName: 'e2_1'
        }
    },
    mounted () {
    },
    methods: {
    },
    components: {
        imageManage
    }
}
</script>
<style lang="scss">
.source-box {
    position: relative;
    width: 1020px;
    min-height: 500px;
    margin: 80px auto 40px;

    .el-dialog--small {
        width: 490px;
    }

    .set-btn {
        position: absolute;
        right: 8px;
        top: 7px;
        width: 72px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #20A0FF;
        border: 1px solid #20A0FF;
        border-radius: 3px;
        cursor: pointer;
        z-index: 9999;

        &:hover {
            opacity: 0.8;
        }
    }

    .btns-op {
        position: fixed;
        right: 10px;
        top: 160px;
        width: 43px;
        border: 1px solid #D3DCE6;
        border-radius: 3px;
        background: #F8FBFF;
        box-sizing: border-box;
        padding: 0 5px;
        text-align: center;
        line-height: 0;

        img {
            display: inline-block;
            margin: 13px 0;
            cursor: pointer;
            padding: 0 5px;

            &:hover {
                opacity: 0.7;
            }
        }

        .up-box {
            position: relative;
            height: 27px;

            img {
                display: block;
                width: 14px;
                height: 14px;
                margin: 13px auto;
                padding: 0;
            }

            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 27px;
                opacity: 0.01;
            }
        }

        .disable {
            opacity: 0.5;
            cursor: no-drop;
        }

        span {
            display: block;
            height: 1px;
            background: #D3DCE6;
        }
    }

    .dia-s-body {
        overflow: hidden;

        .el-checkbox {
            float: left;
            width: 145px;
            margin: 0 5px 20px 0;

            .el-checkbox__inner {
                margin-right: 7px;
            }
        }
    }

    .el-tabs__header {
        border: none;
    }

    .el-tabs__item {
        color: #000000;

        &:hover {
            color: #20A0FF;
        }
    }

    .is-active {
        color: #20A0FF;
    }

    .no-img {
        text-align: center;
        line-height: 160px;
        font-size: 20px;
        color: #999999;
    }
}
</style>