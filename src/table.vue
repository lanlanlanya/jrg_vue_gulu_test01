<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table" :class="{bordered,compact,striped:striped}">
            <thead>
            <tr>
                <th>
                    <input type="checkbox">
                </th>
                <th v-if="numberVisible">#</th>
                <th v-for="colum in colums">
                    {{colum.text}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in dataSource">
                <td>
                    <input type="checkbox"  @change="onChangeItem(item,index,$event)">
                </td>
                <td v-if="numberVisible"> {{index+1}} </td>
                <template v-for="colum in colums">
                    <td>{{item[colum.field]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "GuluTable",
        props:{
            colums:{
                type:Array,
                required:true
            },
            dataSource:{
                type:Array,
                required:true
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
            }
        },
        methods:{
            onChangeItem(item,index,e){
                this.$emit('changeItem',{selected:e.target.checked,item,index})
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

    }
</style>