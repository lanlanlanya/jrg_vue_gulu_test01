<template>
    <div id="app">
        <!--<p>{{selected && selected[0] && selected[0].name || '空' }}</p>-->
        <!--<p>{{selected && selected[1] && selected[1].name || '空' }}</p>-->
        <!--<p>{{selected && selected[2] && selected[2].name || '空' }}</p>-->
        <div style="padding:20px;">
            <g-cascader :source.sync="source"
                        popover-height="200px"
                        :load-data="loadData"
                        :selected.sync="selected"
            ></g-cascader>
            <!--<g-button>你好</g-button>-->
        </div>
        <br><br><br><br>
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
        return new Promise((success)=>{
            setTimeout(()=>{
                let result= db.filter((item)=>item.parent_id===parentId);
                result.forEach(node=>{
                    if(db.filter(item=>item.parent_id===node.id).length>0){
                   node.isLeaf=false;
                }else{
                   node.isLeaf=true;
                }
               });

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
            loadData({id},updateSource){
                ajax(id).then(result=>{
                    updateSource(result);
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>