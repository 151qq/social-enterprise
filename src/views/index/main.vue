<template>
    <section>
        <web-header @loadPage="loadPage"></web-header>
        <section class="mid-body-box">
            <router-view v-if="isPage == '1' || $route.name == 'enterprise-detail'"></router-view>
            <div v-if="isPage == '0'" class="null-register">
                请您先去
                <router-link class="nav-registor" :to="{name: 'enterprise-detail'}">
                    <el-button type="text">注册企业</el-button>
                </router-link>
                !!!
            </div>
        </section>
        
        <web-footer></web-footer>
    </section>
</template>
<script>
import webHeader from '../../components/common/header.vue'
import webFooter from '../../components/common/footer.vue'

export default {
    data () {
        return {
            isPage: ''
        }
    },
    methods: {
        loadPage (status) {
            this.isPage = status
        }
    },
    components: {
        webHeader,
        webFooter
    }
}
</script>
<style lang="scss">
.mid-body-box {
    min-height: 500px;
}

.null-register {
    text-align: center;
    font-size: 14px;
    color: #999999;
    padding-top: 200px;
}
</style>