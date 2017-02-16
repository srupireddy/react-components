import React from 'react';

import TextFieldStyle from './TextField.scss';

export class TextField extends React.Component {
    render() {
        return (
            <input type="text" placeholder="Enter your details"  className={TextFieldStyle.bbInput} onClick={this.props.onClick}/>
        )
    }
};

export class IconTextField extends React.Component {
    render() {
        return (
        <div className={TextFieldStyle.inputGroup}>
            <span className={TextFieldStyle.inputGroupIcon}>
                <span className={TextFieldStyle.iconRupees}></span>
            </span>
            <input type="text" placeholder="Enter the details"  className={TextFieldStyle.bbInput}/>
        </div>
        )
    }
};
