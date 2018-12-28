class Validator{
    static add(name,fn){
        Validator.prototype[name]=fn;
    }
    constructor(){}
    validate(data,rules){
        let errors = {};
        rules.forEach((rule) => {
            let value = data[rule.key];
            if (rule.required) {
                let error = this.required(value);
                if (error) {
                    ensureObject(errors, rule.key);
                    errors[rule.key].required = error;
                    return;
                }
            }
            //遍历 validators ,并逐一调用对应的函数
            let validators = Object.keys(rule).filter((key) => key !== 'key' && key !== 'required');
            validators.forEach((validatorkey) => {
                //    key is minLength/ maxLength/hasNumber /pattern
                if (this[validatorkey]) {
                    let error = this[validatorkey](value, rule[validatorkey]);
                    if (error) {
                        ensureObject(errors, rule.key);
                        errors[rule.key][validatorkey] = error;
                    }
                } else {
                    throw `不存在的校验器: ${validatorkey}`;
                }

            });
        });
        return errors;
    }
    required (value){
        if( value!==0  && !value ){
            return "必填";
        }
    }
   pattern(value,pattern){
        if(pattern='email'){
            pattern=/^.+@.+$/;
        }
        if( pattern.test(value)===false){
            return '格式不正确';
        }
    }
    minLength(value,minLength){
        if(value.length < minLength){
            return '太短';
        }
    }
   maxLength(value,maxLength){
        if(value.length > maxLength){
            return '太长';
        }
    }
}

function ensureObject(obj,key){
    if(typeof obj[key]!== 'object'){
        obj[key]={};
    }
}
export  default Validator