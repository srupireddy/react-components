import React from 'react';
import BaseComponent from './BaseComponent';
import {DecorateWithImageAndLabel} from '../widgets/Decorator';
import CoAppRelationshipStyle from './CoAppRelationship.scss';

export default class CoAppRelationship extends BaseComponent {
    static options = [
        {label: 'Father', imageStyle: CoAppRelationshipStyle.iconcoapplicant1},
        {label: 'Mother', imageStyle: CoAppRelationshipStyle.iconcoapplicant2},
        {label: 'Spouse', imageStyle: CoAppRelationshipStyle.iconcoapplicant3},
        {label: 'Children', imageStyle: CoAppRelationshipStyle.iconcoapplicant4}
    ];
    render() {
        let radioItems = CoAppRelationship.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='coAppRelationship' onChange={this.handleCoAppRelationshipSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handleCoAppRelationshipSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}