import React from 'react';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel} from '../../widgets/Decorator';

import CoApplicantRelationshipStyle from './CoApplicantRelationship.scss';

export default class CoApplicantRelationship extends BaseComponent {
    static options = [
        {value:'FATHER', label: 'Father', imageStyle: CoApplicantRelationshipStyle.iconcoapplicant1},
        {value:'MOTHER', label: 'Mother', imageStyle: CoApplicantRelationshipStyle.iconcoapplicant2},
        {value:'SPOUSE', label: 'Spouse', imageStyle: CoApplicantRelationshipStyle.iconcoapplicant3},
        {value:'CHILDREN', label: 'Children', imageStyle: CoApplicantRelationshipStyle.iconcoapplicant4}
    ];
    render() {
        let radioItems = CoApplicantRelationship.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.value} name='coApplicantRelationship' onChange={this.handleCoApplicantRelationshipSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handleCoApplicantRelationshipSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}