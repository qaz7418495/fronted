import { createRouter, createWebHistory } from 'vue-router'
import {useGlobalState} from "../stores/state"
import { ElNotification } from 'element-plus'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    // 客户端
    {

    },
    // 维修人员
    {

    },
    // 管理员
    {
      
    }
  ]
})
router.beforeEach((to, from) => {
  // TODO: Add authentication logic here
  const globalState = useGlobalState();
  /* LLLeo's comment: 
    用户分为三种：普通用户、维修人员（包括其他物业人员）和管理员
  */
 if(!globalState.isLogin&&to.name!=='Login'){
    ElNotification({
      title: "很遗憾",
      message: "请先登录",
      type: "error",
      duration: 3000
    })
    return {name:'Login'}
 }


})
export default router
