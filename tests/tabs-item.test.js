const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs/tabs'
import TabsHead from '../src/tabs/tabs-head'
import TabsBody from '../src/tabs/tabs-body'
import TabsItem from '../src/tabs/tabs-item'
import TabsPane from '../src/tabs/tabs-pane'
Vue.component('g-tabs',Tabs);
Vue.component('g-tabs-head',TabsHead);
Vue.component('g-tabs-body',TabsBody);
Vue.component('g-tabs-item',TabsItem);
Vue.component('g-tabs-pane',TabsPane);
Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Tabs', () => {
    it('存在.', () => {
        expect(TabsItem).to.be.ok;
    });

    it('子组件接受name属性',()=>{
            const Constructor=Vue.extend(TabsItem);
            const vm=new Constructor({
                propsData:{
                    name:'xxx'
                }
            }).$mount();
       expect(vm.$el.getAttribute('data-name')).to.eq('xxx');
    });
    it('子组件接受disabled属性',()=>{
        const Constructor=Vue.extend(TabsItem);
        const vm=new Constructor({
            propsData:{
                disabled:true
            }
        }).$mount();
        expect(vm.$el.classList.contains('disabled')).to.be.true;
        const callback=sinon.fake();
        vm.$on('click',callback);
        vm.$el.click();
        expect(callback).to.have.not.been.called;
    });
});