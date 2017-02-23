import React from 'react';
import Tooltip from 'rc-tooltip';

import TextFieldStyle from '../widgets/TextField.scss';

export default class Employer extends React.Component {
    render() {
        return (
            <div style={{...this.props.style, width: '300px'}}>
                <Tooltip placement="right"  overlay={<span>Psst! Don't worry if you don't find your company name on our list! Simply type in the name & proceed! We've got your back!</span>}>
                      <input type="text" value={this.props.value} placeholder="Enter your details"  className={TextFieldStyle.bbInput}/>
                </Tooltip>
            </div>
        )
    }
}