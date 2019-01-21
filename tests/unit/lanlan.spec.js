import  {expect} from 'chai';
import lanlan from '../../src/lanlan'
describe('分支覆盖率',()=>{
    it('存在',()=>{
        expect(lanlan).to.exist;
    })
    it('小',()=>{
        expect(lanlan(6)).to.eq('小');
    });
    it('很小',()=>{
        expect(lanlan(3)).to.eq('很小');
    });
    it('大',()=>{
        expect(lanlan(11)).to.eq('大');
    });
});