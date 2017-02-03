import React from 'react';
import {Radio} from 'react-radio-group';

export default class RichRadio extends React.Component {
    render() {
        return (
            <div className={this.props.containerStyle}>
                <span className={this.props.imageStyle}/>
                <div/>
                {this.props.label || this.props.value}
                <div/>
                <Radio value={this.props.value} />
            </div>
        );
    }
}
