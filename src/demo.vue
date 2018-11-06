<template>
    <div>
        <p>有边框，有隔行变色</p>
        <p>{{selected}}</p>
        <div style="margin:20px;">
            <g-table :colums="colums" :data-source="dataSource" bordered striped @changeItem="x"></g-table>
        </div>
        <p>有边框，无隔行变色</p>
        <div style="margin:20px;">
            <g-table :colums="colums" :data-source="dataSource" bordered compact :striped="false"></g-table>
        </div>
        <p>有边框，紧凑型，有隔行变色</p>
        <div style="margin:20px;">
            <g-table :colums="colums" :data-source="dataSource" bordered compact striped></g-table>
        </div>

        <div style="margin:20px;">
           <g-pager :total-page="10"  :current-page.sync="currentPage"></g-pager>
        </div>
    </div>
</template>

<script>

    import Pager from './pager.vue'
    import  Table from './table.vue'
    export default {
        name: "demo",
        components:{
            "g-pager":Pager,
            'g-table':Table
        },

        data(){
            return {
                selected:[],
                currentPage:1,
                colums:[
                    {text:'姓名',field:'name'},
                    {text:'分数',field:'score'},
                ],
                dataSource:[
                    {id:1,name:"张三丰",score:100},
                    {id:2,name:"张翠山",score:90},
                    {id:3,name:"张无忌",score:67},
                    {id:4,name:"西门吹雪",score:86},
                    {id:5,name:"杨过",score:100},
                    {id:6,name:"杨康",score:90},
                    {id:7,name:"令狐冲",score:67},
                    {id:8,name:"东方不败",score:86}
                ]
            }
        },
        methods:{
            x(object){
                let {selected,item,index}=object;
                if(selected){
                    this.selected.push(item);
                }else{
                    let index=this.selected.indexOf(item);
                    this.selected.splice(index,1);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    *{
        margin:0;padding:0;box-sizing:border-box;
    }
</style>