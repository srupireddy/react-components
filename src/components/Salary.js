import React from 'react';

import {IconTextField} from '../widgets/HTMLInputElements'

import SalaryStyle from './Salary.scss';

export default class Salary extends React.Component {
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
