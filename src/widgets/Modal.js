import React from 'react';

import ReactModal from 'react-modal';

import ListItem from './ListItem.js'

import {TextField, IconTextField} from '../widgets/TextField.js'

import ModalStyle from './Modal.scss';

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
            <ReactModal isOpen={this.state.showModal} className={ModalStyle.Modal} overlayClassName={ModalStyle.Overlay}>
                    <a href="javascript:void(0)" className={ModalStyle.close} onClick={this.handleCloseModal}>X</a>
                    <IconTextField />
                    <ListItem />
            </ReactModal>
            </div>
            );
         }
}

export default CityModal;