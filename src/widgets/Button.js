import React from 'react';

import ButtonStyle from './Button.css';

export class Button extends React.Component {
    render() {
        return (
            <button className={ButtonStyle.btn}>Continue</button>
        )
    }
};

export class IconOnlyButton extends React.Component {
    render() {
        return (
            <a className={ButtonStyle.icon} onClick={this.props.onClick}>
                <span className={this.props.iconStyle}/>
            </a>
        )
    }
};
