<template>
    <div id="app">
        <div style="padding:20px;">
            <g-cascader :source="source" popover-height="200px"
                        :selected.sync="selected"></g-cascader>
            <g-button>你好</g-button>
        </div>
    </div>
</template>

<script>
    import Button from './button'
    import Cascader from './cascader'
    import db from './db'
    function ajax(parentId=0){
            return db.filter((item)=>item.parent_id===parentId);
    }

    console.log(ajax());
    export default {
        name: "demo",
        data(){
            return {
                selected:[],
                source:ajax()
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