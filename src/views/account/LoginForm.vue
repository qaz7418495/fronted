<template>
	<div class="login-form">
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
			<el-form-item prop="phone_number">
				<el-input v-model="loginForm.phone_number" placeholder="手机号">
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
						<el-button @click="postCode">{{ appendText }}</el-button>
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
import { UserFilled } from "@element-plus/icons-vue";
import { useGlobalState } from "../../stores/state.js";
import { Account } from "../../api/account";
import { useRoute,useRouter } from "vue-router";
const globalState = useGlobalState();
const router = useRouter();
const loginFormRef = ref();
const route = useRoute();
const appendText = ref("获取验证码");
const validateName = (rule,value,callback)=>{
	if(!value.length||!/^1[3456789]\d{9}$/.test(value)){
		callback(new Error("请输入正确格式手机号"))
	}else{
		callback();
	}
}
const validatePassword = (rule,value,callback)=>{
	if(!value.length){
		callback(new Error("请输入验证码"))
	}else{
		callback();
	}
}
const loginRules = ref({
	phone_number: [{validator:validateName, trigger: "blur" }],
	password: [{validator:validatePassword, trigger: "blur" }]
});
const loginForm = ref({
    phone_number:"",
    password:""
})
// 禁用登录按钮
const disabled = computed(()=>{
	return !(loginForm.value.phone_number.length && loginForm.value.password.length);
})
const login = ()=>{
	Account.login(loginForm.value).then((res)=>{
		if(res.data.result===1){
			console.log(res.data);
			globalState.setToken(res.data.token);
			globalState.setUserInformation(res.data.user_information);
			ElNotification({
				title: "恭喜你",
				message: res.data.message,
				type: "success",
				duration: 3000
			})
			router.push({name:"client"});
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
const postCode = ()=>{
	if(!/^1[3456789]\d{9}$/.test(loginForm.value.phone_number)){
		ElNotification({
				title: "很遗憾",
				message: "请输入正确格式手机号",
				type: "error",
				duration: 3000
		})
		return;
	}
	if(appendText.value!="获取验证码") return;
	Account.postCode({
		phone_number:loginForm.value.phone_number
	}).then((res)=>{
		if(res.data.result==1){
			ElNotification({
				title: "请查验",
				message: res.data.message,
				type: "success",
				duration: 3000
			})
			let time = 60;
			appendText.value = `${time}s后重新获取`;
			let timer = setInterval(()=>{
				time--;
				appendText.value = `${time}s后重新获取`;
				if(time===0){
					appendText.value = "获取验证码";
					clearInterval(timer);
				}
			},1000)
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
		box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.6);
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