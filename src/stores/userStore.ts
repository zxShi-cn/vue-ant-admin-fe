import Api from "@/api";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter, type Router, type RouteRecordRaw } from "vue-router";
import { resetRouter } from "@/router";
import { usePermissionStore } from "./permissionStore";


export const useUserStore = defineStore(
    'user',
    () => {
        // 定义数据
        const token = ref<string>();
        const userInfo = ref<Partial<API.UserEntity>>({});
        const permissions = ref<string[]>([]);
        const menus = ref<RouteRecordRaw[]>([]);

        // 定义方法

        // 清空登录状态
        const clearLoginStatus = ()=>{
            token.value = '';
            userInfo.value = {};
            permissions.value = [];
            menus.value = [];
            resetRouter();
            setTimeout(() => {
                localStorage.clear();
            });
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
                userInfo.value = userInfoData.data;
            } catch (error) {
                return Promise.reject(error);
            }
        }

        // 获取用户权限和路由
        const fetchPermisionsAndMenus = async ()=>{
            const router = useRouter();
            const permissionStore = usePermissionStore();
            // 获取用户权限
            const permissionData = await Api.account.accountPermissions();
            permissions.value = permissionData.data;
            // console.log(permissions.value);
            // 获取菜单列表
            // const menuData = await Api.account.accountMenus();
            // 生成动态路由菜单
            const routes = await permissionStore.buildRoutes();
            // 添加路由
            routes.forEach((route) => {
                router.addRoute(route);
            })
        }

        const reloadRoutes = async (router: Router) => {
            const permissionStore = usePermissionStore();
            // 添加路由
            const routes= await permissionStore.buildRoutes();
            routes.forEach((route) => {
                router.addRoute(route);
            })
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
            reloadRoutes,
        }
    },
    {
        persist: {
            // paths: ['token'],
        },
    },
);