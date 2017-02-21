import React from 'react';

import EmployerStyle from './Employer.scss';

import TextFieldStyle from '../widgets/TextField.scss';

import Tooltip from 'rc-tooltip';


export default class Employer extends React.Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <div className={EmployerStyle.container}>
                <Tooltip placement="right"  overlay={<span>Psst! Don't worry if you don't find your company name on our list! Simply type in the name & proceed! We've got your back!</span>}>
                      <input type="text" value={this.props.value} placeholder="Enter your details"  className={TextFieldStyle.bbInput}/>
                </Tooltip>
            </div>
        )
    }
}