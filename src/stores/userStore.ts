import Api from "@/api";
import { ref } from "vue";
import { defineStore } from "pinia";


export const useUserStore = defineStore(
    'user',
    () => {
        // 定义数据
        const token = ref<string>();
        const userInfo = ref<Partial<API.UserEntity>>({});
        const permissions = ref<string[]>([]);
        const menus = ref([]);

        // 定义方法

        // 清空登录状态
        const clearLoginStatus = ()=>{
            token.value = '';
            userInfo.value = {};
            permissions.value = [];
            menus.value = [];
        }

        // 登录成功保存token
        const setToken = (_token: string)=>{
            token.value = _token;
        }

        // 登录
        const login = async (params: API.LoginDto)=>{
            try {
                // 登录
                const result = await Api.auth.authLogin(params);
                // 设置token
                setToken(result.data.token);
                // 保存登录信息
                await afterLogin()
            } catch (error) {
                return Promise.reject(error);
            }
        }

        // 登录成功后保存登录信息
        const afterLogin = async () =>{
            try {
                // 获取用户信息并保存
                const userInfoData = await Api.account.accountProfile();
                userInfo.value = userInfoData;

            } catch (error) {
                return Promise.reject(error);
            }
        }

        // 获取用户权限和路由
        const fetchPermisionsAndMenus = async ()=>{
            // 获取用户权限
            const permissionData = await Api.account.accountPermissions();
            permissions.value = permissionData as unknown as string[];

            // // 获取菜单列表
            // const menuData = await Api.account.accountMenus();
            // // 生成动态路由菜单
            // const result = generateDynamicRoutes(menuData);
        }

        // 登出
        const logout = async () =>{
            await Api.account.accountLogout();
            clearLoginStatus();
        }

        return {
            token,
            permissions,
            menus,
            userInfo,
            login,
            afterLogin,
            logout,
            clearLoginStatus,
            fetchPermisionsAndMenus,
        }
    },
    {
        persist: {
            paths: ['token'],
        },
    },
);