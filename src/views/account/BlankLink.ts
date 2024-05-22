import { defineComponent, h } from "vue";


export default defineComponent({
    name: 'BlankLink',
    props: {
        url: {
            type: String,
            default: '',
        },
        text: String,
    },
    setup(props) {
        const getTartget = () => {return /^http(s)?:/.test(props.url) ? props.url : `https://www.npmjs.com/package/${props.url}`};
    return () => h('a', {href: getTartget(), target: '_blank'}, props.text);
    },
})