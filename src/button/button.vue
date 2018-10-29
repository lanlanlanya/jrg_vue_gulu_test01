<template>
        <button class="g-button" :class="{[`icon-${iconPosition}`]:true}"  @click="$emit('click')">
            <g-icon class="icon" v-if="icon&&!loading" :name="icon"></g-icon>
            <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
            <div class="g-button-content">
                <slot></slot>
            </div>
        </button>
</template>
<script>
   import Icon from '../icon'
   export default {
       name:"GuluButton",
        components:{
            'g-icon':Icon
        },
       // props:['icon','iconPosition']
       props:{
           icon:{},
           loading:{
               type:Boolean,
               default:false
           },
           iconPosition:{
               type:String,
               default:'left',
               //属性的检查器 validator
               validator(value){
                   return !(value !== 'left' && value !== 'right');
                   // return value === 'left' || value !=== 'right';
               }
           }
       }
   };
</script>
<style>

</style>
<style lang="scss" scoped>
   @import "../var";
    .g-button{
        font-size:$font-size;
        height: $button-height;
        padding:0  .8em;
        border-radius:$border-radius;
        border:1px solid  $border-color;
        background: $button-bg;
        /*让按钮上的图标和文字对齐,用inline-flex*/
        display: inline-flex; justify-content: center; align-items: center;
        /*让图标和外部图标对齐*/
        vertical-align: middle;
        &:hover{
            border-color:$border-color-hover;
        }
       &:active{
            background-color:$button-active-bg;
        }
        &:focus{
            outline:none;
        }
        >.g-button-content{
            order:2;
        }
        >.icon{
            order:1;
            margin-right:.3em;
        }
        &.icon-right{
            >.g-button-content{
                order:1;
            }
            >.icon{
                order:2;
                margin-left:.3em;
            }

        }
        .loading{
            animation:spin 2s infinite linear;
        }
    }
</style>