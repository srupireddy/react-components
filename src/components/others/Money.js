import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'react-rangeslider';

import BaseComponent from '../BaseComponent';
import {DecorateInputFieldWithSymbol} from '../../widgets/Decorator.js'
import SpriteStyle from '../../widgets/Sprite.scss'

export default class Money extends BaseComponent{
    static propTypes = {
        ...BaseComponent.propTypes,
        currencyCode: React.PropTypes.oneOf(['INR']).isRequired,
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        sliderMin: React.PropTypes.number,
        sliderMax: React.PropTypes.number,
        sliderStep: React.PropTypes.number,
        purpose: React.PropTypes.string.isRequired,
        tooltip: React.PropTypes.shape({text:  React.PropTypes.string.isRequired})
    };

    static defaultProps = {
        sliderStep: 1000
    };

    state = {
        value: this.props.value || '',
        sliderMin: this.props.sliderMin || this.props.min,
        sliderMax: this.props.sliderMax || this.props.max
    }

    render() {
        let sliderValue = this.state.value ? parseInt(this.state.value) : 0;
        return (
            <div className="clearfix">
                <div className="slideInputLabel clearfix">
                        {this.props.tooltip ?
                        (<Tooltip placement="rightTop" trigger='focus' defaultVisible={true} overlay={<span>{this.props.tooltip.text}</span>}>
                        {this.currencyBasedInputField()}
                        </Tooltip>)
                        :
                        this.currencyBasedInputField()
                        }
                </div>
                <div className={["slider-horizontal-ruler", this.rulerToBeUsed(), "clearfix"].join(' ')}>
                    <Slider value={sliderValue} min={this.state.sliderMin} max={this.state.sliderMax} step={this.props.sliderStep} onChange={this.handleSliderValueChange} onChangeComplete={this.handleSliderValueChangeCompleted}/>
                </div>
            </div>
        )
    }

    currencyBasedInputField() {
        return (
            <DecorateInputFieldWithSymbol iconStyle={this.currencyIconToBeUsed()}>
                <input type="number" value={this.state.value} min={this.props.min} max={this.props.max} placeholder="Rs." onChange={this.handleTextFieldValueChange}/>
            </DecorateInputFieldWithSymbol>
        );
    }

    rulerToBeUsed() {
        //TODO: Programatically generate the background image to be rendered for the ruler.
        switch (this.state.sliderMax) {
            case 120000: return "ruler-0-120000";
            //case 3000000: return "ruler-0-3000000";
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
        let sliderValue = 0;
        if (value) {
            value = Math.abs(parseInt(value));
        }
        
        this.setState({value});
    }

    handleSliderValueChange = (value) => {
        this.setState({value});
    }

    handleSliderValueChangeCompleted = (event) => {
        if (this.validate()) {
            this.notifyCompletion();
        }
    }

    getData() {
        return this.state.value;
    }

    validate() {
        let value = this.state.value;
        if (!value) {
            this.props.handler.showError("Uh-oh! Please enter your " + this.props.purpose);
            return false;
        } else if (value < this.props.min) {
            this.props.handler.showError("Uh Oh! We need your " + this.props.purpose);
            return false;
        }

        if (this.state.value >= this.props.min && this.state)
        return this.state.value ? true : false;
    }    
}