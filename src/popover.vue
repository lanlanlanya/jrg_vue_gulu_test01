<template>
   <div class="popover" @click.stop="xxx">
       <div class="content-wrapper" @click.stop v-if="visible">
           <slot name="content"></slot>
       </div>
       <slot></slot>
   </div>
</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
            return {
                visible:false
            }
        },
        methods:{
            xxx(){
               this.visible=!this.visible;
               console.log('切换visible');
               if(this.visible===true){
                   this.$nextTick(()=>{
                     let eventHandler=()=>{
                           this.visible=false;
                           document.removeEventListener('click',eventHandler);
                         console.log('document隐藏popover');
                       }
                       document.addEventListener('click',eventHandler);
                   });
               }else{
                   console.log('vm隐藏popover');
               }
            }
        }
    }
</script>

<style scoped lang="scss">
        .popover{
                display:inline-block;
                vertical-align: top;
                position:relative;
            .content-wrapper{
                position: absolute;
                bottom:100%;
                left:0;
                border:1px solid red;
                box-shadow: 0 0 3px rgba(0,0,0,0.5);
            }
        }

</style>