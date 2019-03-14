import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'allToGoods',
      redirect: '/ratings',
      component: Ratings
    },
    // {
    //   path: '*',
    //   name: 'all-goods',
    //   redirect: '/goods',
    //   component: Goods
    // },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
