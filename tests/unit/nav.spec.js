import    chai ,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {shallowMount,mount} from '@vue/test-utils';
import Nav from '../../src/nav/nav.vue';
import NavItem from '../../src/nav/nav-item.vue'
import SubNav from '../../src/nav/sub-nav.vue'
import Vue from 'vue'
chai.use(sinonChai);

describe('Nav', () => {
    it('存在.', () => {
        expect(Nav).to.be.ok;
    });
    it('支持selected属性.', (done) => {
        Vue.component('g-nav-item',NavItem);
        Vue.component('g-sub-nav',SubNav);
        const wrapper = mount(Nav,{
            propsData: {
                selected:'home'
            },
            slots:{
                default:` <g-nav-item name="home">首页</g-nav-item>
                                <g-sub-nav name="about">
                                    <template slot="title" >关于</template>
                                        <g-nav-item name="culture">企业文化</g-nav-item>
                                        <g-nav-item name="developers">开发团队</g-nav-item>                                        
                                </g-sub-nav>
                                <g-nav-item name="hire">招聘</g-nav-item>`
            }
        });
        setTimeout(()=>{
            expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true;
            done();
        })
    });
    it('会触发 update:selected 事件',(done)=>{
        Vue.component('g-nav-item',NavItem);
        Vue.component('g-sub-nav',SubNav);
        const callback=sinon.fake();
        const wrapper = mount(Nav,{
            propsData: {
                selected:'home'
            },
            slots:{
                default:` <g-nav-item name="home">首页</g-nav-item>
                                <g-sub-nav name="about">
                                    <template slot="title" >关于</template>
                                        <g-nav-item name="culture">企业文化</g-nav-item>
                                        <g-nav-item name="developers">开发团队</g-nav-item>                                       
                                </g-sub-nav>
                                <g-nav-item name="hire">招聘</g-nav-item>`
            },
            listeners:{
                'update:selected':callback
            }
        });
            wrapper.find('[data-name="developers"]').trigger('click');;
            expect(callback).to.have.been.calledWith('developers');
            done();
    })
});