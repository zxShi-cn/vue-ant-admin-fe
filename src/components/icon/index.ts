// icon.ts
import { createVNode, type Component, type VNode } from 'vue'
// 这里需要关联到路由表的图标 需要用的图标都需要在这里引入
import { DashboardOutlined, UserOutlined, LinkOutlined, DesktopOutlined } from '@ant-design/icons-vue'
export const antIcon = (props: { icon: string | undefined }): (VNode | undefined) => {
    const { icon } = props;
    if (icon) {
        const arr: Array<Component> = [DesktopOutlined, LinkOutlined, DashboardOutlined, UserOutlined]
        return createVNode(eval(icon));
    }
};