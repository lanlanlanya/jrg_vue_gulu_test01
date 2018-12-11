<template>
    <div style="margin: 20px;">
        {{error}}
        <br>
        {{fileList}}
        <div>只能上传 300 kb 以内的 png 、jpg 文件</div>
       <g-uploader accept="image/*" method="POST" action="http://127.0.0.1:3000/upload" name="file"
                   @upload:filefList="y"
                   :parseResponse="parseResponse" :file-list.sync="fileList" @error="error=$event" :size-limit="1024*1024">
                    <g-button icon="upload">上传</g-button>
       </g-uploader>
    </div>
</template>

<script>
    import Button from './button/button'
    import GuluUploader from './uploader'
    export default {
        name: "demo",
        components:{
            'g-button':Button,
            'g-uploader':GuluUploader
        },

        data(){
            return {
                fileList:[],
                error:''
            }
        },
        methods:{
            parseResponse(response){
                let object=JSON.parse(response);
                let url=`http://127.0.0.1:3000/preview/${object.id}`;
                return url;
            },
            alert(error){
                window.alert(error||'上传失败！')
            },
            y(newFileList){
                this.fileList=newFileList;
            }

        }
    }
</script>

<style scoped lang="scss">
    *{
        margin:0;padding:0;box-sizing:border-box;
    }

</style>