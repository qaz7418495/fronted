import { createRouter, createWebHistory } from 'vue-router'
import {useGlobalState} from "../stores/state"
import { ElNotification } from 'element-plus'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/room",
      component: HomeView,
      children: [
        /* LLLeo's comment: 
          用户分为三种： 
                        普通用户->0
                        维修人员（包括其他物业人员）->1
                        管理员->2
                        均有权限访问的页面->-1
        */
        {
          meta: {
            userType: 0,
          },
          path: "/vistorapplication",
          name: "访客申请",
          component: () => import("../views/visitor/VisitorApplication.vue"),
        },
        {
          meta: {
            userType: 0,
          },
          path: '/room',
          name: 'room',
          component: () => import('../views/room/RoomList.vue')
        },
        {
          meta: {
            userType: 2,
          },
          path: "/systemusermanage",
          name: "系统人员管理",
          component: () => import("../views/systemusermanage/SystemUserManage.vue"),
        },
      ],
    },
    {
      meta: {
        userType: -1,
      },
      path: "/login",
      name: "login",
      component: () => import("../views/account/Login.vue"),
    },
  ],
});
router.beforeEach((to, from) => {
  // TODO: Add authentication logic here
  const globalState = useGlobalState();
  /* LLLeo's comment: 
    用户分为三种： 普通用户->0
                  维修人员（包括其他物业人员）->1
                  管理员->2
  */
  if (!globalState.isLogin && to.name !== "login") {
    ElNotification({
      title: "很遗憾",
      message: "请先登录",
      type: "error",
      duration: 3000,
    });
    return { name: "login" };
  } 
  if (to.meta.userType && globalState.userType < to.meta.userType) {
    ElNotification({
      title: "很遗憾",
      message: "您没有权限访问该页面",
      type: "error",
      duration: 3000,
    });
  }
});
export default router;
