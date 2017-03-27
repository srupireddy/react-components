import React from 'react';
import Select from 'react-select';

export default class Country extends React.Component {
	static options = [ 'Australia', 'Bahrain', 'Belgium', 'Canada', 'China', 'Denmark', 'France', 'Germany', 'Hong Kong', 'Indonesia', 'Italy', 'Japan', 'Kuwait', 'Malaysia', 'Netherlands', 'New Zealand', 'Oman', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'Spain', 'Switzerland', 'UAE', 'UK', 'USA', 'Yemen', 'Other'];

	render() {
		let optionsTransformed = Country.options.map(value => ({value: value, label: value}));
		return (
			<div className="selectContainer">
				<Select simpleValue
						value={this.props.value} onChange={this.props.onChange} options={optionsTransformed} 
						placeholder='Select Residence Country'
				/>
			</div>
		);
	}
}
