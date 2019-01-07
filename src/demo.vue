<template>
    <div style="display: flex;justify-content: center;">
        <div style="width: 100px;border: 1px solid black;">
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <g-sticky :distance="100">
                <div style="border:1px solid red;">
                    <img src="../images/a.png" alt="">
                </div>
            </g-sticky>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
            <p>段落1</p>
            <p>段落2</p>
            <p>段落3</p>
            <p>段落4</p>
            <p>段落5</p>
            <p>段落6</p>
            <p>段落7</p>
            <p>段落8</p>
            <p>段落9</p>
        </div>


    </div>
</template>

<script>
    import GuluSticky from './sticky'

    export default {
        name: "demo",
        components:{
            'g-sticky':GuluSticky
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
    img{
        max-width: 100%;
    }

</style>