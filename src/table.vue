<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table" :class="{bordered,compact,striped:striped}">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemsSelected">
                </th>
                <th v-if="numberVisible">#</th>
                <th v-for="colum in colums" :key="colum.field">
                    <div class="gulu-table-header">
                        {{colum.text}}
                        <span class="gulu-table-sorter" v-if="colum.field in orderBy" @click="changeOrderBy(colum.field)">
                             <g-icon name="asc" :class="{active: orderBy[colum.field]==='asc'}" ></g-icon>
                             <g-icon name="desc" :class="{active: orderBy[colum.field]==='desc'}"></g-icon>
                         </span>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in dataSource" :key="item.id">
                <td>
                    <input type="checkbox"  @change="onChangeItem(item,index,$event)"
                           :checked="inSelectedItem(item)"
                    />
                </td>
                <td v-if="numberVisible"> {{index+1}} </td>
                <template v-for="colum in colums" >
                    <td :key="colum.field">{{item[colum.field]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
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
        props:{
            orderBy:{
                type:Object,
                default:()=>({})
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

            dataSource:{
                type:Array,
                required:true,
                validator(array){
                    return !(array.filter((item)=>item.id === undefined).length>0)
                }
            },
            numberVisible:{
                type:Boolean,
                default:true
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
        methods:{
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

    }
</style>