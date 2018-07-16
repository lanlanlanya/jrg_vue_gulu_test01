<template>
        <button class="g-button" :class="{[`icon-${iconPosition}`]:true}"  @click="$emit('click')">
           <!-- <svg v-if="icon" class="icon">
                <use :xlink:href="`#i-${icon}`"></use>
            </svg>-->
            <g-icon class="icon" v-if="icon && !loading" :name="icon"/>
            <g-icon name="loading" class="loading icon" v-if="loading"></g-icon>
            <div class="content">
                <slot></slot>
            </div>
        </button>
</template>
<script>
   export default {
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
<style lang="scss" >
    @keyframes spin{
        0% {
            transform:rotate(0deg);
        }
        100% {
            transform:rotate(360deg);
        }
    }
    .g-button{
        font-size:var(--font-size);
        height: var(--button-height);
        padding:0  .8em;
        border-radius:var(--border-radius);
        border:1px solid var(--border-color);
        background: var(--button-bg);
        /*让按钮上的图标和文字对齐,用inline-flex*/
        display: inline-flex; justify-content: center; align-items: center;
        /*让图标和外部图标对齐*/
        vertical-align: top;
        &:hover{
            border-color:var(--border-color-hover);
        }
       &:active{
            background-color:var(--button-active-bg);
        }
        &:focus{
            outline:none;
        }
        >.content{
            order:2;
        }
        >.icon{
            order:1;
            margin-right:.3em;
        }
        &.icon-right{
            >.icon{
                order:2;
                margin-left:.3em;
            }
            >.content{
                order:1;
            }
        }
        .loading{
            animation:spin 2s infinite linear;
        }
    }
</style>