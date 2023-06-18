<template>
	<div class="login-form">
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" placeholder="手机号">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="loginForm.password" placeholder="验证码" show-password autocomplete="new-password">
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
					<template #append>
						获取验证码
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class="login-btn">
			<el-button :icon="UserFilled" round @click="submit(loginFormRef)" size="large" type="primary" :disabled="disabled">
				登录
			</el-button>
		</div>
	</div>
</template>
<script setup>
import { CirclePlus, UserFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { useGlobalState } from "../../stores/state.js";
import { Account } from "../../api/account";
import { useRoute,useRouter } from "vue-router";
const globalState = useGlobalState();
const router = useRouter();
const loginFormRef = ref();
const route = useRoute();
const validateName = (rule,value,callback)=>{
	if(!value.length){
		callback(new Error("请输入用户名"))
	}else{
		callback();
	}
}
const validatePassword = (rule,value,callback)=>{
	if(!value.length){
		callback(new Error("请输入密码"))
	}else{
		callback();
	}
}
const loginRules = ref({
	username: [{validator:validateName, trigger: "blur" }],
	password: [{validator:validatePassword, trigger: "blur" }]
});
const loginForm = ref({
    username:"",
    password:""
})
// 禁用登录按钮
const disabled = computed(()=>{
	return !(loginForm.value.username.length && loginForm.value.password.length);
})
const login = ()=>{
	Account.login(loginForm.value).then((res)=>{
		if(res.data.result===1){
			globalState.setToken(res.data.token);
			globalState.setUserType(res.data.userType);
			ElNotification({
				title: getTimeState(),
				message: `${res.data.user.username}`,
				type: "success",
				duration: 3000
			});
		}
		else{
			ElNotification({
				title: "很遗憾",
				message: res.data.message,
				type: "error",
				duration: 3000
			})
		}
	}).catch((err)=>{
		ElNotification({
				title: "很遗憾",
				message: err.message,
				type: "error",
				duration: 3000
			})
	})
}
// 提交前进行表单验权
const submit = (formRef)=>{
	formRef.validate((valid)=>{
		if(valid) login();
	})
}
onMounted(() => {
	// 监听enter事件
	document.onkeydown = (e) => {
		if (route.name=="Login" && (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter")) {
			submit(loginFormRef.value);
		}
	};
});
</script>
<style scoped lang="scss">
:deep(.el-input__wrapper){
	background-color: transparent !important;
}
:deep(.el-input-group__append, .el-input-group__prepend){
	background-color: transparent !important;
}
.login-form {
		position: absolute;
		top:50%;
		left:80%;
		transform: translate(-50%, -50%);
		width: 420px;
		padding: 50px 40px 45px;
		border-radius: 10px;
		box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248);
		.login-logo {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 45px;
			.login-icon {
				width: 200px;
				height: 100px;
			}
			.logo-text {
				padding: 0 0 0 25px;
				margin: 0;
				font-size: 42px;
				font-weight: bold;
				color: #34495e;
				white-space: nowrap;
			}
		}
		.el-form-item {
			margin-bottom: 40px;
		}
		.login-btn {
			width: 100%;
			margin-top: 40px;
			display: flex;
			justify-content: center;
			.el-button {
				width: 185px;
				background-color: transparent;
			}
		}
	}
</style>