// icon.ts
import { createVNode, type VNode } from 'vue'
// 这里需要关联到路由表的图标 需要用的图标都需要在这里引入
import { DashboardOutlined, UserOutlined, LinkOutlined, DesktopOutlined } from '@ant-design/icons-vue'

// 将图标名称映射到对应的组件
const iconMap = {
    DashboardOutlined,
    UserOutlined,
    LinkOutlined,
    DesktopOutlined,
};

export const antIcon = (props: { icon: keyof typeof iconMap | undefined }): (VNode | undefined) => {
    const { icon } = props;
    if (icon && iconMap[icon]) {
        return createVNode(iconMap[icon]);
    }
    else return undefined;
};