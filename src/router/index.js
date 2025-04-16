// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import LoginView from '../views/login/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import AccountListView from '../views/account/AccountListView.vue';
import AccountAddView from '../views/account/AccountAddView.vue';
import AccountCenterView from '../views/account/AccountCenterView.vue';
import AccountEditView from '../views/account/AccountEditView.vue';
import GoodsListView from '../views/goods/GoodsListView.vue';
import GoodsAddView from '../views/goods/GoodsAddView.vue';
import GoodsTypeView from '../views/goods/GoodsTypeView.vue';
import OrderListView from '../views/orderlist/OrderListView.vue';
import ShopInfoView from '../views/shopinfo/ShopInfoView.vue';
import GoodsStatisticsView from '../views/statistics/GoodsStatisticsView.vue';
import OrderStatisticsView from '../views/statistics/OrderStatisticsView.vue';
import PermissionInfoView from '../views/permission/PermissionInfoView.vue';
import RolePermissionView from '../views/permission/RolePermissionView.vue';
import AddGood from '../components/addGood.vue';
import LoginHomeView from '../views/home/LoginHomeView.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,  
    meta: {
      breadcrumb: [
        { label: '首页' }
      ]
    },
    children: [{
      path: '',
      component: LoginHomeView,
      meta: {
        breadcrumb: [
          { label: '首页' }
        ]
      }
    },
      {
        path: '/accountList',
        name: 'accountList',
        component: AccountListView,
        meta: {
          breadcrumb: [
            { label: '账号管理', path: '/accountList' },
            { label: '账户列表' }
          ]
        }
      },
      {
        path: '/accountAdd',
        name: 'accountAdd',
        component: AccountAddView,
        meta: {
          breadcrumb: [
            { label: '账号管理', path: '/accountList' },
            { label: '添加账户' }
          ]
        }
      },
      {
        path: '/accountCenter',
        name: 'accountCenter',
        component: AccountCenterView,
        meta: {
          breadcrumb: [
            { label: '账号管理', path: '/accountList' },
            { label: '个人中心' }
          ]
        }
      },
      {
        path: '/accountEdit',
        name: 'accountEdit',
        component: AccountEditView,
        meta: {
          breadcrumb: [
            { label: '账号管理', path: '/accountList' },
            { label: '修改密码' }
          ]
        }
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        component: GoodsListView,
        meta: {
          breadcrumb: [
            { label: '商品管理', path: '/goodsList' },
            { label: '商品列表' }
          ]
        }
      },
      {
        path: '/goodsAdd',
        name: 'goodsAdd',
        component: GoodsAddView,
        meta: {
          breadcrumb: [
            { label: '商品管理', path: '/goodsList' },
            { label: '商品添加' }
          ]
        }
      },
      {
        path: '/goodsType',
        name: 'goodsType',
        component: GoodsTypeView,
        meta: {
          breadcrumb: [
            { label: '商品管理', path: '/goodsList' },
            { label: '商品分类' }
          ]
        }
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: OrderListView,
        meta: {
          breadcrumb: [
            { label: '订单管理', path: '/orderList' },
            { label: '订单列表' }
          ]
        }
      },
      {
        path: '/shopInfo',
        name: 'shopInfo',
        component: ShopInfoView,
        meta: {
          breadcrumb: [
            { label: '店铺管理', path: '/shopInfo' },
            { label: '店铺信息' }
          ]
        }
      },
      {
        path: '/goodsStatistics',
        name: 'goodsStatistics',
        component: GoodsStatisticsView,
        meta: {
          breadcrumb: [
            { label: '统计数据', path: '/goodsStatistics' },
            { label: '商品统计' }
          ]
        }
      },
      {
        path: '/orderStatistics',
        name: 'orderStatistics',
        component: OrderStatisticsView,
        meta: {
          breadcrumb: [
            { label: '统计数据', path: '/orderStatistics' },
            { label: '订单统计' }
          ]
        }
      },
      {
        path: '/permissionInfo',
        name: 'permissionInfo',
        component: PermissionInfoView,
        meta: {
          breadcrumb: [
            { label: '权限管理', path: '/permissionInfo' },
            { label: '权限信息' }
          ]
        }
      },{
        path: '/goodsEdit',
        name: 'goodsEdit',
        component: AddGood,
        props: (route) => ({ id: route.query.id }),
      },
      {
        path: '/RolePermission',
        name: 'RolePermission',
        component: RolePermissionView,
        meta: {
          breadcrumb: [
            { label: '权限管理', path: '/RolePermission' },
            { label: '角色管理' }
          ]
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
