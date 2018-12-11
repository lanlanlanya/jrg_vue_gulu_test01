function core(method,url,options){
    var xhr=new XMLHttpRequest();
    xhr.open(method,url);
    xhr.onload=()=>{

       options.success && options.success(xhr.response);
    };
    xhr.onerror=()=>{
        // console.log('上传失败了!');
        options.fail && options.fail(xhr,xhr.status);
    };
    xhr.send(options.data);
}
export  default {
    get(){},
    post(url,options){
        return core('post',url ,options)
},
    put(){},
    delete(){},
    patch(){},
}