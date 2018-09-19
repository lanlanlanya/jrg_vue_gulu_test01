<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible=!popoverVisible">
        </div>
        <div class="popover" v-if="popoverVisible">
            <div class="level1">
                <div v-for="sourceItem in source" style="border:1px solid red;margin:5px;" class="label"
                @click="level1Selected=sourceItem">
                    {{sourceItem.name}}
                </div>
            </div>
            <div class="level2">
                <div v-for="item2 in level2Items"  class="label" @click="level2Selected=item2">
                    {{item2.name}}
                </div>
            </div>
            <div class="level3" >
                <div v-for="item3 in level3Items"  class="label">
                    {{item3.name}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return {
                popoverVisible:false,
                level1Selected:null,
                level2Selected:null
            }
        },
        computed:{
          level2Items(){
              if (this.level1Selected) {
                  return this.level1Selected.children;
              }else{
                  return [];
              }

            },
            level3Items(){
              if(this.level2Selected){
                  return this.level2Selected.children;
              }else{
                  return [];
              }
              }
            }


    }
</script>

<style scoped lang="scss">
   @import "var";
.cascader{
    .trigger{
        border:1px solid red;
        height:32px;
        width:100px;
    }
    .popover{
        border:1px solid red;
        display:flex;
        .label{
            white-space:nowrap;
        }
    }


}

</style>