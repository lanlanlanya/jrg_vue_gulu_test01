<template>
        <button class="g-button" :class="{[`icon-${iconPosition}`]:true}">
           <!-- <svg v-if="icon" class="icon">
                <use :xlink:href="`#i-${icon}`"></use>
            </svg>-->
            <g-icon class="icon" v-if="icon" :name="icon"/>
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
    .g-button{
        font-size:var(--font-size);
        height: var(--button-height);
        padding:0  .8em;
        border-radius:var(--border-radius);
        border:1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex;
        vertical-align: top;
        justify-content: center;
        align-items: center;
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
    }
</style>