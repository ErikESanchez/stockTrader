import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Landing from '../views/Landing.vue'
import Stocks from '../views/Stocks.vue'

let configRoutes = [
    // * Home
    {
        path: '/',
        component: Landing
    },
    {
        path: '/stocks',
        compoent: Stocks
    }
]

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    router: configRoutes
})