import service from "@/utils/request";

// 获取用户信息
export async function accountProfile() {
    return service.get('/account/profile');
}

// 获取用户权限
export async function accountPermissions() {
    return service.get('/account/permissions');
}

// 获取菜单列表
export async function accountMenus() {
    return service.get('/account/menus');
}

// 用户登出
export async function accountLogout() {
    return service.post('/account/logout');
}
