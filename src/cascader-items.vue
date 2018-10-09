<template>
    <div class="cascaderItem" :style="{height:height}">
        <div class="left">
            <div v-for="item in items" class="label" @click="onClickLabel(item)">
                <span class="name">   {{item.name}} </span>
                <icon  name="right" class="icon" v-if="rightArrowVisible(item)"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <g-cascader-items :items="rightItems" :height="height" ref="right"
              :selected="selected" :level="level+1" @update:selected="onUpdateSelected"></g-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "GuluCascaderItem",
        components:{Icon},
        props:{
            items:{
                type:Array
            },
            height:{
                type:String
            },
            loadData:{
                type:Function
            },
            selected:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
            level:{
                type:Number,
                default:0
            }
        },
        computed:{
            rightItems(){
                if(this.selected[this.level]){
                        let selected=this.items.filter((item)=>item.name===this.selected[this.level].name);
                        if(selected && selected[0].children &&  selected[0].children.length>0){
                            return  selected[0].children;
                        }
                }
            }
        },
        methods:{
        rightArrowVisible(item){
            return this.loadData ? !item.isLeaf : item.children;
        },
         onClickLabel(item){
             let copy=JSON.parse(JSON.stringify(this.selected));
                copy[this.level]=item;
                copy.splice(this.level+1);
                this.$emit('update:selected',copy);
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'var';
    .cascaderItem{
        display:flex;
        align-items:flex-start;
        justify-content:flex-start;
        height:100px;
        .left{
            height:100%;
            padding: .3em 0;
            overflow:auto;
        }
        .right{
            height:100%;
            border-left:1px solid $border-color-light;
        }
        .label{
            white-space:nowrap;
            padding: .5em 1em;
            display:flex;
            align-items:center;
            cursor:pointer;
            &:hover{
                background-color:$rey;
            }
            >.name{
                margin-right:2em;
                user-select:none;
            }
            .icon{
                margin-left:auto;
                transform:scale(0.7)
            }
        }
    }
</style>