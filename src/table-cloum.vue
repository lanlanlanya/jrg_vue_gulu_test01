<template>

</template>

<script>
    export default {
        name: "table-cloum",
        props:{
            text:{
                type:String,
                required:true
            },
            field:{
                type:String,
                required:true
            },
            width:{
                type:Number,
                required:false
            }
        }
    }
</script>

<style scoped lang="scss">

</style>