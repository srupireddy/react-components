import React from 'react';
import Select from 'react-select';

var options = [
	{ value: 'Australia', label: 'Australia' },
	{ value: 'Bahrain', label: 'Bahrain' },
	{ value: 'Belgium', label: 'Belgium' },
	{ value: 'Canada', label: 'Canada' },
	{ value: 'China', label: 'China' },
	{ value: 'Denmark', label: 'Denmark' },
	{ value: 'France', label: 'France' },
	{ value: 'Germany', label: 'Germany' },
	{ value: 'Hong Kong', label: 'Hong Kong' },
	{ value: 'Indonesia', label: 'Indonesia' },
	{ value: 'Italy', label: 'Italy' },
	{ value: 'Japan', label: 'Japan' },
	{ value: 'Kuwait', label: 'Kuwait' },
	{ value: 'Malaysia', label: 'Malaysia' },
	{ value: 'Netherlands', label: 'Netherlands' },
	{ value: 'New Zealand', label: 'New Zealand' },
	{ value: 'Oman', label: 'Oman' },
	{ value: 'Qatar', label: 'Qatar' },
	{ value: 'Russia', label: 'Russia' },
	{ value: 'Saudi Arabia', label: 'Saudi Arabia' },
	{ value: 'Singapore', label: 'Singapore' },
	{ value: 'Spain', label: 'Spain' },
	{ value: 'Switzerland', label: 'Switzerland' },
	{ value: 'UAE', label: 'UAE' },
	{ value: 'UK', label: 'UK' },
	{ value: 'USA', label: 'USA' },
	{ value: 'Yemen', label: 'Yemen' },
	{ value: 'Other', label: 'Other' }
];

var CountryField = React.createClass({
	displayName: 'CountryField',
	getInitialState () {
		return {
			disabled: false,
			searchable: this.props.searchable,
			clearable: true
		};
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render () {
		return (
			<div className="selectContainer">
				<Select ref="stateSelect" placeholder={'Select Residence Country'} options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} />
			</div>
		);
	}
});

module.exports = CountryField;
