import React from 'react';

import InputfieldStyle from './Inputfield.scss';

export class Inputfield extends React.Component {
    render() {
        return (
            <input type="text" placeholder="Enter the Experience Details"  className={InputfieldStyle.bbInput}/>
        )
    }
};

export class InputfieldGroup extends React.Component {
    render() {
        return (
        <div className={InputfieldStyle.inputGroup}>
            <span className={InputfieldStyle.inputGroupIcon}>
                <span className={[InputfieldStyle.spriteSlider, InputfieldStyle.iconRupee].join(' ')}></span>
            </span>
            <input type="text" placeholder="Enter the Salary"  className={InputfieldStyle.bbInput}/>
        </div>
        )
    }
};
