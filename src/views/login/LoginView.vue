<template>
    <div class="login-main">
        <div class="login-logo">
            <img src="@/assets/logo.svg" width="45" />
            <h1 class="mb-0 ml-2 text-3xl font-bold">Ant Admin</h1>
        </div>
        <a-form :labelCol="{ span: 4 }" labelAlign="left" :model="loginFormModel" name="normal_login" class="login-form"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="用户名" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input placeholder="admin" v-model:value="loginFormModel.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item label="密码" name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password placeholder="admin" v-model:value="loginFormModel.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-input v-model:value="loginFormModel.verifyCode" placeholder="验证码" :maxlength="4" size="large">
                    <template #prefix>
                        <SafetyOutlined />
                    </template>
                    <template #suffix>
                        <img :src="captcha" class="absolute right-0 h-full cursor-pointer" @click="updateCaptcha" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-button :loading="loading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    登入
                </a-button>
                <!-- <a href="">register now!</a> -->
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';
import Api from '@/api';
import { useUserStore } from '@/stores/userStore';
import { message, Modal } from 'ant-design-vue';
import to from 'await-to-js';
import { useRoute, useRouter } from 'vue-router';


// 验证码
const captcha = ref('');
const loading = ref(false);

const userStore = useUserStore();
// 获取路由实例
const router = useRouter();
// 获取当前路由信息
const route = useRoute();

const loginFormModel = reactive({
    username: 'admin',
    password: 'admin',
    verifyCode: '',
    captchaId: '',
});

// 更新验证码
const updateCaptcha = async () =>{
    const result = await Api.captcha.captchaGetImg({width:100, height:50});
    captcha.value = result.data.img;
    loginFormModel.captchaId = result.data.id;
    // console.log(result);
}
updateCaptcha();

const onFinish = async () => {
    const {username, password, verifyCode} = loginFormModel;
    if (verifyCode == '') {
        return message.warning('请输入验证码');
    }
    message.loading('登录中...', 0);
    loading.value = true;

    const [err] = await to(userStore.login(loginFormModel));
    if (err) {
        Modal.error({
        title: () => '提示',
        content: () => err.message,
      });
      updateCaptcha();
    } else {
        message.success('登录成功！');
        // 跳转到主页或者恢复到之前页面
        setTimeout(()=> router.replace((route.query.redirect as string) || '/'));
    }
    loading.value = false;
    // 销毁提示消息
    message.destroy();
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(loginFormModel.username && loginFormModel.password);
});
</script>
<style lang="less" scoped>
.login-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: 240px;
    /* background: url('@/assets/login.svg'); */
    background-size: 100%;

    .login-logo {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        color: #00B96D;
        ;
    }

    :deep(.ant-form) {
        width: 400px;

        .ant-form-item-label {
            margin-left: 10px;
        }
    }
}
</style>