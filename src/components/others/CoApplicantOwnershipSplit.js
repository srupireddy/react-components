import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import CoApplicantOwnershipSplitStyle from './CoApplicantOwnershipSplit.scss';

export default class CoApplicantOwnershipSplit extends BaseComponent {
    static options = [
        {value: true, label: 'Co-applicant will own it with me', imageStyle: CoApplicantOwnershipSplitStyle.iconEqualSplit},
        {value: false, label: 'I will be 100% owner', imageStyle: CoApplicantOwnershipSplitStyle.iconCompleteOwnerFemale}
    ];

    state = {
        selectedValue: this.props.value
    }
    
    render() {
        let radioItems = CoApplicantOwnershipSplit.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-5 col-xs-5 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='coAppOwner' onChange={this.handleCoAppOwnerSelection} checked={this.state.selectedValue === option.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className= {CoApplicantOwnershipSplitStyle.container}>
                {radioItems}
            </div>            
        )
    }

    handleCoAppOwnerSelection = (event) => {
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