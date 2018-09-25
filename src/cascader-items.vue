<template>
    <div class="cascaderItem" :style="{height:height}">
        <div class="left">
            <div v-for="item in items" class="label" @click="onClickLabel(item)">
                {{item.name}}
                <icon v-if="item.children" name="right" class="icon"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <g-cascader-items :items="rightItems" :height="height"
              :selected="selected" :level="level+1" @update:selected="onUpadeSelected"></g-cascader-items>
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
        updated(){

        },
        computed:{
            rightItems(){
                if(this.selected && this.selected[this.level]){
                    let selected=this.items.filter(item=>item.name===this.selected[this.level].name);
                    if(selected && selected[0].children &&  selected[0].children.length>0){
                        return  selected[0].children;
                    };
                }
            }
        },
        mounted(){


        },
        methods:{
            onClickLabel(item){
                // this.$set(this.selected,this.level,item);
                let copy=JSON.parse(JSON.stringify(this.selected));
                copy[this.level]=item;
                copy.splice(this.level+1);
                this.$emit('update:selected',copy);
            },
            onUpadeSelected(newSelected){
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
            padding: .3em 1em;
            display:flex;
            align-items:center;
            .icon{
                margin-left:1em;
                transform:scale(0.7)
            }
        }
    }
</style>