import React from 'react';
import {Radio} from 'react-radio-group';

import richstyle from './RichRadio.css';

export default class RichRadio extends React.Component {
    render() {
        return (
            <div className={this.props.containerStyle}>
                <label className={richstyle.eformColSection}>
                    <span className={this.props.imageStyle}/>
                    <span className={richstyle.richinfo}>{this.props.label || this.props.value}</span>
                    <Radio value={this.props.value} />
                </label>
            </div>
        );
    }
}
