import React from 'react';
import {Radio} from 'react-radio-group';

import RadioStyle from './Radio.css';

export default class RichRadio extends React.Component {
    render() {
        return (
            <div className={this.props.containerStyle}>
                <label className={RadioStyle.labelContainer}>
                    <span className={this.props.imageStyle}/>
                    <span className={RadioStyle.label}>
                        {this.props.label || this.props.value}
                    </span>
                    <Radio value={this.props.value} />
                </label>
            </div>
        );
    }
}
