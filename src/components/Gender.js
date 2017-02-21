import React from 'react';

import {DecorateWithImageAndLabel} from '../widgets/Decorator';

import GenderStyle from './Gender.scss';

export default class Gender extends React.Component {
    static options = ['Male', 'Female'];

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
        let radioItems = Gender.options.map(
            (option) => (
                <DecorateWithImageAndLabel key={option} imageStyle={GenderStyle['icon' + option]} label={option} containerStyle="col-md-5 col-xs-5 float-none inline-block" >
                    <input type="radio" value={option}
                        name='gender' onChange={this.handleGenderSelection} checked={this.props.data === option}/>
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