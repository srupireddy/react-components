import React from 'react';

import {RadioWithImageLabel} from '../widgets/HTMLInputElements'

import GenderStyle from './Gender.scss';

export default class Gender extends React.Component {
    constructor(props) {
        super(props);
        this.handleGenderSelection = this.handleGenderSelection.bind(this);
    }

    isInValidState() {
        return this.props.data != '';
    }

    handleGenderSelection(event) {
        let value = event.target.value;
        this.props.onCompletionOfAction(value);
    }

    render() {
        let genderRadioItemsConfig = [
            {value: 'Male', label: 'Male', imageStyle: GenderStyle.iconMale},
            {value: 'Female', label: 'Female', imageStyle: GenderStyle.iconFemale}
        ];

        let radioItems = genderRadioItemsConfig.map(
            (item) => (
                <RadioWithImageLabel 
                    key={item.value}
                    name="gender" 
                    value={item.value}
                    label={item.label}
                    imageStyle={item.imageStyle} 
                    containerStyle="col-md-5 col-xs-5 float-none inline-block"
                    onChange={this.handleGenderSelection}
                    checked={this.props.data === item.value}
                />
            )
        );

        return (
            <div className={GenderStyle.container}>
                {radioItems}
            </div>            
        )
    }
}