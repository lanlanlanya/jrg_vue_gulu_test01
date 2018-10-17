const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'
Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast', () => {
    it('存在.', () => {
        expect(Toast).to.be.ok;
    });
    describe('属性',function(){
        it('接受autoClose',(done)=>{
            let div=document.createElement('div');
            document.body.appendChild(div);
            const Constructor=Vue.extend(Toast);
            const vm=new Constructor({
                propsData:{
                    autoClose: 1
                }
            }).$mount(div);
            vm.$on('close',()=>{
                expect(document.body.contains(vm.$el)).to.eq(false);
                done();
            });
        });
        it('接受 closeButton',(done)=>{
            const callback = sinon.fake();
            const Constructor=Vue.extend(Toast);
            const vm=new Constructor({
                propsData:{
                    closeButton: {
                        text:'关闭吧',
                        callback
                    }
                }
            }).$mount();
            let closeButton=vm.$el.querySelector('.close');
            expect(closeButton.textContent.trim()).to.eq('关闭吧');
            // console.log(closeButton);

            setTimeout(()=>{
                closeButton.click();
                expect(callback).to.have.been.called;
                done();
            },200);
        });
        it('接受 enableHtml',()=>{
            const Constructor= Vue.extend(Toast);
            const vm=new Constructor({
                    propsData:{enableHtml:true}
            });
            vm.$slots.default=['<strong id="test">Hi</strong>'];
            vm.$mount();
            let strong=vm.$el.querySelector('#test');
           expect(strong).to.be.ok;
        });
        it('接受 positon',()=>{
            const Constructor= Vue.extend(Toast);
            const vm=new Constructor({
                propsData:{
                    position:'bottom'
                }
            }).$mount();
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true);
        })
    })
});