<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
        <el-form :inline="true" :model="config">
            <el-form-item label="请输入">
                <el-input v-model="config.searchWord" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSerch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table" style="width: 100%">
        <el-table :data="userList" style="width: 100%" height="440px">
            <el-table-column v-for="item  in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width || 120" />
            <el-table-column label="操作" min-width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="config.total" class="pager" @current-change='changePage' />
    </div>
    <el-dialog v-model="dialogVisible" :title="action=='add'?'新增用户':'修改用户' " width="35%" :before-close="handleClose">
        <el-form :inline="true" :model="addUserData" class="demo-form-inline" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[{required:true,message:'请填写正确的姓名'}]">
                        <el-input v-model="addUserData.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age" :rules="[
                    {required:true,message:'请填写正确的年龄'},
                    {type:'number',message:'请填写数字'}
                    ]">
                        <el-input v-model.number="addUserData.age" placeholder="请输入" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex" :rules="[{required:true,message:'请选择性别'}]">
                        <el-select v-model="addUserData.sex" placeholder="请选择">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生日" prop="birth" :rules="[{required:true,message:'请填写生日'}]">
                        <el-date-picker v-model="addUserData.birth" type="date" placeholder="请选择" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="住址" prop="address" :rules="[{required:true,message:'请填写地址'}]">
                    <el-input v-model="addUserData.address" placeholder="请输入" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end;">
                <el-form-item>
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
        </template> -->
    </el-dialog>
</template>     
    
<script setup >
import { onMounted, reactive, ref, getCurrentInstance } from 'vue';
import { getUserData, addUser, deleteUserData, updateUserData } from '../api/api';
let config = reactive({
    total: 100,
    page: 1,
    searchWord: ''
})

const { proxy } = getCurrentInstance()

let userList = ref([]);  // 用户列表

let dialogVisible = ref(false); // dialog 显示隐藏

const addUserData = reactive({
    name: '',
    age: '',
    sex: '',
    birth: '',
    address: ''
})


const tableLabel = reactive([
    {
        prop: "name",
        label: "姓名",
    },
    {
        prop: "age",
        label: "年龄",
    },
    {
        prop: "sex",
        label: "性别",
    },
    {
        prop: "birth",
        label: "出生日期",
        width: 200,
    },
    {
        prop: "address",
        label: "地址",
        width: 320,
    },])

let action = ref('add');  // 判断是新增还是修改用户模态框


const getUserList = async (config) => {
    let res = await getUserData(config);
    userList.value = res;

}

const changePage = (page) => {
    config.page = page;
    getUserList(config)
}
// 表单搜索
const handleSerch = () => {
    getUserList(config)
}

// 打开添加表单
const handleAdd = () => {
    action.value = 'add';
    dialogVisible.value = true;
}

const handleClose = (done) => {
    ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
            proxy.$refs.userForm.resetFields();
            done();
        })
        .catch(() => {
            // catch error
        });
}

// 新增表单的取消按钮
const handleCancel = () => {
    dialogVisible.value = false;
    proxy.$refs.userForm.resetFields();
};

// 格式化生日日期
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + '-' + add(month) + '-' + add(date)
}
// 添加/修改用户信息 提交按钮
const onSubmit = () => {
    proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
            if (action.value == 'add') {
                addUserData.birth = timeFormat(addUserData.birth);
                // 提交数据给后端
                dialogVisible.value = false;
                addUser(addUserData);
                proxy.$refs.userForm.resetFields();
                getUserList(config);
            } else {
                dialogVisible.value = false;
                updateUserData(addUserData);
                proxy.$refs.userForm.resetFields();
                getUserList(config);
            }
        } else {
            ElMessage({
                showClose: true,
                message: '请输入正确的内容',
                type: "error"
            })
        }
    })

};
// 删除用户数据
const deleteUser = (row) => {
    ElMessageBox.confirm('确定要删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        deleteUserData(row);
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        getUserList(config);
    }).catch(() => {

    })
}
// 修改用户数据
const edit = (row) => {
    // console.log(row);
    action.value = 'edit';
    dialogVisible.value = true;
    // 浅拷贝到模态框
    proxy.$nextTick(() => { Object.assign(addUserData, row) })

}
onMounted(() => {
    getUserList(config);
})
</script>
    
<style lang="less" scoped>
.table {
    position: relative;
    height: 520px;

    .pager {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
    }
}

.user-header {
    display: flex;
    justify-content: space-between;
}
</style>