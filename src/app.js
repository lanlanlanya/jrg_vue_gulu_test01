import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './Input'
Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-input',Input);
new Vue({
    el:"#app",
    data:{
        loading1:false,
        loading2:true,
        loading3:false,
        message:"hello"
    },
    created(){
        // setTimeout(()=>{
        //     let event =new Event('change');
        //     let inputElement=this.$el.querySelector('input');
        //     inputElement.dispatchEvent(event);
        //     console.log('hi');
        // },3000)
    },
    methods:{
        inputChange(e){
            console.log(e);
        }
    }
});
//单元测试
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies);
const expect=chai.expect;

    {
        // console.log(Button);
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings'
            }
        });
        vm.$mount();
        let useElement = vm.$el.querySelector('use');
        // console.log(useElement);
        let href = useElement.getAttribute('xlink:href');
        expect(href).to.eq('#i-settings');
        vm.$el.remove();
        vm.$destroy();
    }
    {
        //单元测试loading
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                loading: true
            }
        });
        vm.$mount();
        let useElement = vm.$el.querySelector('use');
        let href = useElement.getAttribute('xlink:href');
        expect(href).to.eq('#i-loading');
    }
    {
//   单元测试 oorder
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings'

            }
        });
        vm.$mount(div);
        let svg = vm.$el.querySelector('svg');
        // console.log(svg);
        let order = window.getComputedStyle(svg).order;
        expect(order).to.eq('1');
        vm.$el.remove();
        vm.$destroy();
    }
    {
//   单元测试 oorder-iconPosition
        const div = document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                iconPosition: 'right'

            }
        });
        vm.$mount(div);
        let svg = vm.$el.querySelector('svg');
        // console.log(svg);
        let order = window.getComputedStyle(svg).order;
        expect(order).to.eq('2');
        vm.$el.remove();
        vm.$destroy();
    }
{
//   mock
    const Constructor = Vue.extend(Button);
    const gButton = new Constructor({
        propsData: {
            icon: 'settings'
        }
    });
    gButton.$mount();
    let spy = chai.spy(function () {
    })
    gButton.$on('click', spy);
    let button = gButton.$el;
    // console.log(button);
    button.click();
    expect(spy).to.have.been.called();
}