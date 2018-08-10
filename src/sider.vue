<template>
    <transition name="slide">
        <div class="sider" v-if="visiable">
            <slot></slot>
            <button @click="visiable=false">close</button>
        </div>
    </transition>

</template>
<script>
    export default {
        name:'GuluSider',
        data(){
            return {
                visiable:true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sider{
        position:relative;
        >button{
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .slide-enter-active,.slide-leave-active{
        transition:all  .5s;
    }
    .slide-enter,.slide-leave-to{
         margin-left:-200px;
    }
</style>