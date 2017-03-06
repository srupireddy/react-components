import React from 'react';
import BaseComponent from './BaseComponent';
import {DecorateWithImageAndLabel} from '../widgets/Decorator';
import PurposeStyle from './Purpose.scss';

export default class Purpose extends BaseComponent {
    static options = [
        {label: 'Purchase or construct on property I have already chosen', imageStyle: PurposeStyle.iconpurpose1},
        {label: 'Transfer my existing home loan', imageStyle: PurposeStyle.iconpurpose2},
        {label: 'I haven’t yet identified the property I’d like to purchase', imageStyle: PurposeStyle.iconpurpose3}
    ];
    render() {
        let radioItems = Purpose.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option.label} containerStyle="col-md-3 col-xs-3 col-sm-3 radio-col" imageStyle={option.imageStyle} label={option.label}>
                    <input type="radio" value={option.label} name='purpose' onChange={this.handlePurposeSelection} checked={this.props.value === option.label}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div style={{...this.props.style, width: '900px'}}>
                {radioItems}
            </div>            
        )
    }

    handlePurposeSelection = (event) => {
        let value = event.target.value;
        this.notifyCompletion(value);
    }
}