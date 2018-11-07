<template>
    <div>
        <p>有边框，有隔行变色</p>
        <div style="margin:20px;">
            <g-table :colums="colums" :order-by.sync="orderBy" :data-source="dataSource"
                     bordered striped  :selected-items.sync="selected" @update:orderBy="x"
                      :loading="loading"
            ></g-table>
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
                orderBy:{
                    // true-开启排序，但是不确定asc还是desc
                    score:'desc'
                },
                loading:false,
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
            x(){
               // 排序逻辑由后台实现，以下为前台排序示例代码
                this.loading=true;
                setTimeout(()=>{
                    this.dataSource=this.dataSource.sort((a,b)=>a.score-b.score);
                    this.loading=false;
                },3000)

            }
        }
    }
</script>

<style scoped lang="scss">
    *{
        margin:0;padding:0;box-sizing:border-box;
    }
</style>