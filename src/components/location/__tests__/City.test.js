import React from 'react';
import { shallow, mount } from 'enzyme';

import City from '../City';
import ActionHandler from '../../ActionHandler';

describe('City Component Testing', function () {
    let mockActionHandler;

    beforeEach(() => {
        mockActionHandler = new ActionHandler();
        mockActionHandler.onCompletion = jest.fn();
        mockActionHandler.showError = jest.fn();
        mockActionHandler.clearError = jest.fn();
    });

    it("Should render only the Top 4 Cities along with Other Cities Option without anything selected", function() {
        const modelKey = "modelKeyForCity";
        const wrapper = mount(<City handler={mockActionHandler} modelKey={modelKey}/>);
        expect(wrapper.find("input[type='radio']").length).toBe(4);
        expect(wrapper.find("input[type='text']").length).toBe(1);
        wrapper.find("input[type='radio']").forEach(function(element, index) {
            expect(element.props.checked).toBeUndefined();
        });
        expect(wrapper.find("input[type='text']").first().props().value).toBe('');
    });

    it('Should call the ActionHandler when a city is chosen', function () {
        const modelKey = "modelKeyForCity";
        const wrapper = mount(<City handler={mockActionHandler} modelKey={modelKey}/>);        
        wrapper.find('input').first().simulate('change');
        expect(mockActionHandler.onCompletion).toBeCalledWith(modelKey, "NEW DELHI");
    });

});