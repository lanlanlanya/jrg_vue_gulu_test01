import Toast from './toast'
let currrentToast;
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(message,toastOptions){
            if(currrentToast){
                currrentToast.close();
            }
            currrentToast=createToast({
                Vue,
                message,
                propsData:toastOptions,
                onClose:()=>{
                    currrentToast==null;
                }
            });
        }
    }
}




























/*helpers*/
function createToast({Vue,message,propsData,onClose}){
    let Constructor=Vue.extend(Toast);
    let toast=new Constructor({ propsData });
    toast.$slots.default=[message];
    toast.$mount();
    toast.$on('close',onClose)
    document.body.appendChild(toast.$el);
    return toast;
}