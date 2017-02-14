import React, {Component} from 'react';

import {Inputfield, InputfieldGroup} from '../widgets/Inputfield.js'

import SalaryStyle from './Salary.scss';

class Salary extends Component {
  isInValidState() {
    return true;
  }

  render() {
    return (
      <div className={SalaryStyle.container}>
        <InputfieldGroup />
      </div>
    )
  }
}

export default Salary;
