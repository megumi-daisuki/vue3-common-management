<template>
    <div class="tags">
        <el-tag v-for="(item,index) in tabStore.tabsList" :key="item.name" :closable="item.name !== 'home'"
            :disable-transitions="false" :effect="route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleColse(item,index)">
            {{item.label}}
        </el-tag>
    </div>
</template>
    
<script setup >
import { useRouter, useRoute } from 'vue-router'
import { useSelectMenuStore } from '../stores/index';

const router = useRouter();
const route = useRoute();
const tabStore = useSelectMenuStore();
const changeMenu = (item) => {
    router.push({
        name: item.name
    })
}

const handleColse = (tag, index) => {
    let Length = tabStore.tabsList.length - 1;
    tabStore.closeTab(tag);

    if (index === Length) {
        router.push({
            name: (tabStore.tabsList)[index - 1].name
        })
    } else {
        router.push({
            name: (tabStore.tabsList)[index].name
        })
    }
    if (route.name !== tag.name) { return };
}

</script>
    
<style lang="less" scoped>
.tags {
    padding: 20px;
    width: 100%;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>