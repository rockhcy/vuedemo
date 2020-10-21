import Vue from 'vue'
import Router from 'vue-router'
import page1 from '@/views/page1'
import page2 from '@/views/page2'
import page3 from '@/views/page3'
import page4 from '@/views/page4'
import mapPage from '@/views/mapPage'
import ssoPage from '@/views/ssoPage'
import svgPage from '@/views/svgPage'

Vue.use(Router)


export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    },
    {
      path: '/page4',
      name: 'page4',
      component: page4
    },
    {
      path: '/mapPage',
      name: 'mapPage',
      component: mapPage
    },
    {
      path: '/ssoPage',
      name: 'ssoPage',
      component: ssoPage
    },
    {
      path: '/svgPage',
      name: 'svgPage',
      component: svgPage
    }
  ]
})