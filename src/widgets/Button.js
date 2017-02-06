import React from 'react';

import ButtonStyle from './Button.css';

export class Button extends React.Component {
    render() {
        return (
            <button className={ButtonStyle.btn} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
};

export class IconOnlyButton extends React.Component {
    render() {
        return (
            <button className={ButtonStyle.icon} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
};
