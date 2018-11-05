<template>
    <div class="gulu-pager" style="margin:20px;">
        <span class="gulu-pager-nav prev" :class="{disabled:currentPage===1}">
             <g-icon name="left"></g-icon>
        </span>
        <template v-for="page in pages">
            <template v-if="page===currentPage">
                <span class="gulu-pager-item current">{{page}}</span>
            </template>
            <template v-else-if="page==='...'">
                <g-icon name="dots" class="gulu-pager-item separator">?</g-icon>
            </template>
            <template v-else>
                <span class="gulu-pager-item other">{{page}}</span>
            </template>
        </template>
        <span class="gulu-pager-nav next" :class="{disabled:currentPage===totalPage}">
            <g-icon name="right"></g-icon>
        </span>

    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "GuluPager",
        components:{
            'g-icon':Icon
        },
        props:{
            totalPage:{
                type:Number,
                default:1,
                required:true
            },
            currentPage:{
                type:Number,
                required:true
            },
            hideIfOnePage:{
                type:Boolean,
                default:true
            }
        },
        data(){
            let pages=unique([1,
                        this.totalPage,this.currentPage,this.currentPage-1,
                        this.currentPage-2,this.currentPage+1,
                        this.currentPage+2]
                        .filter((n)=> n>=1&& n<=this.totalPage) )
                        .sort((a,b)=>a-b)
                        .reduce((prev,current,index,self)=>{
                            prev.push(current);
                            self[index] && self[index+1] && self[index+1]-self[index]>1 && prev.push('...');
                            return prev;
                        },[]);
                        return {
                            pages:pages
                        }
        }
    }
    function unique(array){
        // return [...new Set(array)]
        // array=[1 2,4,5,5,6]
        const object={};
        array.map((number)=>{
            object[number]=true;
        });
        return Object.keys(object).map((n)=>parseInt(n,10));
    }
</script>

<style>
    body{
        background: #fff;
    }
</style>
<style scoped lang="scss">
    @import "var";
    .gulu-pager{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        $width:20px;
        $height:20px;
        $font-size:12px;
        &-item{
            border:1px solid #e1e1e1;
            border-radius: $border-radius;
            padding: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size:  $font-size;
            min-width: $width;
            height: $height;
            margin:0 4px;
            cursor: pointer;

            &.current ,&:hover{
                border-color:$blue;
            }
            &.current{
                cursor:default;
            }
            &.separator{
                border:none;
                width:$width;
                font-size:  $font-size;
            }
        }
        &-nav{
            margin:0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: $rey;
            width: $width;
            height: $height;
            border-radius: $border-radius;
            font-size: $font-size;
            &.disabled {
                svg{
                    fill:darken($rey,30%);
                }
            }
        }
    }
</style>