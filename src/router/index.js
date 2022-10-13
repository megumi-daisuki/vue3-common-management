import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/main.vue'),
      redirect: 'login',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../pages/home.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../pages/user.vue')
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('../pages/page1.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../pages/page2.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue')
    },


  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.name == 'page1') {
    alert('无权访问该页面');
  } else {
    next()
  }

})

export default router
