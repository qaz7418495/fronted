<template>
  <div class="main-wrap clearfix">
    <div class="nav" ref="navTarget" @mouseenter="extendNav" @mouseleave="extendNav">
      <!--头像-->
      <div class="icon">
        <div class="icon-img"><img src="/hua.jpg" alt="" /></div>
        <div class="icon-con">
          <p>Good Bro Building</p>
          <h2>HuaYe Hu.</h2>
        </div>
      </div>
      <div class="line"></div>
      <div class="menu">
        <RouterLink 
          v-for="(navItem, index) in navItemList" 
          :to="navItem.navItemLink" 
          style="text-decoration: none; color: rgba(255, 255, 255, 0.6);"
          :key="index"
          active-class="active"
        >
          <div class="item" @click="handleClickNavItem(navItem.navItemText)">
            <div class="light"></div>
            <div class="licon"><span class="iconfont" :class="navItem.navItemIcon"></span></div>
            <div class="con">{{navItem.navItemText}}</div>
          </div>
        </RouterLink>
      </div>
      <div class="line"></div>
    </div>
    <div class="header">
      <div class="header-content">
        <div class="header-icon" @click="extendNav">
          <span class="iconfont" :class="isNavExtended ? 'icon-shouqicaidan' : 'icon-zhankaicaidan'"></span>
        </div>
        <div class="header-nav-text" v-if="!isNavExtended">
          {{ currentNavTextInHeader }}
        </div>
      </div>
    </div>
    <div class="body">
      <RouterView/>
    </div>
  </div>
</template>

<script>
const ALL_ROLES_NAV_ARRAY = [
  [
    {
      navItemText: "房间管理",
      navItemIcon: "icon-shipinhuiyi",
      navItemLink: "/room-manage"
    },
    {
      navItemText: "访客管理",
      navItemIcon: "icon-shezhi",
      navItemLink: "/vistor-application-manage"
    },
  ],
  [
    {
      navItemText: "房间管理",
      navItemIcon: "icon-shipinhuiyi",
      navItemLink: "/room-manage"
    },
  ],
  [
    {
      navItemText: "房间管理",
      navItemIcon: "icon-shipinhuiyi",
      navItemLink: "/room-manage"
    },
    {
      navItemText: "租户管理",
      navItemIcon: "icon-Icon_wenjian",
      navItemLink: "/client-manage"
    },
    {
      navItemText: "系统人员",
      navItemIcon: "icon-wechat",
      navItemLink: "/systemuser-manage"
    },
    {
      navItemText: "访客管理",
      navItemIcon: "icon-shezhi",
      navItemLink: "/vistor-application-manage"
    },
  ],
]
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { useGlobalState } from '../stores/state';
import { assert } from '@vueuse/core';
import { useRouter } from 'vue-router';

const globalState = useGlobalState();
const router = useRouter();
const headerHeight = ref("60px");
const isNavExtended = ref(false);
const currentNavTextInHeader = ref("");

const navTarget = ref(null);
const extendNav = () => {
  isNavExtended.value = !isNavExtended.value;
  navTarget.value.classList.toggle("extend");
}
const handleClickNavItem = (text) => {
  currentNavTextInHeader.value = text;
  extendNav();
}

const navItemList = ref([]);
onMounted(() => {
  assert(globalState.userType !== -1);
  navItemList.value = ALL_ROLES_NAV_ARRAY[ globalState.userType ];
  currentNavTextInHeader.value = ALL_ROLES_NAV_ARRAY[ globalState.userType ].find(
    item => item.navItemLink === router.currentRoute.value.fullPath
  )?.navItemText;
});

</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 清除外边距折叠和高度塌陷 */
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
.main-wrap {
  width: 100%;
  height: 100vh;
  position: relative;
}

/* #region 可伸缩导航栏部分 */
.nav {
  position: fixed;
  width: 110px;
  margin-right: 180px;
  height: 100%;
  background: rgba(0, 0, 0);
  /* border-radius: 20px; */
  overflow: hidden;
  transition: 0.5s;
  color: rgba(255, 255, 255, 0.6);
}

.nav.extend {
  width: 280px;
}

.icon {
  width: 250px;
  height: 60px;
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
}

.icon-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.icon-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.icon-con {
  height: 60px;
  margin-left: 25px;
}

.icon-con p {
  padding-top: 5px;
}

.icon-con h2 {
  font-weight: 400;
}

.line {
  width: 60px;
  height: 1.6px;
  background: rgba(245, 253, 255, 0.5);
  margin: 20px 25px;
  transition: 0.5s;
}

.nav.extend .line {
  width: 230px;
}

.title {
  width: 60px;
  margin-left: 25px;
  margin-bottom: 20px;
}

.title p {
  font-size: 14px;
}

.menu {
  width: 60px;
  margin-left: 25px;
  transition: 0.5s;
}

.nav.extend .menu {
  width: 230px;
  margin-left: 25px;
}

.item {
  display: flex;
  position: relative;
  transition: 0.5s;
  border-radius: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-family:Harmony_Regular, 'Microsoft YaHei','微软雅黑', sans-serif!important;
}

/* router-link active-class 对应的样式 */
.item:hover, a.active > .item {
  /* background: rgba(255, 255, 255, 0.1); */
  background: rgba(255, 255, 255, 0.3);
}

.light {
  width: 6px;
  height: 50px;
  background: #eb5a56;
  position: absolute;
  left: -25px;
  transition: 0.5s;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}

/* 确保在未展开的情况下，不会出现light */
.nav.extend .item:hover .light {
  opacity: 1;
}

.licon {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con {
  width: 0px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  left: -20px;
  opacity: 0;
  /* 这里很重要，不然汉字会在宽度影响下被换行 */
  white-space: nowrap;
}

.nav.extend .con {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.licon .iconfont {
  font-size: 26px;
}


.serve {
  width: 60px;
  background: rgba(0, 0, 0, 0.7);
  margin-left: 25px;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.5s;
}

.nav.extend .serve {
  width: 230px;
}

/* #endregion 可伸缩导航栏部分 */


/* #region页面 header */
.nav.extend~.header {
  width: calc(100% - 280px);
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  height: v-bind(headerHeight);
  width: calc(100% - 110px);
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: white;
  /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important; */
  /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.14); */
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.12)!important;
  transition: 0.5s;
  background-color: white;
  z-index: 9999;
  font-family: Harmony_Regular, sans-serif!important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.route-name{
  font-size: 25px;
  font-weight: 500;
  color: #000000;
  margin-left: 20px;
}

.header .header-content {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  /* border: #eb5a56 1px solid; */
}

.header .header-content .header-icon {
  float: left;
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-icon > .iconfont {
  font-size: 26px;
}
.header .header-content .header-nav-text{
  height: 100%;
  font-size: 18px;
}
/* #endregion页面 header */

/* #region页面整体 body */
.nav.extend~.body {
  width: calc(100% - 280px);
}

.body {
  position: absolute;
  top: v-bind(headerHeight);
  right: 0;
  width: calc(100% - 110px);
  min-height: calc(100vh - v-bind(headerHeight));
  box-sizing: border-box;
  background-color: rgb(234, 239, 244);
  transition: 0.5s;
  z-index: 9998;
  overflow: hidden;
}
/* #endregion页面整体 body */


</style>
  
