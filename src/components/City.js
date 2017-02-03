import React from 'react';
import {RadioGroup} from 'react-radio-group';

import RichRadio from '../widgets/RichRadio.js'

import CityStyle from './City.css';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCity: this.props.data}
    this.handleCitySelection = this.handleCitySelection.bind(this);
  }

  isInValidState() {
    return selectedCity() != '';
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
      {value: 'Bangalore', imageStyle: CityStyle.iconBangalore}
    ];

    let radioItems = cityRadioItemsConfig.map(
      (item) => (<RichRadio key={item.value} value={item.value} imageStyle={item.imageStyle} containerStyle='col-xs-6 col-sm-2 col-md-2 text-center'/>)
    );

    return (
      <RadioGroup name='city' selectedValue={this.selectedCity()} onChange={this.handleCitySelection} className="row">
        {radioItems}
      </RadioGroup>
    );
  }
}

export default City;
