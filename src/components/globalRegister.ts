import {
    // Need
    Layout,
    Button,
    Select,
    Alert,
    Checkbox,
    DatePicker,
    Radio,
    Switch,
    Card,
    List,
    Tabs,
    Descriptions,
    Tree,
    Table,
    Divider,
    Modal,
    Drawer,
    Dropdown,
    Tag,
    Tooltip,
    Badge,
    Popover,
    Upload,
    Transfer,
    Steps,
    PageHeader,
    Result,
    Empty,
    Avatar,
    Menu,
    Breadcrumb,
    Form,
    Input,
    Row,
    Col,
    Spin,
  } from 'ant-design-vue';
import type { App } from 'vue';

export function registerGlobComp(app: App) {
app
    .use(Select)
    .use(Layout)
    .use(Alert)
    .use(Breadcrumb)
    .use(Checkbox)
    .use(DatePicker)
    .use(Radio)
    .use(Switch)
    .use(Card)
    .use(List)
    .use(Descriptions)
    .use(Tree)
    .use(Table)
    .use(Divider)
    .use(Modal)
    .use(Drawer)
    .use(Dropdown)
    .use(Tag)
    .use(Tooltip)
    .use(Badge)
    .use(Popover)
    .use(Upload)
    .use(Transfer)
    .use(Steps)
    .use(PageHeader)
    .use(Result)
    .use(Empty)
    .use(Avatar)
    .use(Menu)
    .use(Tabs)
    .use(Form)
    .use(Input)
    .use(Button)
    .use(Row)
    .use(Col)
    .use(Spin);
}