import React from 'react';

import {DecorateWithImageAndLabel} from '../widgets/Decorator';

import GenderStyle from './Gender.scss';

export default class Gender extends React.Component {
    constructor(props) {
        super(props);
    }

    isInValidState() {
        return this.props.data != '';
    }

    handleGenderSelection = (event) => {
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
                <DecorateWithImageAndLabel key={item.value} containerStyle="col-md-5 col-xs-5 float-none inline-block" imageStyle={GenderStyle['icon' + item.value]} label={item.value}>
                    <input type="radio" value={item.value} data-value={item.value} 
                        name='gender' onChange={this.handleGenderSelection} checked={this.props.data === item.value}/>
                </DecorateWithImageAndLabel>
            )
        );

        return (
            <div className={GenderStyle.container}>
                {radioItems}
            </div>            
        )
    }
}