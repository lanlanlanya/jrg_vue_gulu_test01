<template>
    <div class="col" :class="colClass"  :style="colStyle">
            <slot></slot>
    </div>
</template>
<script>
    export default{
        name:'GuluCol',
        data(){
            return{
                 gutter:0
            }
        },
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[String,Number]
            }
        },
        computed:{
            colClass(){
                let {span ,offset}=this;
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`
                ]
            },
            colStyle () {
                return{
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }

        }
    }
</script>
<style scoped lang="scss">
    .col{
        height: 80px;
        /*background: grey;*/
        /*width:50%;*/
        /*border:1px solid red;*/
        /*padding:0 10px;*/
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
            width: ($n / 24)* 100%;
           }
        }
        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: ($n / 24)* 100%;
            }
        }
    }
</style>