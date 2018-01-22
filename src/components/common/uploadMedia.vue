<template>
    <section>
        <el-upload
            class="upload-media"
            drag
            action="/E2-Platform/platformFile/uploadFile.json"
            :show-file-list="false"
            :before-upload="resetData"
            :on-success="setUploadCode"
            :data="{
                fileType: fileType,
                oldFilePath: curPath,
                enterpriseCode: $route.query.enterpriseCode
            }">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将媒体拖到此处，或<em>点击上传</em></div>
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