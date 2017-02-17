import React from 'react';
import {RadioGroup} from 'react-radio-group';

import Radio from '../widgets/Radio.js'

import CityStyle from './City.scss';

export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedCity: this.props.data}
        this.handleCitySelection = this.handleCitySelection.bind(this);
    }

    isInValidState() {
        return this.selectedCity() != '';
    }

    selectedCity() {
        return this.state.selectedCity || '';
    }

    handleCitySelection(value) {
        this.setState({selectedCity: value});
        if (this.props.onCompletionOfAction) {
            this.props.onCompletionOfAction(value);
        }
    }

    render() {
        let cityRadioItemsConfig = [
            {value: 'Chennai', imageStyle: CityStyle.iconChennai},
            {value: 'Mumbai', imageStyle: CityStyle.iconMumbai},
            {value: 'New Delhi', imageStyle: CityStyle.iconNewDelhi},
            {value: 'Bangalore', imageStyle: CityStyle.iconBangalore},
            {value: 'Other', imageStyle: CityStyle.iconOther}
        ];

        let radioItems = cityRadioItemsConfig.map(
            (item) => (<Radio key={item.value} value={item.value} imageStyle={item.imageStyle} containerStyle='col-xs-2 col-sm-2 col-md-2 float-none inline-block'/>)
        );

        return (
            <RadioGroup name='city' selectedValue={this.selectedCity()} onChange={this.handleCitySelection} className={CityStyle.container}>
                {radioItems}
            </RadioGroup>
        );
    }
}
