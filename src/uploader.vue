<template>
    <div class="gulu-uploader">
        {{fileList}}
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <ol class="gulu-uploader-fileList">
            <li v-for="file in fileList" v-bind:key="file.name">
                <template v-if="file.status==='uploading'">
                    <g-icon name="loading" class="gulu-uploader-spin"></g-icon>
                </template>
                <template v-else-if="file.type.indexOf('image')===0">
                    <img class="gulu-uploader-image" :src="file.url" style="width: 32px;height: 32px;" alt="">
                </template>
                <template v-else>
                    <div class="gulu-uploader-defaultImage"></div>
                </template>
                <span class="gulu-uploader-name" :class="{[file.status]:file.status}">{{file.name}}</span>
                <g-icon class="gulu-uploader-remove" @click="onRemoveFile(file)" name="delete"></g-icon>
            </li>
        </ol>
        <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
    </div>
</template>
<script>
    import Icon from './icon'
    import http from './http'
    export default {
        name:'GuluUploader',
        components:{
            'g-icon':Icon
        },
        props:{
            name:{
                type:String,
                required:true
            },
            action:{
                type:String,
                required:true
            },
            method:{
                type:String,
                default:'POST'
            },
            parseResponse:{
                type:Function,
                required:true
            },
            fileList:{
                type:Array,
                default:()=>[]
            },
            sizeLimit:{
                type:Number,
                required:false
            }
        },
        data(){
            return {
                url:'about:blank'
            }
        },
        methods:{
            onClickUpload(){
                //create input
                let input=this.createInput();
                //listen to input
                input.addEventListener('change',()=>{
                    //upload file,单文件上传
                    // this.uploadFile(input.files[0]);
                    //多文件上传
                    this.uploadFiles(input.files);
                    input.remove();
                });
                //trigger click
                input.click();
            },
            createInput(){
                this.$refs.temp.innerHTML='';
                let input =document.createElement('input');
                input.type="file";
                input.multiple="multiple";
                this.$refs.temp.appendChild(input);
                return input;
            },

            uploadFiles(rawFiles){
                let newNames=[];
                for (let i=0;i<rawFiles.length;i++) {
                    let rawFile = rawFiles[i];
                    let {name,size,type} = rawFile;
                    //生成新的name
                    let newName = this.generateName(name);
                    newNames[i] = newName;
                }
                    if(!this.beforeUploadFiles(rawFiles,newNames)){return}
                for (let i=0;i<rawFiles.length;i++) {
                    let rawFile = rawFiles[i];
                    let newName=newNames[i];
                    let formData=new FormData();
                    formData.append(this.name,rawFile);
                    this.doUploadFile(formData,(response)=>{
                        let url=this.parseResponse(response);
                        this.url=url;
                        this.afterUploadFile(newName,url);
                    },(xhr)=>{
                        this.uploadError(xhr,newName);
                    });
                }
            },
            doUploadFile(formData,success,fail){
                http[this.method.toLowerCase()](this.action,{success,fail,data:formData})
               },
            beforeUploadFiles(rawFiles,newNames){
                rawFiles = Array.from(rawFiles);
                for (let i=0;i<rawFiles.length;i++){
                    let {size,type}=rawFiles[i];
                    if(size>this.sizeLimit){
                        this.$emit('error','文件太大，请重新选择！');
                        return false;
                    }
                }
                let x=rawFiles.map((rawFile,i)=>{
                    let {type,size}=rawFile;
                    return {name:newNames[i],type,size,status:"uploading"}
                });

                   this.$emit('update:fileList',[...this.fileList,...x]);
                   return true;

            },
            afterUploadFile(newName,url){
                let file=this.fileList.filter(f=>f.name===newName)[0];
                let index=this.fileList.indexOf(file);
                let fileCopy=JSON.parse(JSON.stringify(file));
                fileCopy.url=url;
                fileCopy.status="success";
                let fileListCopy=[...this.fileList];
                fileListCopy.splice(index,1,fileCopy);
                this.$emit('update:fileList',fileListCopy);
            },

            uploadError(xhr,newName){
                let file=this.fileList.filter(f=>f.name===newName)[0];
                let index=this.fileList.indexOf(file);
                let fileCopy=JSON.parse(JSON.stringify(file));
                fileCopy.status='fail';
                let fileListCopy=[...this.fileList];
                fileListCopy.splice(index,1,fileCopy);
                this.$emit('update:fileList',fileListCopy);
                let error='';
                if(xhr.status===0){
                    error="网络无法连接，请稍后重试！"
                }
                this.$emit('error',error);
            },
            generateName(name){
                while(this.fileList.filter(f=>f.name===name).length>0){
                    let dotIndex= name.lastIndexOf('.');
                    let nameWithoutExtension=name.substring(0,dotIndex);
                    let extension=name.substring(dotIndex);
                    name=(nameWithoutExtension+'(1)'+extension);
                }
                return name;
            },
            onRemoveFile(file){
                let answer=window.confirm('你确定要删除该文件吗？');
                if(answer){
                    let copy=[...this.fileList];
                    let index=copy.indexOf(file);
                    copy.splice(index,1);
                    this.$emit('update:fileList',copy);
                }


            }
        }
    }
</script>
<style  scoped lang="scss">
    @import "var";
    *{
        margin: 0;
        padding: 0;
    }
.gulu-uploader{
    &-fileList{
        list-style: none;
    > li {
        display: flex;
        align-items: center;
        margin: 8px 0;
        padding: 2px 5px;
        border: 1px solid darken($rey,15%);
        > svg{
            /*fill:red;*/
        }
        }
    }
    &-defaultImage{
        border:1px solid red;
        width:32px;
        height: 32px;
        margin-right: 8px;
    }
    &-image{
        margin-right: 8px;
    }
    &-name{
        margin-left: 3px;
        margin-right: auto;
        &.success{
            color: green;
        }
        &.fail{
            color: red;
        }
    }
    &-spin{
        width:  24px;
        height: 24px;
        @include spin;
    }
}

</style>