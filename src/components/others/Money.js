import React from 'react';
import Slider from 'react-rangeslider';

import BaseComponent from '../BaseComponent';
import {DecorateInputFieldWithSymbol} from '../../widgets/Decorator.js'
import SpriteStyle from '../../widgets/Sprite.scss'

export default class Money extends BaseComponent{
    static propTypes = {
        ...BaseComponent.propTypes,
        currencyCode: React.PropTypes.oneOf(['INR']).isRequired,
        value: React.PropTypes.number.isRequired,
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        step: React.PropTypes.number,
        allowGranularValue: React.PropTypes.bool
    };

    static defaultProps = {
        min: 0,
        max: 120000,
        value: 0,
        step: 1000,
        allowGranularValue: true
    };

    state = {
        value: this.props.value || 0
    }

    render() {
        return (
            <div>
                {this.props.allowGranularValue &&
                    <div style={{...this.props.style, width: '300px', margin:'0 auto'}}>
                        <DecorateInputFieldWithSymbol iconStyle={this.currencyIconToBeUsed()}>
                            <input type="text" value={this.state.value} onChange={this.handleTextFieldValueChange}/>
                        </DecorateInputFieldWithSymbol>
                    </div>
                }
                <div className={["slider-horizontal-ruler", this.rulerToBeUsed()].join(' ')}>
                    <Slider value={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleSliderValueChange} onChangeComplete={this.handleSliderValueChangeCompleted}/>
                </div>
            </div>
        )
    }

    rulerToBeUsed() {
        //TODO: Programatically generate the background image to be rendered for the ruler.
        switch (this.props.max) {
            case 120000: return "ruler-0-120000";
            default: return "ruler-blank";
        }
    }

    currencyIconToBeUsed() {
        switch (this.props.currencyCode) {
            case 'INR': return SpriteStyle.symbolRupee;
            default: return SpriteStyle.symbolRupee;
        }
    }

    handleTextFieldValueChange = (event) => {
        let value = event.target.value;
        if (isNaN(value)) {
            value = this.props.min;
        }
        value = Math.max(value, this.props.min);
        value = Math.min(value, this.props.max);
        this.setState({value: parseInt(value)});
    }

    handleSliderValueChange = (value) => {
        this.setState({value: value});
    }

    handleSliderValueChangeCompleted = (event) => {
        console.log(event);
    }

    getData() {
        return this.state.value;
    }

    isStateValid() {
        return this.state.value ? true : false;
    }    
}