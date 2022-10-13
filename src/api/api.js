/* 
    整个项目api管理
*/

import axios from "../config/axios";

// home组件左侧表格数据
export const getTableData = () => axios.get('/tableData')

// home 组件右侧图标数据
export const getCountData = () => axios.get('/countData')


// user 组件 获取用户列表数据
export const getUserData = (config) => axios.get(`/userData?_limit=10&_page=${config.page}&q=${config.searchWord}`)

// user 组件 添加用户数据
export const addUser = (data) => axios.post('/userData', data)

// user 组件 删除用户数据
export const deleteUserData = (data) => axios.delete(`/userData/${data.id}`)

// user 组件 更新用户数据
export const updateUserData = (data) => axios.put(`/userData/${data.id}`, data)

// login 组件 登录验证
export const login = () => {
    return axios.get('/adminData')
}

