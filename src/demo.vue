<template>
    <div id="app">
        <div style="padding:20px;">
            <g-cascader :source.sync="source"
                        popover-height="200px"
                        :load-data="loadData"
                        :selected.sync="selected"
            ></g-cascader>
        </div>
      <!--<g-popover>-->
          <!--<template>-->
              <!--<g-button>点我</g-button>-->
          <!--</template>-->
          <!--<template slot="content">-->
              <!--弹出内容-->
          <!--</template>-->
      <!--</g-popover>-->
    </div>
</template>

<script>
    import Button from './button'
    import Cascader from './cascader'
    import db from './db'
    import Popover from './popover'
    // import {removeListener} from './click-outside'
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
                console.log(result);
                this.source=result;
            });
        },
        // destroyed(){
        //     removeListener();
        // },
        components:{
            'g-button':Button,
            'g-cascader':Cascader,
            'g-popover':Popover
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