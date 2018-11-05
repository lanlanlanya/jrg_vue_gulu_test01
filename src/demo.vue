<template>
    <div>
       <g-pager :total-page="20"  :current-page="3"></g-pager>
    </div>
</template>

<script>

    import Pager from './pager.vue'
    export default {
        name: "demo",
        components:{
            "g-pager":Pager
        },

        data(){
            return {

            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    *{
        margin:0;padding:0;box-sizing:border-box;
    }
</style>