<template>
    <div id="app">
        <p>{{selected && selected[0] && selected[0].name || '空' }}</p>
        <p>{{selected && selected[1] && selected[1].name || '空' }}</p>
        <p>{{selected && selected[2] && selected[2].name || '空' }}</p>
        <div style="padding:20px;">
            <g-cascader :source.sync="source" popover-height="200px"
                        :selected.sync="selected" :load-data="loadData"></g-cascader>
            <!--<g-button>你好</g-button>-->
        </div>
        {{source}}
    </div>
</template>

<script>
    import Button from './button'
    import Cascader from './cascader'
    import db from './db'
    // function ajax2(parentId=0,success,fail){
    //     let id= setTimeout(()=>{
    //          let result= db.filter((item)=>item.parent_id===parentId);
    //          success(result);
    //      },3000);
    //     return id;
    // }
    function ajax(parentId=0){
        return new Promise((success,fail)=>{
            setTimeout(()=>{
                let result= db.filter((item)=>item.parent_id===parentId);
                success(result)
            },300);
        });
    }
    export default {
        name: "demo",
        data(){
            return {
                selected:[],
                source:[]
            }
        },
        created(){
            // ajax2(0,(result)=>{
            //     this.source=result;
            // });
            ajax(0).then((result)=>{
                this.source=result;
            });
        },
        components:{
            'g-button':Button,
            'g-cascader':Cascader
        },
        methods:{
            loadData(item,updateSource){
                let {name,id,parent_id}=item;
                ajax(id).then(result=>{
                    updateSource(result);
                })
            },
            xxx(){
                ajax(this.selected[0].id).then(result=>{
                    let lastLevelSelected=this.source.filter(item=>item.id===this.selected[0].id)[0];
                    // lastLevelSelected.children=result;
                    this.$set(lastLevelSelected,'children',result);
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>