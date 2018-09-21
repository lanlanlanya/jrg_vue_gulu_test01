<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible=!popoverVisible">
            {{result || "请选择" }}
        </div>
        <div class="popover-wrapper" v-if="popoverVisible">
            <cascader-items :items="source" class="popover" :height="popoverHeight"
                 :selected="selected" @update:selected="onUpdateSelected"></cascader-items>
        </div>
    </div>
</template>
<script>
    import CascaderItems from './cascader-items'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItems
        },
        props:{
            source:{
                type:Array
            },
            popoverHeight:{
                type:String
            },
            selected:{
                type:Array,
                default:()=>{
                    return [];
                }
            }
        },
        data(){
            return {
                popoverVisible:false
            }
        },
        methods:{
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            }
        },
        computed:{
            result(){
                return this.selected.map((item)=>item.name).join('/');
            }
        }
    }
</script>

<style scoped lang="scss">
   @import "var";
.cascader{
    position:relative;
    .trigger{
        min-width:10em;
        height:$input-height;
        display:inline-flex;
        align-items:center;
        color:$color;
        padding: 0 1em;
        border:1px solid $border-color;
        border-radius:$border-radius;
    }
    .popover-wrapper{
        position:absolute;
        top:100%;
        left:0;
        background-color:#fff;
        display:flex;
        @extend .box-shadow;
        margin-top:3px;
    }


}

</style>