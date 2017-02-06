import React from 'react';
import { shallow, mount } from 'enzyme';

import City from '../../src/components/City';

describe('City Component Testing', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<City />).find('RadioGroup').length).toBe(1);
  });

  it('should render all Cities as individual Radios', function() {
    expect(mount(<City />).find('input').length).toBe(5);
  });
  
  it('should return the selected value', function() {
    const radioGroup = mount(<City/>);
    radioGroup.find('input').first().simulate('change');

    expect(radioGroup.instance().selectedCity()).toBe('Chennai');
  });
});