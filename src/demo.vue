<template>
    <div id="app">
        <g-slides width="300px;" height="200px;" :selected.sync="selected">
            <g-slides-item name="1">
                <div class="box">1</div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box">2</div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box">3</div>
            </g-slides-item>
        </g-slides>
    </div>
</template>

<script>

    import Slides from './slides'
    import SlidesItem from './slides-item'
    export default {
        name: "demo",
        components:{
            "g-slides":Slides,
            "g-slides-item":SlidesItem,
        },
        data(){
            return {
                selected:'3'
            }
        },
        created(){

        },

        methods:{

        }
    }
</script>

<style scoped lang="scss">
    *{
        margin:0;padding:0;box-sizing:border-box;
    }
    .wrapper{
        margin:40px;
    }
.box{
    width:100%;
    height:350px;
    background-color:#ddd;
    border:1px solid red;
}
</style>