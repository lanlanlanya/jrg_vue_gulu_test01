<template>

    <div class="toast" ref="wrapper">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default[0]">
        </div>
       </div>
        <div class="line" ref="line"></div>
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
                       text:'关闭',callback:undefined
                   }
               }
           },
           enableHtml:{
               type:Boolean,
               default:false
           }
       },
       created(){
       },
       mounted(){
           this.updateStyles();
           this.execAutoClose();
       },
       methods:{
           execAutoClose(){
               if (this.autoClose){
                   setTimeout(()=>{
                       this.close();
                   },this.autoCloseDelay*1000);
               }
           },
           updateStyles(){
               this.$nextTick(()=>{
                   this.$refs.line.style.height= `${this.$refs.wrapper.getBoundingClientRect().height}px`;
               });
           },
           close(){
               this.$el.remove();
               this.$destroy();
           },
           log(){
               console.log('测试');
           },
           onClickClose(){
               this.close();
               if(this.closeButton && typeof this.closeButton.callback==='function')
               this.closeButton.callback(this); //this就是toast实例
           }
       }
   }

</script>
<style lang="scss">
    $font-size:14px;
    $toast-min-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    .toast{
        font-size: $font-size;
        min-height: $toast-min-height;
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
        .message{
            padding:4px 0;
        }
        .close{
            padding-left:16px;
            flex-shrink:0;
        }
        .line{
            height:100%;
            border:1px solid #ccc;
        }
    }

</style>