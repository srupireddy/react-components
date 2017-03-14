import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import ApplyingWithCoApplicantStyle from './ApplyingWithCoApplicant.scss';

export default class ApplyingWithCoApplicant extends BaseComponent {
    static options = [
        {value:'LAND_OWNER', label: 'Yes, I am applying with a co-applicant', imageStyle: ApplyingWithCoApplicantStyle.genderBoth},
        {value:'GOVT_DEVELOPMENT_AUTHORITY', label: 'No, I am applying alone', imageStyle: ApplyingWithCoApplicantStyle.genderFemale}
    ];

    state = {
        selectedValue: this.props.value
    }
    
    render() {
        let radioItems = ApplyingWithCoApplicant.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-5 col-xs-5 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='applyingWithCoApplicant' onChange={this.handleApplyingWithCoApplicantSelection} checked={this.state.selectedValue === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {ApplyingWithCoApplicantStyle.withCoApplicantContainer}>
                {radioItems}
            </div>            
        )
    }

    handleApplyingWithCoApplicantSelection = (event) => {
        let value = event.target.value;
        this.setState({selectedValue: value}, () => {this.notifyCompletion()});
    }

    getData() {
        return this.state.selectedValue;
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