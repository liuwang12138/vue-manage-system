import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/carBook',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/carBook.vue'),
                    meta: { title: '出租车预订' }
                },
                {
                    path: '/carManage',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/carManage.vue'),
                    meta: { title: '出租车管理' }
                },
                {
                    path: '/customManage',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/customManage.vue'),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/flightBook',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/flightBook.vue'),
                    meta: { title: '航班预订' }
                },
                {
                    // 富文本编辑器组件
                    path: '/flightManage',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/flightManage.vue'),
                    meta: { title: '航班管理' }
                },
                {
                    // markdown组件
                    path: '/hotelBook',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/hotelBook.vue'),
                    meta: { title: '宾馆预订' }
                },
                {
                    // 图片上传组件
                    path: '/hotelManage',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/hotelManage.vue'),
                    meta: { title: '宾馆管理' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        }
    ]
});
