import React from 'react';

import TextFieldStyle from './TextField.scss';

export class TextField extends React.Component {
    render() {
        return (
            <input type="text" placeholder="Enter the Experience Details"  className={TextFieldStyle.bbInput}/>
        )
    }
};

export class IconTextField extends React.Component {
    render() {
        return (
        <div className={TextFieldStyle.inputGroup}>
            <span className={TextFieldStyle.inputGroupIcon}>
                <span className={[TextFieldStyle.spriteSlider, TextFieldStyle.iconRupee].join(' ')}></span>
            </span>
            <input type="text" placeholder="Enter the Salary"  className={TextFieldStyle.bbInput}/>
        </div>
        )
    }
};
