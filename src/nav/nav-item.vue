<template>
    <div class="g-nav-item" :class="{selected}" @click="onClick">
        <slot ></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject:['root'],
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
                this.$emit('add:selected',this.name);
            }
        },
        created(){
            this.root.addItem(this);
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
.g-nav-item{
    padding:10px 20px;
    &.selected{
        position: relative;
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
    .g-sub-nav .g-nav-item{
        &.selected{
            color:$color;
            background: $rey;
            &::after {
                display: none;
            }
        }

    }
</style>