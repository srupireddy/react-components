import React from 'react';
import { shallow, mount } from 'enzyme';

import Money from '../Money';
import ActionHandler from '../../ActionHandler';

describe('Money Component Testing', function () {
    let mockActionHandler;

    const modelKey = "modelKeyForMoney";
    let mountComponent = function(props) {
        return mount(<Money handler={mockActionHandler} modelKey={modelKey} min={1000} max={100000} currencyCode='INR' purpose='testing' {...props}/>);
    }

    beforeEach(() => {
        mockActionHandler = new ActionHandler();
        mockActionHandler.onCompletion = jest.fn();
        mockActionHandler.showError = jest.fn();
        mockActionHandler.clearError = jest.fn();
    });

    it("Basic Testing", function() {
        let componentWrapper = mountComponent();
        expect(componentWrapper.find("input[type='number']").length).toBe(1);
        expect(componentWrapper.find(".rangeslider").length).toBe(1);
        expect(componentWrapper.instance().validate()).toBe(false);
        componentWrapper.find('input').first().simulate('change', {target:  {value: 5000}});
        expect(componentWrapper.state('value')).toBe(5000);
        expect(componentWrapper.instance().validate()).toBe(true);
    });

    it('Initial/Default Value population', function () {
        let componentWrapper = mountComponent({value: 6000});
        expect(componentWrapper.instance().validate()).toBe(true);
        expect(componentWrapper.state('value')).toBe(6000);
    });
});
