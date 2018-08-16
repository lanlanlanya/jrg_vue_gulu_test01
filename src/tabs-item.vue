<template>
    <div class="tabs-item" @click="xxx" v-bind:class="classes">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:"GuluTabsItem",
        inject:['eventBus'],
        data(){
            return {
                active:false
            }
        },
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            name:{
                type:String|Number,
                required:true
            }
        },
        computed:{
            classes(){
                return {
                    active:this.active
                }
            }
        },
        created: function () {
            this.eventBus.$on('update:selected', (name) => {
                if (name == this.name) {
                    this.active = true;
                } else {
                    this.active = false;
                }
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name,this);
            }
        }
    }
</script>
<style lang="scss" scoped>
    $blue:blue;
    .tabs-item{
        flex-shrink: 0;
        height: 100%;
        padding:0 2em;
        cursor: pointer;
        display:flex;
        align-items: center;
        &.active{
            color:$blue;
            font-weight: bold;
        }
    }
</style>