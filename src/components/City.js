import React from 'react';
import Modal from 'react-modal';

import {TextField, RadioWithImageLabel} from '../widgets/HTMLInputElements'

import CityStyle from './City.scss';
import RadioStyle from '../widgets/Radio.scss'
import ModalStyle from '../widgets/Modal.scss';
import ListItemStyle from '../widgets/List.scss';

const titleCase = require('title-case');

const allCities = [
    {"state": "ANDHRA PRADESH", "city": "GUNTUR", "group": "SECONDARY_CITIES"}, 
    {"state": "ASSAM", "city": "GUWAHATI", "group": "SECONDARY_CITIES"}, 
    {"state": "BIHAR", "city": "PATNA", "group": "SECONDARY_CITIES"}, 
    {"state": "CHHATTISGARH", "city": "BHILAI", "group": "SECONDARY_CITIES"}, 
    {"state": "CHHATTISGARH", "city": "RAIPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "DELHI", "city": "NEW DELHI", "group": "FOCUS"}, 
    {"state": "GOA", "city": "GOA", "group": "SECONDARY_CITIES"}, 
    {"state": "GOA", "city": "PANAJI", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "AHMEDABAD", "group": "PRIMARY_CITIES"}, 
    {"state": "GUJARAT", "city": "ANAND", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "BHARUCH", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "BHAVNAGAR", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "BHUJ", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "GANDHIDHAM", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "JAMNAGAR", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "SILVASSA", "group": "SECONDARY_CITIES"}, 
    {"state": "GUJARAT", "city": "VIRAR", "group": "SECONDARY_CITIES"}, 
    {"state": "HARYANA", "city": "FARIDABAD", "group": "PRIMARY_CITIES"}, 
    {"state": "HARYANA", "city": "GURGAON", "group": "PRIMARY_CITIES"}, 
    {"state": "HARYANA", "city": "HISAR", "group": "SECONDARY_CITIES"}, 
    {"state": "HARYANA", "city": "PANCHKULA", "group": "SECONDARY_CITIES"}, 
    {"state": "HARYANA", "city": "PANIPAT", "group": "SECONDARY_CITIES"}, 
    {"state": "HARYANA", "city": "ROHTAK", "group": "SECONDARY_CITIES"}, 
    {"state": "HIMACHAL PRADESH", "city": "SHIMLA", "group": "SECONDARY_CITIES"}, 
    {"state": "JAMMU & KASHMIR", "city": "JAMMU", "group": "SECONDARY_CITIES"}, 
    {"state": "JHARKHAND", "city": "DHANBAD", "group": "SECONDARY_CITIES"}, 
    {"state": "JHARKHAND", "city": "RANCHI", "group": "SECONDARY_CITIES"}, 
    {"state": "KARNATAKA", "city": "BANGALORE", "group": "FOCUS"}, 
    {"state": "KARNATAKA", "city": "GULBARGA", "group": "SECONDARY_CITIES"}, 
    {"state": "KARNATAKA", "city": "HUBLI", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "ERNAKULAM", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "KANNUR", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "KOLLAM", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "KOTTAYAM", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "PALAKKAD", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "THIRUVANANTHAPURAM", "group": "SECONDARY_CITIES"}, 
    {"state": "KERALA", "city": "THRISSUR", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "BHOPAL", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "DEWAS", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "GWALIOR", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "INDORE", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "JABALPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "MADHYA PRADESH", "city": "RATLAM", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "AHMEDNAGAR", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "AKOLA", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "AMRAVATI", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "BOISAR", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "DOMBIVLI", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "JALGAON", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "MUMBAI", "group": "FOCUS"}, 
    {"state": "MAHARASHTRA", "city": "NANDED", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "NAVI MUMBAI", "group": "PRIMARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "PUNE", "group": "PRIMARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "SATARA", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "SOLAPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "TALEGAON", "group": "SECONDARY_CITIES"}, 
    {"state": "MAHARASHTRA", "city": "THANE", "group": "PRIMARY_CITIES"}, 
    {"state": "ORISSA", "city": "BERHAMPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "ORISSA", "city": "BHUBANESHWAR", "group": "SECONDARY_CITIES"}, 
    {"state": "ORISSA", "city": "ROURKELA", "group": "SECONDARY_CITIES"}, 
    {"state": "ORISSA", "city": "SAMBALPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "AMRITSAR", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "BATHINDA", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "JALANDHAR", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "LUDHIANA", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "MOHALI", "group": "SECONDARY_CITIES"}, 
    {"state": "PUNJAB", "city": "PATIALA", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "AJMER", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "ALWAR", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "BHILWARA", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "JAIPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "JODHPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "RAJASTHAN", "city": "KOTA", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "CHENNAI", "group": "FOCUS"}, 
    {"state": "TAMIL NADU", "city": "ERODE", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "NAGERCOIL", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "RAMANATHAPURAM", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "SALEM", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "TIRUCHIRAPALLI", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "TIRUPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "TAMIL NADU", "city": "VELLORE", "group": "SECONDARY_CITIES"}, 
    {"state": "TELANGANA", "city": "HYDERABAD", "group": "PRIMARY_CITIES"}, 
    {"state": "TELANGANA", "city": "SECUNDERABAD", "group": "PRIMARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "AGRA", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "ALLAHABAD", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "BADLAPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "BAREILLY", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "FAIZABAD", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "GHAZIABAD", "group": "PRIMARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "GREATER NOIDA", "group": "PRIMARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "LUCKNOW", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "MATHURA", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "MORADABAD", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "NOIDA", "group": "PRIMARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "SAHARANPUR", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTAR PRADESH", "city": "VARANASI", "group": "SECONDARY_CITIES"}, 
    {"state": "UTTARAKHAND", "city": "HARIDWAR", "group": "SECONDARY_CITIES"}, 
    {"state": "WEST BENGAL", "city": "ASANSOL", "group": "SECONDARY_CITIES"}, 
    {"state": "WEST BENGAL", "city": "HOWRAH", "group": "SECONDARY_CITIES"}, 
    {"state": "WEST BENGAL", "city": "KOLKATA", "group": "PRIMARY_CITIES"}
]

export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedCity: this.props.data, otherCitiesModalVisible: false}
        this.handleCitySelection = this.handleCitySelection.bind(this);
        this.openOtherCitiesModal = this.openOtherCitiesModal.bind(this);
        this.closeOtherCitiesModal = this.closeOtherCitiesModal.bind(this);
    }

    isInValidState() {
        return this.selectedCity() != '';
    }

    selectedCity() {
        return this.state.selectedCity || '';
    }

    handleCitySelection(event) {
        event.preventDefault();
        let value = event.target.dataset.value;
        this.setState({selectedCity: value});
        if (this.props.onCompletionOfAction) {
            this.props.onCompletionOfAction(value);
        }
    }

    render() {
        console.log(allCities);
        return (
            <div className={CityStyle.container}>
                {this.tier1CityOptions()}
                {this.otherCityOption()}
            </div>
        );
    }

    tier1CityOptions() {
        let radioItems = allCities.filter(function(city) {return city.group === 'FOCUS'}).map(
            (item) => (
                <RadioWithImageLabel 
                    key={item.city}
                    name="city" 
                    value={item.city}
                    label={titleCase(item.city)}
                    imageStyle= {CityStyle['icon' + titleCase(item.city).replace(' ', '')]}
                    containerStyle="col-xs-2 col-sm-2 col-md-2 float-none inline-block"
                    onChange={this.handleCitySelection}
                    checked={this.selectedCity() === item.city}
                />
            )
        );

        return radioItems
    }

    otherCityOption() {
        let listItems = allCities.map(
            (item) => (
                <li key={item.city} onClick={this.handleCitySelection}><a href="" data-value={item.city}>{titleCase(item.city)}</a></li>
            )
        );

        return (
            <div className="col-xs-2 col-sm-2 col-md-2 float-none inline-block">
                <label className={RadioStyle.labelContainer}>
                    <span className={CityStyle.iconOther}/>
                    <span className={RadioStyle.label}>
                        Other City
                    </span>
                    <TextField  value={this.selectedCity()} onClick={this.openOtherCitiesModal}/>
                    <Modal isOpen={this.state.otherCitiesModalVisible} className={ModalStyle.modal} overlayClassName={ModalStyle.overlay}  contentLabel="Other Cities Modal">
                        <a href="javascript:void(0)" className={ModalStyle.close} onClick={this.closeOtherCitiesModal}>X</a>
                        <TextField value={this.selectedCity()}/>
                        <div className={ListItemStyle.listContainer}>
                            <ul className={ListItemStyle.list}>{listItems}</ul>
                        </div>            
                    </Modal>    
                </label>
            </div>       
        )
                
    }

    openOtherCitiesModal() {
        this.setState({otherCitiesModalVisible: true});
    }

    closeOtherCitiesModal() {
        this.setState({otherCitiesModalVisible: false});
    }

    static allCities() {
        return [ 
        ]
    }
}
