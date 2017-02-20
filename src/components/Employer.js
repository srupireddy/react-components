import React from 'react';

import {TextField, IconTextField} from '../widgets/HTMLInputElements'

import EmployerStyle from './Employer.scss';

export default class Employer extends React.Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <div className={EmployerStyle.container}>
                    <TextField/>
            </div>
        )
    }
}