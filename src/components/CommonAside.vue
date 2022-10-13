<template>
    <el-aside :width="collapseStore.collapse ? '64px':'180px'">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            :collapse="collapseStore.collapse">
            <h3 v-show="!collapseStore.collapse">后台管理</h3>
            <h3 v-show="collapseStore.collapse">后台</h3>
            <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
                <component :is="item.icon" class="icon"></component>
                <span>{{item.label}}</span>
            </el-menu-item>
            <el-sub-menu :index="item.label" v-for="item in hasChildren() " :key="item.path">
                <template #title>
                    <component :is="item.icon" class="icon"></component>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item-group title="其他页面">
                    <el-menu-item index="1-1" v-for="subitem in item.children" :key="subitem.path"
                        @click="clickMenu(subitem)">
                        <component :is="subitem.icon" class="icon"></component>
                        <span>{{subitem.label}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
    
<script setup >
import { useCollapseStore, useSelectMenuStore } from '../stores/index'
import { useRouter } from 'vue-router'
const list = [
    {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
    },
    {
        label: "其他",
        icon: "location",
        path: '/other',
        children: [
            {
                path: "/page1",
                name: "page1",
                label: "无权访问的页面",
                icon: "setting",
                url: "Other/PageOne",
            },
            {
                path: "/page2",
                name: "page2",
                label: "页面2",
                icon: "setting",
                url: "Other/PageTwo",
            },
        ],
    },
]
const router = useRouter()
const noChildren = () => list.filter(item => !item.children)
const hasChildren = () => list.filter(item => item.children)

const collapseStore = useCollapseStore();
const selectMenuStore = useSelectMenuStore();
const clickMenu = (item) => {
    router.push({
        name: item.name
    })
    // 把当前所在组件名传给pinia
    selectMenuStore.changeCurrentMenu(item)
}
</script>
    
<style lang="less" scoped>
.icon {
    width: 18px;
    height: 18px;
}

.el-menu {
    border-right: none;

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
</style>