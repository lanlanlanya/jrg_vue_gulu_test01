import    chai ,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {shallowMount,mount} from '@vue/test-utils';
import CollapseItem from '../../src/collapse/collapse-item';
chai.use(sinonChai);
describe('CollapseItem', () => {
    it('存在.', () => {
        expect(CollapseItem).to.exist;
    });
});