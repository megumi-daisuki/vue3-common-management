<template>

    <el-row class="home" :gutter="20">
        <!-- 左侧 -->
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../assets/sato.png">
                    <div class="user-info">
                        <p class="name">{{admin.nickName}}</p>
                        <p class="role">{{admin.vip}}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间: <span>xxxxxxxxx</span></p>
                    <p>上次登录地点: <span>xxxxxxxxx</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px" height="450px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右侧 -->
        <el-col :span="16" style="margin-top: 20px;">
            <!-- 上半 -->
            <div class="num">
                <el-card :body-style="{display:'flex',padding : 0}" v-for="item  in countList" :key="item.name">
                    <component :is="item.icon" class="icon" :style="{background:item.color}"></component>
                    <div class="details">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- 下半 -->
            <el-card style="height:280px">
                <div ref="echart" style="height:280px">

                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
    
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAdminInfoStore } from '../stores'
import { getTableData, getCountData } from '../api/api';
import { json } from 'stream/consumers';
let tableData = ref([]);
let countList = ref([]);
let admin = reactive({
    nickName: '',
    vip: '',
})
const adminInfo = useAdminInfoStore();
const route = useRoute();

const tableLabel = {
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
}
const getTableList = async () => {
    /* console.log(route.query);
    userAccount.value = route.params */
    let res = await getTableData();
    tableData.value = res;
}
const getCountList = async () => {
    let res = await getCountData();
    countList.value = res;
}

const getAdminInfo = () => {
    // 先从pinia取，没有就去本地取
    if (adminInfo.admin.account && adminInfo.admin.password) {
        admin.nickName = adminInfo.admin.nickName;
        admin.vip = adminInfo.admin.vip
    } else {
        var res = JSON.parse(localStorage.getItem('admin'))
        admin.nickName = res.nickName;
        admin.vip = res.vip;
    }
}

let xOptions = reactive({});
let pieOptions = reactive({});
let orderData = reactive({
    xData: [],
    series: [],
})

onMounted(() => {
    getTableList();
    getCountList();
    getAdminInfo()

})
</script>
    
<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }


    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;

            }
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 14px;
                text-align: center;
                color: #999;
            }
        }
    }
}
</style>