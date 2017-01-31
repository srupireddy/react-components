import React from 'react';
import RichRadioGroup from '../../widgets/RichRadioGroup.js'
import CityStyle from './City.css';


class City extends React.Component {
  constructor(props) {
    super(props);
    this.handleCitySelection = this.handleCitySelection.bind(this);
  }

  selectedValue() {
    // By default React expects the value of a Form Element to be undefined or null for it to be uncontrolled.
    // We shouldnt change a uncontrolled element to controlled (Refer https://github.com/facebook/react/issues/6779)
    // Therefore explicitly setting it as ''
    return this.props.data || ''
  }

  isInValidState() {
    return this.selectedValue() != '';
  }

  handleCitySelection(value) {
    this.props.onCompletionOfAction(value);
  }

  render() {
    let cityRadioItemsConfig = [
      {value: 'Chennai', imageStyle: CityStyle.iconChennai},
      {value: 'Mumbai', imageStyle: CityStyle.iconMumbai},
      {value: 'New Delhi', imageStyle: CityStyle.iconNewDelhi},
      {value: 'Bangalore', imageStyle: CityStyle.iconBangalore}
    ];

    return (
      <RichRadioGroup
          name='city'
          selectedValue={this.selectedValue()}
          onChange={this.handleCitySelection}
          items={cityRadioItemsConfig}
          itemContainerStyle='col-xs-6 col-sm-2 col-md-2 text-center'
        />
    );
  }
}

export default City;
