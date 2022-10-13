<template>
    <div class="login-container">

        <video autoplay muted loop>
            <source src="../assets/background.mp4">
        </video>
        <el-form ref="loginFormRef" :model="loginForm">
            <h3>Login</h3>
            <el-form-item prop="account" :rules="[{required:true,message:'请输入用户名'}]">
                <el-input type="input" placeholder="请输入账号" v-model="loginForm.account">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{required:true,message:'请输入密码'}]">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <a>忘记密码？</a>
            </el-form-item>
            <el-form-item class="login_button">
                <el-button type="primary" @click="Login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
    
<script setup >
import { getCurrentInstance, reactive, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login } from '../api/api';
import { useAdminInfoStore } from '../stores'
const loginForm = reactive({
    account: '',
    password: ''
})
const AdminInfo = useAdminInfoStore();
const router = useRouter();
const { proxy } = getCurrentInstance()
// 登录
const Login = () => {
    // 表单校验
    proxy.$refs.loginFormRef.validate(async (vaild) => {
        if (vaild) {
            // 校验通过
            let res = await login();
            res.forEach((item) => {
                if (item.account == loginForm.account && item.password == loginForm.password) {
                    // 保存数据到pinia和本地
                    AdminInfo.saveAdminInfo(item);

                    router.replace({
                        name: 'home',
                    })
                } else {
                    ElMessage.error('账号或密码错误');
                }
            })
        } else {
            // 校验失败
            ElMessage({
                showClose: true,
                message: '请输入正确的内容',
                type: "error"
            })
        }
    })

}


</script>
    
<style lang="less" scoped>
.login-container {


    video {
        position: absolute;
        width: 100%;
        object-fit: cover;
    }

    .el-form {
        position: absolute;
        width: 400px;
        left: 50%;
        top: 35%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0);

        h3 {
            text-align: center;
            font-size: 30px;
            color: #409eff;
            padding-bottom: 10px;
        }

        a {
            font-size: medium;
            color: #c0c0c0;
        }

        a:hover {
            color: #409eff;
        }

        /deep/.el-form-item__content {

            justify-content: center;

        }
    }


}
</style>