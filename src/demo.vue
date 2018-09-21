<template>
    <div id="app">
        <div>{{selected && selected[0]&&selected[0].name || '空'}}</div>
        <div>{{selected && selected[1]&&selected[1].name || '空'}}</div>
        <div>{{selected && selected[2]&&selected[2].name || '空'}}</div>
        <g-cascader :source="source" popover-height="200px"
             :selected="selected" @update:selected="selected=$event"></g-cascader>
        <p>222222222222</p>
        <g-button>你好</g-button>
    </div>
</template>

<script>
    import Button from './button'
    import Cascader from './cascader'
    export default {
        name: "demo",
        data(){
            return {
                selected:[],
                source:[
                    {name:'浙江',
                        children:[
                            {name: "杭州", children: [{ name: "上城区"},{name: "下城区"}, {name: "江干区"}]},
                            {name: "嘉兴", children: [{ name: "南湖区"},{name: "秀洲区"}, {name: "嘉善区"}]}
                        ]
                    },
                    {name:'福建',
                        children:[
                            {name: "福州", children: [{ name: "鼓楼区"},{name: "台江区"}, {name: "仓山区"}]}
                        ]
                    },
                    {name:'河北',
                        children:[
                            {name: "石家庄", children: [{ name: "桥东区"},{name: "桥西区"}, {name: "开发区"}]},
                            {name: "邯郸市", children: [{ name: "磁县"},{name: "涉县"}, {name: "大名"}]}
                        ]
                    }
                ]
            }
        },
        components:{
            'g-button':Button,
            'g-cascader':Cascader
        }
    }
</script>

<style scoped lang="scss">

</style>