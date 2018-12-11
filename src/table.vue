<template>
    <div class="gulu-table-wrapper"  ref="wrapper">
        <div :style="{height:height+'px',overflow:'auto'}" ref="tableWrapper">
            <table class="gulu-table" :class="{bordered,compact,striped:striped}" ref="table">
                <thead>
                <tr>
                    <th v-if="expendField" :style="{width:'50px'}" class="gulu-table-center"></th>
                    <th v-if="checkable" :style="{width:'50px'}" class="gulu-table-center">
                        <input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemsSelected">
                    </th>
                    <th v-if="numberVisible" :style="{width:'50px'}" class="gulu-table-center">#</th>
                    <th :style="{width:colum.width+'px'}" v-for="colum in colums" :key="colum.field">
                        <div class="gulu-table-header">
                            {{colum.text}}
                            <span class="gulu-table-sorter" v-if="colum.field in orderBy" @click="changeOrderBy(colum.field)">
                                 <g-icon name="asc" :class="{active: orderBy[colum.field]==='asc'}" ></g-icon>
                                 <g-icon name="desc" :class="{active: orderBy[colum.field]==='desc'}"></g-icon>
                             </span>
                        </div>
                    </th>
                    <th v-if="$scopedSlots.default" ref="actionsHead"></th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(item,index) in dataSource" >
                    <tr :key="item.id">
                        <td :style="{width:'50px'}" class="gulu-table-center"  v-if="expendField">
                            <g-icon name="right" class="gulu-table-expendIcon" @click="expendItem(item.id)"></g-icon>
                        </td>
                        <td v-if="checkable" :style="{width:'50px'}" class="gulu-table-center">
                            <input type="checkbox"  @change="onChangeItem(item,index,$event)"
                                   :checked="inSelectedItem(item)"
                            />
                        </td>
                        <td :style="{width:'50px'}" v-if="numberVisible" class="gulu-table-center"> {{index+1}} </td>
                        <template v-for="colum in colums" >
                            <td :style="{width:colum.width+'px'}" :key="colum.field">{{item[colum.field]}}</td>
                        </template>
                        <td v-if="$scopedSlots.default">
                            <div ref="actions" style="display: inline-block;">
                                <slot :item="item"></slot>
                            </div>

                        </td>
                    </tr>
                    <tr :key="`${item.id}-expend`" v-if="inExpendedIds(item.id)">
                        <td :colspan="colums.length + expendedCellColSpan">{{item[expendField] || '空'}}</td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
            <div class="gulu-table-loading" v-if="loading">
                <g-icon name="loading"></g-icon>
            </div>


    </div>
</template>

