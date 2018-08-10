<template>

    <div class="toast">
        <slot></slot>
        <div class="line"></div>
        <span class="close" i-if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
    </div>
</template>
<script>
// 构造组件的选项
   export  default {
       name:'GuluToast',
       props:{
           autoClose:{
               type:Boolean,
               default:true
           },
           autoCloseDelay:{
               type:Number,
               default:50
           },
           closeButton:{
               type:Object,
               default(){
                   return {
                       text:'关闭',callback:(toast)=>{
                           toast.close();
                       }
                   }
               }
           }
       },
       created(){
           console.log(this.closeButton);
       },
       mounted(){
           if (this.autoClose){
               setTimeout(()=>{
                   this.close();
                   },this.autoCloseDelay*1000);
           }
       },
       methods:{
           close(){
               this.$el.remove();
               this.$destroy();
           },
           onClickClose(){
               this.close();
               this.closeButton.callback();
           }
       }
   }

</script>
<style lang="scss">
    $font-size:14px;
    $toast-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    .toast{
        font-size: $font-size;
        height: $toast-height;
        line-height: 1.8;
        color: #fff;
        position: fixed;
        top:0;
        left:50%;
        transform:translateX(-50%);
        display: flex;
        align-items: center;
        background: $toast-bg;
        border-radius:4px;
        box-shadow:0 0 3px 0 rgba(0,0,0,0.50);
        padding:0 16px;
    }
    .close{
        padding-left:16px;
    }
    .line{
        height:100%;
        border:1px solid #222;
    }
</style>