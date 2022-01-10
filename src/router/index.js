import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/index/index'),
        hidden: true
    },
    {
        path: '/pc',
        component: () => import('@/views/pc/index'),
        hidden: true
    },
    {
        path: '/mobile',
        component: () => import('@/views/mobile/index'),
        hidden: true
    },
    {
      path: '/pcquestion',
      component: () => import('@/views/pc/question'),
      hidden: true
    },
    {
        path: '/mobilequestion',
        component: () => import('@/views/mobile/question'),
        hidden: true
    },
    {
        path: '/pcdetail/:id(\\d+)',
        component: () => import('@/views/pc/detail'),
        hidden: true
    },
    {
        path: '/mobiledetail/:id(\\d+)',
        component: () => import('@/views/mobile/detail'),
        hidden: true
    },
    {
        path: '/pcorder',
        component: () => import('@/views/pc/order'),
        hidden: true
    },
    {
        path: '/mobileorder',
        component: () => import('@/views/mobile/order'),
        hidden: true
    },
    
      // 404 page must be placed at the end !!!
      // { path: '*', redirect: '/404', hidden: true }    
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
