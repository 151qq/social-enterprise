<template>
    <section class="select-mup-box">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkListPage" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in selectData"
                        :label="item.id">
                {{item.label}}
            </el-checkbox>
        </el-checkbox-group>
    </section>
</template>
<script>
export default {
    props: ['selectData', 'checkList'],
    data () {
        return {
            checkAll: false,
            ids: [],
            dataLength: '',
            checkListPage: []
        }
    },
    mounted () {
        this.ids = this.selectData.map((item) => {
            return item.id
        })
        this.dataLength = this.ids.length
        this.checkListPage = this.checkList
    },
    watch: {
        selectData () {
            this.ids = this.selectData.map((item) => {
                return item.id
            })
            this.dataLength = this.ids.length
        }
    },
    methods: {
        handleCheckAllChange(event) {
            this.checkListPage = event.target.checked ? this.ids : []
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.dataLength
        }
    }
}
</script>
<style lang="scss">
.select-mup-box {
    .el-checkbox-group {
        width: 510px;
        float: right;

        .el-checkbox {
            margin-left: 0;
            margin-right: 15px;
        }
    }
}
</style>