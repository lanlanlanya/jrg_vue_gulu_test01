<template>
    <div class="tabs-pane" v-bind:class="classes" v-if="active">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:"GuluTabsPane",
        inject:['eventBus'],
        data(){
            return {
                active:false
            }
        },
        props:{
            name:{
                type:String|Number,
                required:true
            }
        },
        computed:{
            classes: function () {
                return {
                    active: this.active
                }
            }
        },
        created: function () {
            this.eventBus.$on('update:selected', (name) => {
                if (name != this.name) {
                    this.active = false;
                } else {
                    this.active = true;
                }
            });
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-pane{
        &.active{
            padding:1em;
        }
    }
</style>