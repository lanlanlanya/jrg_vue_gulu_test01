const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Input', () => {
    it('存在.', () => {
        expect(Input).to.be.ok;
    });
    describe('props',()=>{
        const Constructor = Vue.extend(Input);
        // let vm;
        // afterEach(()=>{
        //     vm.$destroy();
        // });
        it('可以接受value', () => {
            const vm = new Constructor({
                propsData: {
                    value: '12345'
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.value).to.equal('12345');
            vm.$destroy();
        });
        it('可以接受disabled', () => {
            const vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            // console.log(inputElement.outerHTML);
            expect(inputElement.disabled).to.equal( true);
            vm.$destroy();
        });
        it('可以接受readonly.', () => {
            const vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            // console.log(inputElement.outerHTML);
            expect(inputElement.readOnly).to.equal( true);
            vm.$destroy();
        });
        it('可以接受error.', () => {
            const vm = new Constructor({
                propsData: {
                    error: '你错了！'
                }
            }).$mount();
            const useElement = vm.$el.querySelector('use');
            expect(useElement.getAttribute('xlink:href')).to.equal( '#i-error');
            const errorMessage = vm.$el.querySelector('.errorMessage');
            expect(errorMessage.innerText).to.equal( '你错了！');
            vm.$destroy();
        });
    });
    describe('事件',()=>{
        const Constructor=Vue.extend(Input);
        it('支持 change/input/focus/blur 事件',()=>{
            ['change','input','focus','blur'].forEach((eventName)=>{
                let vm=new Constructor({ }).$mount();
                const callback=sinon.fake();
                vm.$on(eventName,callback);
                // 触发change事件
                var event=new Event(eventName);
                // console.log(event);
                Object.defineProperty(
                    event,'target',{
                        value:{value:'hi'},enumerable:true
                    }
                );
                let inputElement=vm.$el.querySelector('input');
                inputElement.dispatchEvent(event);
                expect(callback).to.have.been.calledWith('hi');
            });
            /*let vm=new Constructor({ }).$mount();
            const callback=sinon.fake();
            vm.$on('change',callback);
            // 触发change事件
            var event=new Event('change');
            // console.log(event);
            let inputElement=vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            expect(callback).to.have.been.calledWith(event);*/
        });
        /*it('支持 input 事件',()=>{
            let vm=new Constructor({ }).$mount();
            const callback=sinon.fake();
            vm.$on('input',callback);
            // 触发change事件
            var event=new Event('input');
            // console.log(event);
            let inputElement=vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            expect(callback).to.have.been.calledWith(event);
        });
        it('支持 focus 事件',()=>{
            let vm=new Constructor({ }).$mount();
            const callback=sinon.fake();
            vm.$on('focus',callback);
            // 触发change事件
            var event=new Event('focus');
            // console.log(event);
            let inputElement=vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            expect(callback).to.have.been.calledWith(event);
        });
        it('支持 blur 事件',()=>{
            let vm=new Constructor({ }).$mount();
            const callback=sinon.fake();
            vm.$on('blur',callback);
            // 触发change事件
            var event=new Event('blur');
            // console.log(event);
            let inputElement=vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            expect(callback).to.have.been.calledWith(event);
        });*/
    });
});