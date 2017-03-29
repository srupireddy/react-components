import React from 'react';
import Tooltip from 'rc-tooltip';
import Autosuggest from 'react-autosuggest';
import 'whatwg-fetch';

import BaseComponent from '../BaseComponent';
import {DecorateInputFieldWithSymbol} from '../../widgets/Decorator.js';
import ExistingLoanDetailsStyle from './ExistingLoanDetails.scss';
import SpriteStyle from '../../widgets/Sprite.scss'

export default class Existingloan extends BaseComponent {
    state = {
        selectedExistingloan: this.props.value || '',
        suggestions: []
    }

    render() {
        const { selectedExistingloan, suggestions } = this.state;
        return (
            <div className={ExistingLoanDetailsStyle.outerContainer}>
                <div className={ExistingLoanDetailsStyle.innerContainer}>
                    <Tooltip placement="rightTop" trigger='focus' defaultVisible={true} overlay={<span>The name of your current home-loan provider</span>}>
                        <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolBank}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionSelected={this.handleExistingloanSelection}
                                shouldRenderSuggestions={(value) => value.trim().length > 2}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => this.setState({suggestions: []})}
                                getSuggestionValue={suggestion => suggestion}
                                renderSuggestion={(suggestion) => (<div>{suggestion}</div>)}
                                inputProps={{value: selectedExistingloan, placeholder:'Start typing here..', onChange: this.onUserTypingValue}}
                            />
                        </DecorateInputFieldWithSymbol>
                    </Tooltip>
                </div>
                <div className="font-xxlg" style={{margin: "45px auto"}}>
                    Outstanding balance on existing home loan
                </div>
                <div className={ExistingLoanDetailsStyle.innerContainer}>
                    <Tooltip placement="rightTop" trigger='focus' defaultVisible={true} overlay={<span>Current outstanding balance on the home loan you wish to transfer.</span>}>
                        <DecorateInputFieldWithSymbol iconStyle={SpriteStyle.symbolRupee}>
                            <input type="number" value={this.state.value} placeholder="Rs." onChange={this.handleTextFieldValueChange}/>
                        </DecorateInputFieldWithSymbol>
                    </Tooltip>
                </div>
            </div>
        );
    }

    handleExistingloanSelection = (event, {suggestion, suggestionValue}) => {
        this.setState({selectedExistingloan: suggestionValue}, () => {this.notifyCompletion()});
    }

    onUserTypingValue = (event, { newValue }) => {
        this.setState({selectedExistingloan: newValue});
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();

        //TODO: Hack to get the data to work in standalone mode. When integrating with Struts this should be made as /autoComplete.html
        let url = 'https://www.bankbazaar.com/autoComplete.html?ajax=true&type=BANK&jsonp_callback=bbCallback&query=' + inputValue;
        let self = this;
        fetch(url)
            .then(function(response) {
                return response.text()
            }).then(function(jsonpCallbackString) {
                return JSON.parse(jsonpCallbackString.replace('bbCallback(', '').slice(0, -1))
            }).then(function(options) {
                self.setState({suggestions: options})
            }).catch(function(ex) {
                console.log('Fetching/Parsing the data for the list of available Employers failed', ex)
            });
    };


    getData() {
        return {[this.props.modelKey]: this.state.selectedExistingloan};
    }

    validate() {
        if (this.state.selectedExistingloan) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick an Existingloan");
            return false;
        }
    }    
}