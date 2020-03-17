import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Landing from './views/Landing.vue'
import Stocks from './views/Stocks.vue'
import Portfolio from './views/Portfolio.vue'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing
        },
        {
            path: '/stocks',
            name: 'stocks',
            component: Stocks
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            component: Portfolio
        }
    ],
    mode: 'history'
})