import    chai ,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import Validator from '../../src/validate';

describe('Validate', () => {
    it('存在.', () => {
        expect(Validator).to.exist;
    });
    it('required true 报错',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',required:true}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email.required).to.eq('必填');
    });
    it('required true 通过',()=>{
        let data={
            email:'0'
        };
        let rules=[
            {key:'email',required:true}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email).to.not.exist;
    });
    it('pattern 报错',()=>{
        let data={
            email:'@163.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email.pattern).to.eq('格式不正确');
    });
    it('pattern 通过',()=>{
        let data={
            email:'aa@163.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email).to.not.exist;
    });
   it('pattern 为  email 报错',()=>{
        let data={
            email:'@163.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
       let validator=new  Validator();
       let errors=validator.validate(data,rules);
        expect(errors.email.pattern).to.eq('格式不正确')
    });
    it('pattern 为  email 通过',()=>{
        let data={
            email:'SS@163.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email).to.not.exist;
       });
    it('required && pattern',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',pattern:'email',required:true}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email.required).to.exist
        expect (errors.email.pattern).to.not.exist
    });
    it('pattern && minLength',()=>{
        let data={
            email:'@sd'
        };
        let rules=[
            {key:'email',pattern:'email',minLength:6}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email.minLength).to.eq('太短');
        expect(errors.email.pattern).to.eq('格式不正确');
    });
    it('maxLength 报错',()=>{
        let data={
            email:'wewewewewewewew@ererersd'
        };
        let rules=[
            {key:'email',maxLength:10}
        ];
        let validator=new  Validator();
        let errors=validator.validate(data,rules);
        expect(errors.email.maxLength).to.eq('太长');

    });
   it('many keys',()=>{
        let data={email:'erwrersd32343'};
        let rules=[{
            key:'email',
            required:true,
            minLength:5,
            maxLength:10,
            hanNumber:true,
            hasLowerCaseAndUpperCase:true,
            hasDot:true,
            hasUnderscore:true,
            hasLanlan:true
        }];
        let fn=()=>{
            let validator=new  Validator();
            errors=validator.validate(data,rules);
        };
         expect(fn).to.throw();
    });
    it('自定义测试规则 hasNumber',()=>{
        let data={email:'asdfsddf'};
        let validator=new Validator();
        validator.hasNumber=(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字';
            }
        };
        let rules=[{  key:'email',  required:true,  hasNumber:true }];
        let  errors;
        let fn = () => {
                errors=validator.validate(data,rules);
            }
        expect(fn).to.not.throw();
        expect(errors.email.hasNumber).to.eq('必须含有数字');
    });
    it('两个 validator 互不影响',()=>{
        let data={email:'asdfsddf'};
        let validator1=new Validator();
        let validator2=new Validator();
        validator1.hasNumber=(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字';
            }
        };
        let rules=[{
            key:'email',
            required:true,
            hasNumber:true
        }];
        let  errors;
        expect(()=>{
            validator1.validate(data,rules);
        }).to.not.throw();
         expect(()=>{
            validator2.validate(data,rules);
    }).to.throw();
    });
    it('可以全局添加新规则',()=>{
        let data={email:'asdfsddf'};
        let validator1=new Validator();
        let validator2=new Validator();
        Validator.add('hasNumber',(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字';
            }
        });
        let rules=[{
            key:'email',
            required:true,
            hasNumber:true
        }];
        let  errors;
        let fn = () => {
            errors=validator.validate(data,rules);
        }
        expect(()=>{
            validator1.validate(data,rules);
        }).to.not.throw();
        expect(()=>{
            validator2.validate(data,rules);
        }).to.not.throw();
    })
});