import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import GenderStyle from './Gender.scss';

export default class ApplyingWithCoApplicant extends BaseComponent {
    static options = [
        {value: true, label: 'Yes, I am applying with a co-applicant', imageStyle: GenderStyle.iconBoth},
        {value: false, label: 'No, I am applying alone', imageStyle: GenderStyle.iconFemale}
    ];

    state = {
        selectedValue: this.props.value
    }
    
    render() {
        let radioItems = ApplyingWithCoApplicant.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} imageStyle={option.imageStyle} label={option.label}  checked={this.state.selectedValue === option.value} containerStyle="col-md-5 col-xs-5 radio-col" >
                    <input type="radio" value={option.value} name='applyingWithCoApplicant' onChange={this.handleApplyingWithCoApplicantSelection} checked={this.state.selectedValue === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {GenderStyle.container}>
                {radioItems}
            </div>            
        )
    }

    handleApplyingWithCoApplicantSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedValue: value == 'true'}, () => {this.notifyCompletion()});
    }

    getData() {
        return {[this.props.modelKey]: this.state.selectedValue};
    }

    validate() {
        if (this.state.selectedValue) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick any one option to proceed");
            return false;
        }
    }
}