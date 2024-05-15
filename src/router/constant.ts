// 路由常量

export const LOGIN_NAME = 'Login';

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

//路由白名单
export const whiteNameList = [LOGIN_NAME, 'icons', 'error', 'error-404'] as const;

//白名单列表类型
export type whiteNameList = typeof whiteNameList;

//白名单名称类型
export type WhiteName = (typeof whiteNameList)[number];