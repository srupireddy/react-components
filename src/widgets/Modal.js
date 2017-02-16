import React from 'react';

import ReactModal from 'react-modal';

import ListItem from './ListItem.js'

import {TextField, IconTextField} from '../widgets/TextField.js'

class CityModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
       return (
            <div>
            <TextField onClick={this.handleOpenModal}/>
            <ReactModal isOpen={this.state.showModal}>
                    <a href="javascript:void(0)" onClick={this.handleCloseModal}>Close</a>
                    <IconTextField />

                    <ListItem />

            </ReactModal>
            </div>
            );
         }
}

export default CityModal;