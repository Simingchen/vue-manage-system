import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)  左侧显示
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view    标签固定
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export let constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/account/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/account/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/account/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

constantRoutes = [
  ...constantRoutes,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const testRoute = {
  path: '/test',
  component: Layout,
  redirect: '/guide/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/test.vue'),
      name: 'Guide',
      meta: { title: '测试页面', icon: 'guide', noCache: true }
    }
  ]
}

if (process.env.NODE_ENV == 'development') {
  constantRoutes.push(testRoute)
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
