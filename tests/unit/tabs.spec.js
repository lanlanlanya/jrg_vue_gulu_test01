import    chai ,{expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {shallowMount,mount} from '@vue/test-utils';
import Tabs from '../../src/tabs/tabs';

describe('Tabs', () => {
    it('存在.', () => {
        expect(Tabs).to.exist;
    });

});