import React from 'react';

import {IconTextField} from '../widgets/HTMLInputElements'

import RangeSlider from '../widgets/RangeSlider.js'

import SalaryStyle from './Salary.scss';

export default class Salary extends React.Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <div>
                <div className={SalaryStyle.container}>
                  <IconTextField />
                </div>
        <div className="slideHorizontalold">
                <RangeSlider />
        </div>
            </div>
        )
    }
}
