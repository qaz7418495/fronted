<template>
	<div class="login-container">
		<div class="login-box">
			<img src="../../assets/buildings.png" alt="logo" class="buildings">
			<div class="slogen">
               <div class="slogen-title">
                    欢迎登录
                    <br/>
                    Super-2021
                </div>
               <div class="slogen-dis">
                	大厦管理系统
               </div>
        </div>
		<LoginForm/>
		</div>
	</div>
	<ParticleBackground/>
</template>
<script setup>
import ParticleBackground from './ParticleBackground.vue';
import LoginForm from './LoginForm.vue';
</script>
<style scoped lang="scss">
.login-container {
	height:100%;
	.buildings{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 52%;
		object-fit: cover;
		z-index: 0;
	}
	.login-box{
		z-index: 2;
		position: absolute;
		width: 80%;
		height: 80%;
		top:50%;
		left:50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248);
		box-sizing: border-box;
		backdrop-filter: blur(8px);
		&:hover {
			box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248),
			0 1.7px 4.3px rgba(0, 0, 0, 0.355), 0 3.5px 8.9px rgba(0, 0, 0, 0.445),
			0 7.3px 18.3px rgba(0, 0, 0, 0.552), 0 20px 50px rgba(0, 0, 0, 0.8);
		}
		&:hover ~ .frosted-bg {
			filter: blur(10px);
		}
	}
}
.slogen {
      position: absolute;
      left: 5%;
      top: calc(50% - 80px);
      &-title {
         font-size: 40px;
         font-weight: 900;
         color: white;
      }
      &-dis {
         margin-top: 5vh;
         font-size: 20px;
         font-weight: 200;
         color: #aab1b9;
         line-height: 30px;
      }
   }
@media screen and (max-width:1260px) {
	.login-form{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%, -50%);
	}
	.slogen{
		display: none;
	}
}
</style>