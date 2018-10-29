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

    import Slides from './slider/slides'
    import SlidesItem from './slider/slides-item'
    export default {
        name: "demo",
        components:{
            "g-slides":Slides,
            "g-slides-item":SlidesItem,
        },
        data(){
            return {
                selected:undefined
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
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 30px;
}
</style>