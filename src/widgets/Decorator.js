import React from 'react';

import DecoratorStyle from './Decorator.scss';

export class DecorateWithImageAndLabel extends React.Component {
    render() {
        return (
            <div className={this.props.containerStyle}>
                <label className={DecoratorStyle.labelContainer}>
                    <span className={this.props.imageStyle}/>
                    <span className={DecoratorStyle.label}>{this.props.label}</span>
                    {this.props.children}
                </label>
            </div>
        )        
    }
}

export class DecorateInputFieldWithSymbol extends React.Component {
    render() {
        return (
            <div className={DecoratorStyle.inputGroup}>
                <span className={DecoratorStyle.inputGroupIcon}>
                    <span className={this.props.iconStyle}></span>
                </span>
                {this.props.children}
            </div>
        )        
    }
}