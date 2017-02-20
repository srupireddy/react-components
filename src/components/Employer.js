import React from 'react';

import EmployerStyle from './Employer.scss';
import TextFieldStyle from '../widgets/TextField.scss';

export default class Employer extends React.Component {
    isInValidState() {
        return true;
    }

    render() {
        return (
            <div className={EmployerStyle.container}>
                <input type="text" value={this.props.value} placeholder="Enter your details"  className={TextFieldStyle.bbInput}/>
            </div>
        )
    }
}