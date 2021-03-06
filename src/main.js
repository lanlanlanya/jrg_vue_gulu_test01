import Vue from 'vue'
import Demo from './demo.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Demo)
}).$mount('#app')

// import Vue from 'vue'
// import Button from './button'
// import Icon from './icon'
// import ButtonGroup from './button-group'
// import Input from './Input'
// import Row from  './row'
// import Col from  './col'
// import Layout from './layout'
// import Header from './header'
// import Sider from './sider'
// import Content from './content'
// import Footer from './footer'
// import Toast from './toast'
// import plugin from './plugin'
// import Tabs from './tabs'
// import TabsHead from './Tabs-head'
// import TabsBody from './Tabs-body'
// import TabsItem from './Tabs-item'
// import TabsPane from './Tabs-pane'
// import Popover from './popover'
// import Collapse from './collapse'
// import CollapseItem from './collapse-item'
// import Cascader from "./cascader"
import CascaderItems from "./cascader/cascader-items"
// Vue.component('g-button',Button);
// Vue.component('g-icon',Icon);
// Vue.component('g-button-group',ButtonGroup);
// Vue.component('g-input',Input);
// Vue.component('g-row',Row);
// Vue.component('g-col',Col);
// Vue.component('g-layout',Layout);
// Vue.component('g-header',Header);
// Vue.component('g-content',Content);
// Vue.component('g-sider',Sider);
// Vue.component('g-footer',Footer);
// Vue.component('g-toast',Toast);
// Vue.component('g-tabs',Tabs);
// Vue.component('g-tabs-head',TabsHead);
// Vue.component('g-tabs-body',TabsBody);
// Vue.component('g-tabs-item',TabsItem);
// Vue.component('g-tabs-pane',TabsPane);
// Vue.component('g-popover',Popover);
// Vue.component('g-collapse',Collapse);
// Vue.component('g-collapse-item',CollapseItem);
// Vue.component('g-cascader',Cascader);
 Vue.component('g-cascader-items',CascaderItems);
// Vue.use(plugin);
// new Vue({
//     el:"#app",
//     data:{
//         loading1:false,
//         loading2:true,
//         loading3:false,
//         message:"hello",
//         selectedTab:['2','1'],
//         source:[
//             {name:'浙江',
//                 children:[
//                     {name: "杭州", children: [{ name: "上城区"},{name: "下城区"}, {name: "江干区"}]},
//                     {name: "嘉兴", children: [{ name: "南湖区"},{name: "秀洲区"}, {name: "嘉善区"}]}
//                     ]
//             },
//             {name:'福建',
//                 children:[
//                 {name: "福州", children: [{ name: "鼓楼区"},{name: "台江区"}, {name: "仓山区"}]}
//             ]
//             },
//             {name:'河北',
//                 children:[
//                     {name: "石家庄", children: [{ name: "桥东区"},{name: "桥西区"}, {name: "开发区"}]},
//                     {name: "邯郸市", children: [{ name: "磁县"},{name: "涉县"}, {name: "大名"}]}
//                 ]
//             }
//           ]
//     },
//     created(){
//         // setTimeout(()=>{
//         //     let event =new Event('change');
//         //     let inputElement=this.$el.querySelector('input');
//         //     inputElement.dispatchEvent(event);
//         //     console.log('hi');
//         // },3000)
//
//     },
//     methods:{
//         yyy(data){
//             console.log('yyy:'+data)
//         },
//         showToast1(){
//             this.showToast('top');
//         },
//         showToast2(){
//             this.showToast('middle');
//         },
//         showToast3(){
//             this.showToast('bottom');
//         },
//         showToast(position){
//             this.$toast(`你的智商目前为${parseInt(Math.random()*100)},你的智商需要充值！`,{
//                 position,
//                 enableHtml:false,
//                 closeButton:{
//                     text:'已充值',
//                     callback(){
//
//                     }
//                 },
//                 autoClose:3
//                 // autoCloseDelay:3
//             });
//         }
//     }
// });
// //单元测试
// import chai from 'chai'
// import spies from 'chai-spies'
// chai.use(spies);
// const expect=chai.expect;
//     {
//         // console.log(Button);
//         const Constructor = Vue.extend(Button);
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'settings'
//             }
//         });
//         vm.$mount();
//         let useElement = vm.$el.querySelector('use');
//         // console.log(useElement);
//         let href = useElement.getAttribute('xlink:href');
//         expect(href).to.eq('#i-settings');
//         vm.$el.remove();
//         vm.$destroy();
//     }
//     {
//         //单元测试loading
//         const Constructor = Vue.extend(Button);
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'settings',
//                 loading: true
//             }
//         });
//         vm.$mount();
//         let useElement = vm.$el.querySelector('use');
//         let href = useElement.getAttribute('xlink:href');
//         expect(href).to.eq('#i-loading');
//     }
//     {
// //   单元测试 oorder
//         const div = document.createElement('div');
//         document.body.appendChild(div);
//         const Constructor = Vue.extend(Button);
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'settings'
//
//             }
//         });
//         vm.$mount(div);
//         let svg = vm.$el.querySelector('svg');
//         // console.log(svg);
//         let order = window.getComputedStyle(svg).order;
//         expect(order).to.eq('1');
//         vm.$el.remove();
//         vm.$destroy();
//     }
//     {
// //   单元测试 oorder-iconPosition
//         const div = document.createElement('div');
//         document.body.appendChild(div);
//         const Constructor = Vue.extend(Button);
//         const vm = new Constructor({
//             propsData: {
//                 icon: 'settings',
//                 iconPosition: 'right'
//
//             }
//         });
//         vm.$mount(div);
//         let svg = vm.$el.querySelector('svg');
//         // console.log(svg);
//         let order = window.getComputedStyle(svg).order;
//         expect(order).to.eq('2');
//         vm.$el.remove();
//         vm.$destroy();
//     }
// {
// //   mock
//     const Constructor = Vue.extend(Button);
//     const gButton = new Constructor({
//         propsData: {
//             icon: 'settings'
//         }
//     });
//     gButton.$mount();
//     let spy = chai.spy(function () {
//     })
//     gButton.$on('click', spy);
//     let button = gButton.$el;
//     // console.log(button);
//     button.click();
//     expect(spy).to.have.been.called();
// }