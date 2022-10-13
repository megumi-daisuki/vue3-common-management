<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <CommonAsideVue></CommonAsideVue>
            <el-container class="r-container">
                <CommonHeader></CommonHeader>
                <commonTabVue></commonTabVue>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
    
<script setup >
import { } from 'vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonAsideVue from '../components/CommonAside.vue';
import commonTabVue from '../components/commonTab.vue';
</script>
    
<style lang="less" scoped>
.el-container {
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
}

.common-layout {
    .lay-container {
        flex-wrap: nowrap;

        .right-main {
            height: calc(100% - 124px) !important;
        }
    }

    height: 100%;

    &>.el-container {
        height: 100%;

        &>.el-aside {
            height: 100%;
            background: #545c64;
        }
    }
}
</style>