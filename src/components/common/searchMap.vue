<template>
    <section class="add-box-house">
        <el-dialog title="添加地图" :visible.sync="isAdd.value">
            <search-box :is-page="true"
                    @mapChange="drawMap"
                    ref="searMap"></search-box>
            <div id="containerhouse"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdd.value = false">取 消</el-button>
                <el-button type="primary" @click="confirmHandle">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import searchBox from '../common/search-box.vue'

export default {
    props: ['isAdd', 'mapData'],
    data () {
        return {
            nowIndex: ''
        }
    },
    methods: {
        initMap (index) {
            this.$refs.searMap.resetKey(this.mapData.address)
            
            if (!this.map) {
                var map = new window.BMap.Map('containerhouse')
                this.map = map
                var point = new window.BMap.Point(116.409, 39.918)
                map.centerAndZoom(point, 15)
            }

            if (index === undefined) {
                this.nowIndex = ''
                this.map.clearOverlays()
                return
            } else {
                this.nowIndex = index
                var pointArr = this.mapData.point.split(',')
                setTimeout(() => {
                    var point = new window.BMap.Point(pointArr[0], pointArr[1])
                    this.map.clearOverlays()
                    var marker = new BMap.Marker(point)
                    this.map.panTo(point)
                    this.map.addOverlay(marker)
                }, 300)
            }
        },
        drawMap (mapInfo) {
            this.mapData.point = mapInfo.point.lng + ',' + mapInfo.point.lat
            this.mapData.address = mapInfo.title
            var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            this.map.clearOverlays()
            this.map.panTo(point)
            var marker = new BMap.Marker(point)
            this.map.addOverlay(marker)
        },
        confirmHandle () {
            if (this.mapData.point == '') {
                this.$message({
                  message: '地址不能为空！',
                  type: 'warning'
                })
                return false
            }

            var data = {
                index: this.nowIndex,
                point: this.mapData.point,
                address: this.mapData.address,
                content: this.setImg(this.mapData.point)
            }
            this.$emit('setMap', data)
        },
        setImg (point) {
            var url = 'http://api.map.baidu.com/staticimage?center=' + this.mapData.point + '&zoom=17&width=1000&height=600&markers=' + this.mapData.point + '&name=' + this.mapData.address
            var htmlStr = '<img src="' + url + '" style="display:block;width:100%;">'

            return htmlStr
        }
    },
    components: {
        searchBox
    }
}
</script>
<style lang="scss">
.add-box-house {
    .el-dialog {
        width: 680px;
    }

    #containerhouse {
        width: 640px;
        height: 180px;
        margin: 20px 0 15px;
    }
}
</style>