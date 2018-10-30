<template>
    <div class="g-sub-nav" :class="{active}" v-click-outside="close">
        <span class="g-sub-nav-label" @click="onClick">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open}">
                <g-icon  name="right" class="g-sub-nav-scale">  </g-icon>
            </span>
        </span>
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import ClickOutside from '../click-outside'
    import Icon from '../icon'
    export default {
        name: "GuluSubNav",
        inject:['root'],
        directives:{ClickOutside},
        components:{
            'g-icon':Icon
        },
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                open:false
            }
        },
        computed:{
          active(){
              return this.root.namePath.indexOf(this.name)>=0 ?true:false;
          }
        },
        methods:{
            onClick(){
                this.open=!this.open;
            },
            updateNamePath(){
                this.root.namePath.unshift(this.name);
                if(this.$parent.updateNamePath){
                     this.$parent.updateNamePath();
                }else{
                    // this.root.namePath=[];
                }
            },
            close(){
                this.open=false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
.g-sub-nav{
    position: relative;
    padding:10px 20px;
    &.active{
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
    &-label{
        display: block;
        vertical-align: top;
    }
    &-icon{
        display: none;
    }
    &-popover{
        position: absolute;
        top:100%;
        left: 0;
        margin-top:4px;
        white-space:nowrap;
        background: white;
        box-shadow:0 0 3px  fade_out(black,0.7) ;
        border-radius: $border-radius;
        color:$light-color;
        font-size:$font-size;
        min-width:8em;
    }
}
    .g-sub-nav .g-sub-nav {
        &.active {
            &::after{
                display:none;
            }
        }
        display: flex;
        align-items: center;
        .g-sub-nav-popover{
            top:0;
            left:100%;
            margin-left: 4px;
        }
        .g-sub-nav-label{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .g-sub-nav-icon{
            .g-sub-nav-scale{
                transform: scale(0.6);
            }
            display:inline-flex;
            margin-left: 1em;
            svg：{fill:$light-color}
            transition: all  .2s;
            &.open {
                transform: rotate(180deg);
            }
        }
    }
    
</style>