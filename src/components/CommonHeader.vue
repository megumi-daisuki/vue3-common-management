<template>
    <el-header>
        <div class="l-content">
            <el-button size="small" @click="CollapseStore.changeCollapse()">
                <el-icon>
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="selectMenuStore.currentMenu.path" v-if="selectMenuStore.currentMenu">
                    {{selectMenuStore.currentMenu.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="userImg" :src="getImg()">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
    
<script setup>

import { useRouter } from 'vue-router';
import { useSelectMenuStore } from '../stores/index'
import { useCollapseStore } from '../stores/index'
const CollapseStore = useCollapseStore();
const selectMenuStore = useSelectMenuStore();

const router = useRouter();

const getImg = () => new URL('../assets/sato.png', import.meta.url).href;



const exit = () => {
    router.replace({
        name: 'login'
    })
}





</script>
    
<style lang="less" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #333;
}

.r-content {
    .userImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }

    h3 {
        color: #fff;
    }
}

.bread /deep/ span {
    color: #fff !important;
    cursor: pointer !important;
}
</style>