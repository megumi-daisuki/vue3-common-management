import { defineStore } from "pinia";

// 折叠栏
export const useCollapseStore = defineStore('collapse', {
    state: () => {
        return { collapse: false, }
    },
    actions: {
        changeCollapse() {
            this.collapse = !this.collapse
        }
    }
})

// 路由跳转 面包屑
export const useSelectMenuStore = defineStore('selectMenu', {
    state: () => {
        return {
            currentMenu: null,
            tabsList: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 'home'
                }
            ]
        }
    },
    actions: {
        changeCurrentMenu(val) {
            if (val.name == 'home') {
                this.currentMenu = null
            } else {
                this.currentMenu = val;
                let res = this.tabsList.findIndex((item) => item.name === val.name);
                res == -1 ? this.tabsList.push(val) : '';
            }
        },
        closeTab(val) {
            let res = this.tabsList.findIndex((item) => { item.name === val.name });
            this.tabsList.splice(res, 1)
        }
    }
})

// 存储管理员信息
export const useAdminInfoStore = defineStore('AdminInfo', {
    state: () => {
        return {
            admin: {
                account: '',
                password: '',
                nickName: '',
                vip: ''
            }
        }
    },
    actions: {
        saveAdminInfo(data) {
            this.admin.account = data.account;
            this.admin.password = data.password;
            this.admin.vip = data.vip;
            this.admin.nickName = data.nickName;
            localStorage.setItem('admin', JSON.stringify(this.admin))
        }
    }
})