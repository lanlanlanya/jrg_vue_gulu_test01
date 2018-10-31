<template>
    <div class="g-nav-item" :class="{selected,vertical}" @click="onClick" :data-name="name">
        <slot ></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject:['root','vertical'],
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                selected:false
            }
        },
        methods:{
            onClick(){
                this.root.namePath=[];
                this.$parent.updateNamePath && this.$parent.updateNamePath();
                this.$emit('update:selected',this.name);
            }
        },
        created(){
            this.root.addItem(this);
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    a{
        color: inherit;
        text-decoration: none;
    }
.g-nav-item{
    padding:10px 20px;
    position: relative;
    &:not(.vertical){
    &.selected{
        &::after {
            content:'';
            position:absolute;
            left:0;
            bottom:0;
            border-bottom:2px solid $blue;
            width:100%;
        }
    }
}
    &.vertical{
        &.selected{
           color:$blue;
        }
     }
}
    .g-sub-nav .g-nav-item:not(.vertical){
        &.selected{
            color:$color;
            background: $rey;
            &::after {
                display: none;
            }
        }
    }
</style>