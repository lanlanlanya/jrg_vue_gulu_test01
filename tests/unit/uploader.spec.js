import    chai ,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {shallowMount,mount} from '@vue/test-utils';
import Uploader from '../../src/uploader.vue';
import http from '../../src/http.js';
chai.use(sinonChai);

describe('Uploader', () => {
    it('存在.', () => {
        expect(Uploader).to.be.ok;
    });

    it('可以上传一个文件.', (done) => {
        let stub=sinon.stub(http,'post').callsFake((url,options)=>{
            setTimeout(function(){
                options.success('{"id":"123123"}');
                // expect(wrapper.find('use').exists()).to.eq(false)
                expect(wrapper.find('img').exists()).to.eq(true);
                expect(wrapper.find('img').attributes().src).to.eq('/preview/123123');
                done();
            },1000);
        });
        const wrapper = mount(Uploader,{
            attachToDocument:true,
            propsData: {
                name: "file",
                action: "/upload",
                parseResponse: (response) =>{
                    let object=JSON.parse(response);
                    return `/preview/${object.id}`
                },
                fileList:[]
            },
            slots:{
                default:`<button id="x">click me</button>`
            },
            listeners:{
                'update:fileList':(fileList)=>{
                    wrapper.setProps({fileList:fileList})
                },
                'uploaded':()=>{
                    expect(wrapper.find('use').exists()).to.eq(false);
                    expect(wrapper.props().fileList[0].url).to.eq('/preview/123123');
                    stub.restore();
                    done();
                }
            }

        });
        wrapper.find('#x').trigger('click');
        let inputWrqapper=wrapper.find('input[type="file"]');
        let input=inputWrqapper.element;
        let file1=new File(['xxxxxx'],'xxx.txt',{type:'image/png'});
        let file2=new File(['yyyyyy'],'yyy.txt',{type:'image/png'});
        const data=new DataTransfer();
        data.items.add(file1);
        data.items.add(file2);
        input.files=data.files;
        let use=wrapper.find('use').element;
        expect(use.getAttribute('xlink:href')).to.eq('#i-loading');
    });
    });



