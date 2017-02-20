import React from 'react';

import TextFieldStyle from './TextField.scss';
import ButtonStyle from './Button.scss';
import RadioStyle from './Radio.scss';

export class TextField extends React.Component {
    render() {
        return (
            <input type="text" value={this.props.value} placeholder="Enter your details"  className={TextFieldStyle.bbInput} onClick={this.props.onClick}/>
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
                <input type="text" value={this.props.value} placeholder="Enter the details"  className={TextFieldStyle.bbInput}/>
            </div>
        )
    }
};

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

export class RadioWithImageLabel extends React.Component {
    render() {
        return (
            <div className={this.props.containerStyle}>
                <label className={RadioStyle.labelContainer}>
                    <span className={this.props.imageStyle}/>
                    <span className={RadioStyle.label}>{this.props.label}</span>
                    <input type="radio" value={this.props.value} data-value={this.props.value} name={this.props.name} onChange={this.props.onChange} checked={this.props.checked} />
                </label>
            </div>
        );
    }
}
