<template>
    <section>
        <el-upload
            class="upload-demo"
            action="/e2-platform-api/platformFile/uploadFile.json"
            accept="video/*"
            :show-file-list="false"
            :before-upload="resetData"
            :on-success="setUploadCode"
            :data="{
                fileType: fileType,
                oldFilePath: curPath,
                enterpriseCode: $route.query.enterpriseCode
            }">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <div v-if="fileName" class="name-box">
            {{fileName}}
        </div>
    </section>
</template>
<script>
export default {
    props: ['fileType', 'fileCode', 'path', 'mediaName'],
    data () {
        return {
            curPath: '',
            curCode: '',
            fileName: ''
        }
    },
    mounted () {
        this.curPath = this.path
        this.fileName = this.mediaName
    },
    watch: {
        path () {
            this.curPath = this.path
        },
        mediaName () {
            this.fileName = this.mediaName
        }
    },
    methods: {
        setUploadCode (response, file, fileList) {
            if (response.success == '1') {
                var data = {
                    url: response.result.filePath
                }
                this.curPath = data.url
                this.fileName = file.name

                this.$emit('mediaChange', data)
            } else {
                this.$message.error(response.message)
            }
        },
        resetData () {
            this.fileName = ''
        }
    }
}
</script>