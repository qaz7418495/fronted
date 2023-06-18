import { createRouter, createWebHistory } from 'vue-router'
import {useGlobalState} from "../stores/state"
import { ElNotification } from 'element-plus'
import HomeView from '../views/HomeView.vue'
// import { id } from 'element-plus/es/locale'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        // 客户端
        {
          path: '/client',
          name:"client",
          meta:{
            userType:0,
          },
          children:[
            {
              path: '/vistorapplication',
              name: '访客申请',
              component: () => import('../views/visitor/VisitorApplication.vue')
            },
          ]
        },
        // 维修人员
        {
          path:"/chores",
          name:"chores",
          meta:{
            userType:1,
          },
          children:[
            {
              path: 'vistorapplication',
              name: '访客申请',
              component: () => import('../views/visitor/VisitorApplication.vue')
            },
          ]
        },
        // 管理员
        {
          path:"/admin",
          name:"admin",
          meta:{
            userType:2,
          },
          children:[
            {
              path: 'vistorapplication',
              name: '访客申请',
              component: () => import('../views/visitor/VisitorApplication.vue')
            },
          ]
        },
        {
          path: 'room',
          name: 'room',
          component: () => import('../views/room/RoomList.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/account/Login.vue')
    },
    
  ]
})
router.beforeEach((to, from) => {
  // TODO: Add authentication logic here
  const globalState = useGlobalState();
  /* LLLeo's comment: 
    用户分为三种： 普通用户->0
                  维修人员（包括其他物业人员）->1
                  管理员->2
  */
 if(!globalState.isLogin&&to.name!=='login'){
    ElNotification({
      title: "很遗憾",
      message: "请先登录",
      type: "error",
      duration: 3000
    })
    return {name:'login'}
 }
 else{
  if(globalState.userType!==to.meta.userType){
    ElNotification({
      title: "很遗憾",
      message: "您没有权限访问该页面",
      type: "error",
      duration: 3000
    })
  }
 }
})
export default router
