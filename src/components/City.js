import React from 'react';

import Modal from 'react-modal';

import {TextField, RadioWithImageLabel} from '../widgets/HTMLInputElements'

import CityStyle from './City.scss';
import RadioStyle from '../widgets/Radio.scss'
import ModalStyle from '../widgets/Modal.scss';
import ListItemStyle from '../widgets/List.scss';

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
        let value = event.target.value;
        this.setState({selectedCity: value});
        if (this.props.onCompletionOfAction) {
            this.props.onCompletionOfAction(value);
        }
    }

    render() {
        return (
            <div className={CityStyle.container}>
                {this.tier1Cities()}
                {this.otherCityModalOption()}
            </div>
        );
    }

    tier1Cities() {
        let cityRadioItemsConfig = [
            {value: 'CHENNAI', label: 'Chennai', imageStyle: CityStyle.iconChennai},
            {value: 'MUMBAI', label: 'Mumbai', imageStyle: CityStyle.iconMumbai},
            {value: 'NEW DELHI', label: 'New Delhi', imageStyle: CityStyle.iconNewDelhi},
            {value: 'BANGALORE', label: 'Bangalore', imageStyle: CityStyle.iconBangalore}
        ];

        let radioItems = cityRadioItemsConfig.map(
            (item) => (
                <RadioWithImageLabel 
                    key={item.value}
                    name="city" 
                    value={item.value}
                    label={item.label}
                    imageStyle={item.imageStyle} 
                    containerStyle="col-xs-2 col-sm-2 col-md-2 float-none inline-block"
                    onChange={this.handleCitySelection}
                    checked={this.selectedCity() === item.value}
                />
            )
        );

        return radioItems
    }

    otherCityModalOption() {
        return (
            <div className="col-xs-2 col-sm-2 col-md-2 float-none inline-block">
                <label className={RadioStyle.labelContainer}>
                    <span className={CityStyle.iconOther}/>
                    <span className={RadioStyle.label}>
                        Other City
                    </span>
                    <TextField onClick={this.openOtherCitiesModal}/>
                    {this.otherCitiesModal()}
                </label>
            </div>            
        );
    }

    otherCitiesModal() {
        let cards = [
            {'cityname': 'Chennai', 'id': 1},
            {'cityname': 'Mumbai', 'id': 2},
            {'cityname': 'Pune', 'id': 3}
        ];

        let elements = cards.map((element) => {
            return (<li key={element.id}><a href="">{element.cityname}</a></li>);
        });

        return (
            <Modal isOpen={this.state.otherCitiesModalVisible} className={ModalStyle.modal} overlayClassName={ModalStyle.overlay}  contentLabel="Other Cities Modal">
                <a href="javascript:void(0)" className={ModalStyle.close} onClick={this.closeOtherCitiesModal}>X</a>
                <TextField />
                <div className={ListItemStyle.listContainer}>
                    <ul className={ListItemStyle.list}>{elements}</ul>
                </div>            
            </Modal>
        );
    }

    openOtherCitiesModal() {
        this.setState({otherCitiesModalVisible: true});
    }

    closeOtherCitiesModal() {
        this.setState({otherCitiesModalVisible: false});
    }
}
