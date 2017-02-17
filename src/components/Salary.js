import React, {Component} from 'react';

import {TextField, IconTextField} from '../widgets/TextField.js'

import SalaryStyle from './Salary.scss';

class Salary extends Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <div className={SalaryStyle.container}>
                <IconTextField />
            </div>
        )
    }
}

export default Salary;
