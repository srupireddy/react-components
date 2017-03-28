import React from 'react';
import Modal from 'react-modal';

import BaseComponent from '../BaseComponent';
import {DecorateWithImageAndLabel, DecorateInputFieldWithSymbol} from '../../widgets/Decorator';

import CityStyle from './City.scss';
import ModalStyle from '../../widgets/Modal.scss';
import SpriteStyle from '../../widgets/Sprite.scss'

const titleCase = require('title-case');

export default class City extends BaseComponent {
    static propTypes = {
        ...BaseComponent.propTypes,
        variant: React.PropTypes.oneOf(['Resident', 'Property'])
    };

    static defaultProps = {
        variant: 'Resident'
    }

    state = {
        city: this.props.value,
        country: null
    }

    render() {
        var variantStyle = this.props.variant == 'Resident' ? 'iconResidence' : 'iconProperty';
        return (
            <div className={CityStyle.cityCompContainer}>
                <TopTierCities selectedCity={this.state.city} onChange={this.handleCitySelection} variantStyle={variantStyle}/>
                <OtherCities selectedCity={this.state.city} onChange={this.handleCitySelection} variantStyle={variantStyle}/>
            </div>
        );
    }

    handleCitySelection = (city, country) => {
        this.setState({city, country}, () => {this.notifyCompletion()});
    }

    getData() {
        //TODO: Fix this so that we dont need to hardcode the residentCountry attribute name
        return {[this.props.modelKey]: this.state.city, 'residentCountry': this.state.country};
    }

    validate() {
        if (this.state.city) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please select a city! We’ve got tons!");
            return false;
        }
    }
}

const TopTierCities = ({selectedCity, variantStyle, onChange}) => {
    let radioItems = AllCities.filter(function(city) {return city.group === 'FOCUS'}).map(
        (item) => {
            var key = item.city;
            var label = titleCase(key);
            var icon = CityStyle[variantStyle + label.replace(/ /g, '')];

            return (
                <DecorateWithImageAndLabel key={key} imageStyle={icon} label={label} containerStyle="col-xs-2 col-sm-2 col-md-2 radio-col" >
                    <input type="radio" name='city' value={key} onChange={(e) => {e.preventDefault(); onChange(key, 'INDIA')}} checked={selectedCity === key} data-value={key} />
                </DecorateWithImageAndLabel>
            );
        }
    );

    return <div style={{display: 'inline'}}>{radioItems}</div>;    
}

class OtherCities extends React.Component {
    static maxNumberOfColumns = 6;
    static preferredNumberOfRows = 5;

    state = {
        otherCitiesModalVisible: false,
        value: this.props.selectedCity || '',
        selectedCity: this.props.selectedCity || '',
        availableCities: AllCities
    }

    render() {
        let onChange = this.props.onChange;
        let listItems = [];
        var prevState = null;
        this.state.availableCities.forEach(function(item, index) {
            if (!prevState || item.state != prevState) {
                prevState = item.state;
                listItems.push(<li key={'State-' + item.state} className={CityStyle.listSectionHeading}>{titleCase(item.state)}</li>)
            }
            listItems.push(<li key={item.city} onClick={(e) => {e.preventDefault(); onChange(item.city, 'INDIA')}}><a href="">{titleCase(item.city)}</a></li>);
        })

        var selectedCity = this.props.selectedCity;
        var icon = CityStyle[this.props.variantStyle + 'Other'];
        var columnCount = Math.min(OtherCities.maxNumberOfColumns, parseInt(listItems.length/OtherCities.preferredNumberOfRows));

        return (
            <DecorateWithImageAndLabel containerStyle="col-xs-2 col-sm-2 col-md-2 radio-col" imageStyle={icon} label="Other City">
                <input type="text" value={this.state.selectedCity} placeholder="Your city here" onClick={this.openOtherCitiesModal} onChange={onChange}/>

                <Modal isOpen={this.state.otherCitiesModalVisible} className={ModalStyle.modal} overlayClassName={ModalStyle.overlay}  contentLabel="Other Cities Modal">
                    <a href="javascript:void(0)" className={ModalStyle.close} onClick={this.closeOtherCitiesModal}>X</a>
                    <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolBuilding}>
                        <input type="text" value={this.state.value} placeholder="ENTER CITY NAME" onChange={this.filterAvailableCities} style={{textTransform: 'uppercase'}}/>
                    </DecorateInputFieldWithSymbol>
                    <div className={CityStyle.listContainer}>
                        <ul className={CityStyle.list} style={{columnCount}}>{listItems}</ul>
                        <ul className={CityStyle.list}>
                            <li className={CityStyle.listSectionHeading}>Others</li>
                            <li><a onClick={(e) => {e.preventDefault(); onChange('Unknown', 'Other')}}>I live outside India</a></li>
                        </ul>
                    </div>
                </Modal>    
            </DecorateWithImageAndLabel>
        )       
    }

    openOtherCitiesModal = () => {
        this.setState({otherCitiesModalVisible: true});
    }

    closeOtherCitiesModal = () => {
        this.setState({otherCitiesModalVisible: false});
    }

    filterAvailableCities = (event) => {
        let value = event.target.value.toUpperCase();
        let availableCities = AllCities.filter((item) => item.city.indexOf(value) > -1);
        
        if (availableCities.length == 0) {
            // TODO: Fire a AJAX call to get other cities
        }

        this.setState({value, availableCities: availableCities})
    }
}

//TODO: Temporarily hardcoded here. Actually this should be given by the server.  
const AllCities = [
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
];