<script>
    import Icon from './icon.vue'
    export default {
        name: "GuluTable",
        components:{'g-icon':Icon},
        data(){
            return {
                expendedIds:[]
            }
        },
        props:{
            orderBy:{
                type:Object,
                default:()=>({})
            },
            height:{
                type:Number
            },
            loading:{
                type:Boolean,
                default:false
            },
            colums:{
                type:Array,
                required:true
            },
            selectedItems:{
                type:Array,
                default:()=>[]
            },
            expendField:{
                type:String
            },
            dataSource:{
                type:Array,
                required:true,
                validator(array){
                    return !(array.filter((item)=>item.id === undefined).length>0)
                }
            },
            numberVisible:{
                type:Boolean,
                default:false
            },
            bordered:{
                type:Boolean,
                default:false
            },
            compact:{
                type:Boolean,
                default:false
            },
            striped:{
                type:Boolean,
                default:true
            },
            checkable:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            selectedItems(){
               if(this.selectedItems.length=== this.dataSource.length){
                   this.$refs.allChecked.indeterminate=false;
               }else if( this.selectedItems.length=== 0){
                   this.$refs.allChecked.indeterminate=false;
               }else{
                   this.$refs.allChecked.indeterminate=true;
               }
            }
        },
        computed:{
            expendedCellColSpan(){
                let result=0;
                if(this.checkable){
                    result +1;
                }
                if(this.expendField){
                    result+1;
                }
                return result;
            },
            areAllItemsSelected(){
             const a=this.dataSource.map(item=>item.id).sort();
             const b=this.selectedItems.map(item=>item.id).sort();
                if (a.length !== b.length) {
                    return false;
                }
                let equal=true;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        equal = false;
                        break;
                    }
                }
                return equal;
            }
        },
        mounted(){
            let table2= this.$refs.table.cloneNode(false);
            table2.classList.add("gulu-table-copy");
            let tHead=this.$refs.table.children[0];
            let {height}=tHead.getBoundingClientRect();
            this.$refs.tableWrapper.style.marginTop=height+'px';
            this.$refs.tableWrapper.style.height=parseInt(this.height)-height +'px';
            table2.appendChild(tHead);
            this.$refs.wrapper.appendChild(table2);
            this.table2=table2;
          if(this.$scopedSlots.default){
              let div=this.$refs.actions[0];
             let {width}=div.getBoundingClientRect();
              let parent=div.parentNode;
              let styles=getComputedStyle(parent);
             let paddingLeft=styles.getPropertyValue('padding-left');
             let paddingRight=styles.getPropertyValue('padding-right');
             let borderLeft=styles.getPropertyValue('border-left-width');
             let borderRight=styles.getPropertyValue('border-right-width');
             let width2=width+parseInt(paddingLeft) +parseInt(paddingRight)+parseInt(borderLeft) +parseInt(borderRight)+'px';
             this.$refs.actionsHead.style.width=width2;

              this.$refs.actions.map((div)=>{
                  console.log( div.parentNode);
                  div.parentNode.style.width=width2
              });


          }
        },
        beforeDestroy(){
            this.table2.remove();
        },
        methods:{
            inExpendedIds(id){
                return this.expendedIds.indexOf(id)>=0
            },
            expendItem(id){
                let index=this.expendedIds.indexOf(id);
                if(index===-1){
                    this.expendedIds.push(id);
                }else{
                    this.expendedIds.splice(index,1);
                }

            },
            inSelectedItem(item){
                return this.selectedItems.filter((i)=>i.id===item.id).length>0
            },
            changeOrderBy(key){
               const copy=JSON.parse(JSON.stringify(this.orderBy));
               let oldValue=copy[key];
               if(oldValue === 'asc'){
                   copy[key]='desc';
               }else if(oldValue === 'desc'){
                   copy[key]=true;
               }else{
                   copy[key]='asc';
               }
               this.$emit('update:orderBy',copy);
            },
            onChangeItem(item,index,e){
               let selected=e.target.checked;
               let copy=JSON.parse(JSON.stringify(this.selectedItems));
               if(selected){
                   copy.push(item);
               }else{
                   copy=copy.filter(i=>i.id!==item.id);
               }
                this.$emit('update:selectedItems',copy);
            },
            onChangeAllItems(e){
                let selected=e.target.checked;
                this.$emit('update:selectedItems',selected ? this.dataSource:[]);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'var';
    $grey:darken($rey,15%);
    $grey-light:lighten($rey,65%);
    .gulu-table{
        width: 100%;
        border-collapse: collapse;
        border-spacing:0;
        &.bordered{
            border:1px solid  $grey;
            td,th{
                border:1px solid  $grey;
            }
        }
      border-bottom:1px solid $grey;
        &.compact{
            td,th{
                padding: 4px;
            }
        }
       td,th{
           border-bottom:1px solid $grey;
           text-align: left;
           padding:8px;
       }
        &.striped{
            tbody{
                >tr{
                    &:nth-child(odd){
                        background: $rey;
                    }
                    &:nth-child(even){
                        background: white;
                    }
                }
            }
        }
        &-sorter{
            margin:0 4px;
            display: inline-flex;
            flex-direction: column;
            svg{
                width:9px;
                height:9px;
                fill:$rey;
                cursor: pointer;
                &.active{
                    fill:red;
                }
                &:first-child{
                    position: relative;
                    bottom:-1px;
                }
                &:nth-child(2){
                    position: relative;
                    top:-1px;
                }
            }
        }
        &-header{
            display: flex;
            align-items: center;
        }
        &-wrapper{
            position: relative;
            overflow: auto;
        }
        &-loading{
            background: rgba(255,255,255,.8);
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            svg{
                width: 60px;
                height:60px;
                @include  spin;
            }
        }
        &-copy{
            position: absolute;
            background: white;
            width:100%;
            top:0;
            left:0;
        }
        &-expendIcon{
            width: 10px;
            height: 10px;
        }
        & &-center{
            text-align: center;
        }
    }
</style>