import React from 'react';
import Tooltip from 'rc-tooltip';
import BaseComponent from '../BaseComponent';
import {DecorateInputFieldWithSymbol} from '../../widgets/Decorator.js';
import SpriteStyle from '../../widgets/Sprite.scss'
import ContactMeStyle from './ContactMe.scss';

export default class ContactMe extends BaseComponent {
    render() {
        return (
            <div className={ContactMeStyle.contactContainer}>
            <div className={ContactMeStyle.contactInnerContainer}>
            <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolName}>
                <input type="text" placeholder="My first name"/>
            </DecorateInputFieldWithSymbol>
            </div>
            <div className={ContactMeStyle.contactInnerContainer}>
            <Tooltip placement="right" trigger='focus' defaultVisible={true} overlay={<span>Info is optional</span>}>
                <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolMobile}>
                    <input type="number" placeholder="My mobile (optional)"/>
                </DecorateInputFieldWithSymbol>
            </Tooltip>
            </div>
            <div className={ContactMeStyle.contactInnerContainer}>
            <Tooltip placement="right" trigger='focus' defaultVisible={true} overlay={<span>Info is optional</span>}>
                <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolEmail}>
                    <input type="email" placeholder="My email (optional)"/>
                </DecorateInputFieldWithSymbol>
            </Tooltip>
            </div>
            <div className={ContactMeStyle.contactInfo}>We don't spam or sell your details to annoying people.</div>
            <div className={ContactMeStyle.contactInfo}><input type="checkbox"/> I authorize BankBazaar to call/SMS/email me about its products. I have accepted the terms of the <a href="https://www.bankbazaar.com/privacy-policy.html" target="_blank" className="">Privacy Policy</a> . I am aware that credit approval is at the sole discretion of the bank.</div>
        </div>
        );
    }

    getData() {
        return {};
    }

    validate() {
        return true;            
    }

}