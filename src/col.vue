<template>
    <div class="col" :class="colClass"  :style="colStyle">
            <slot></slot>
    </div>
</template>
<script>
    let validator=(value)=>{
        let keys=Object.keys(value);
        let valid=true;
        keys.forEach(key=>{
            if(!['span','offset'].includes(key)){
                valid=false;
            }
        });
        return valid;
    };
    export default{
        name:'GuluCol',
        data(){
            return{
                 gutter:0
            }
        },
        methods:{
            createClasses(obj,string=''){
                if(!obj){return []};
                let array=[];
                if (obj.span) {
                    array.push(`col-${string}${obj.span}`);
                }
                if(obj.offset) {
                    array.push(`col-${string}${obj.offset}`);
                }
                return array;
            }
        },
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[String,Number]
            },
            ipad:{ type:Object, validator, },
            narrowPc:{ type:Object, validator,},
            pc:{ type:Object, validator, },
            widePc:{type:Object,  validator, }
        },
        computed:{
            colClass(){
                let {span ,offset,ipad,narrowPc,pc,widePc}=this;
                let createClasses=this.createClasses;
                return [
                    ... createClasses({span,offset}),
                    ...createClasses(ipad,'ipad-'),
                    ...createClasses(narrowPc,'narrow-pc-'),
                    ...createClasses(pc,'pc-'),
                    ...createClasses(widePc,'wide-pc-')
                ];
            },
            colStyle () {
                return{
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }

        }
    }
</script>
<style scoped lang="scss">
    .col{
        height: 80px;
        /*background: grey;*/
        /*width:50%;*/
        /*border:1px solid red;*/
        /*padding:0 10px;*/
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
            width: ($n / 24)* 100%;
           }
        }
        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: ($n / 24)* 100%;
            }
        }
        @media (min-width: 577px){
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)* 100%;
                }
            }
            $class-prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)* 100%;
                }
            }
        }
        @media (min-width: 769px){
            $class-prefix: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)* 100%;
                }
            }
            $class-prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)* 100%;
                }
            }
        }
        @media (min-width: 993px){
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)* 100%;
                }
            }
            $class-prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)* 100%;
                }
            }
        }
        @media (min-width: 1201px){
            $class-prefix: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24)* 100%;
                }
            }
            $class-prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24)* 100%;
                }
            }
        }
    }

</style>