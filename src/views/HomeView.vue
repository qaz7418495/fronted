<template>
  <div class="main-wrap clearfix">
    <div class="nav" ref="navTarget">
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
        <div class="item" @click="extendNav">
          <div class="light"></div>
          <!-- <div class="licon"><span class="iconfont icon-wenjian"></span></div> -->
          <div class="licon"><span class="iconfont icon-Icon_wenjian"></span></div>
          <div class="con">租户管理</div>
        </div>
        <div class="item" @click="extendNav">
          <div class="light"></div>
          <!-- <div class="licon"><span class="iconfont icon-qipao1"></span></div> -->
          <div class="licon"><span class="iconfont icon-wechat"></span></div>
          <div class="con">系统人员</div>
        </div>
        <div class="item" @click="extendNav">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-shipinhuiyi"></span>
          </div>
          <div class="con">房间管理</div>
        </div>
        <div class="item" @click="extendNav">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-shezhi"></span>
          </div>
          <div class="con">访客管理</div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="header">
      <button @click="extendNav">展开</button>
    </div>
    <div class="body">
      <RouterView/>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const navTarget = ref(null);
const extendNav = () => {
  console.log("?");
  navTarget.value.classList.toggle("extend");
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.6);
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
}

.item:hover {
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

.ricon {
  width: 0px;
  height: 50px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0;
}

.nav.extend .ricon {
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.iconfont {
  font-size: 26px;
}

.ricon .iconfont {
  font-size: 20px;
  color: #62cb44;
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
  height: 80px;
  width: calc(100% - 110px);
  box-sizing: border-box;
  border: solid 1px #de1616;
  transition: 0.5s;
  color: black;
}

/* #endregion页面 header */

/* #region页面整体 body */
.nav.extend~.body {
  width: calc(100% - 280px);
}

.body {
  position: absolute;
  top: 80px;
  right: 0;
  width: calc(100% - 110px);
  height: 5000px;
  box-sizing: border-box;
  border: #62cb44 1px solid;
  transition: 0.5s;
}


/* #endregion页面整体 body */


</style>