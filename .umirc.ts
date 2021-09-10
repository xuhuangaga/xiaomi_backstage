import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  locale: {
    default: 'zh-CN'
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/login',
      title: '登录'
    },
    {
      path: '/',
      component: '@/pages/layouts/layouts',
      routes:[
        {
          path: '/',
          component: '@/pages/index'
        },
        {
          path: '/carousel',
          component: '@/pages/carousel/carousel'
        },
        {
          path: '/nav',
          component: '@/pages/navigation/navigation'
        },
        {
          path: '/recommend',
          component: '@/pages/recommend/recommend'
        },
        {
          path: '/user',
          component: '@/pages/user/user'
        },
        {
          path: '/product',
          component: '@/pages/product/product/product'
        },
        {
          path: '/add',
          component: '@/pages/product/add/add'
        },
        {
          path: '/specparams',
          component: '@/pages/product/specparams/specparams'
        },
        {
          path: '/class',
          component: '@/pages/product/classification/classification'
        },
        {
          path: '/parameter',
          component: '@/pages/product/parameter/parameter'
        },
        {
          path: '/spec',
          component: '@/pages/product/specifications/specifications'
        },
        {
          path: '/model',
          component: '@/pages/product/promodel/promodel'
        },
        {
          path: '/seckill',
          component: '@/pages/seckill/seckill'
        },
        {
          path: '/coupon',
          component: '@/pages/coupon/coupon'
        },
        {
          path: '/orders',
          component: '@/pages/orders/orders'
        },
        {
          path: '/notice',
          component: '@/pages/notice/notice'
        },
        {
          path: '/customer',
          component: '@/pages/customer/customer'
        },
      ]
    },
  ],
  fastRefresh: {},
});
