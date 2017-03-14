import React from 'react';
import Tooltip from 'rc-tooltip';
import Autosuggest from 'react-autosuggest';
import 'whatwg-fetch';

import BaseComponent from '../BaseComponent';

import BuilderStyle from './Builder.scss';

export default class Builder extends BaseComponent {
    state = {
        selectedBuilder: this.props.value || '',
        suggestions: []
    }

    render() {
        const { selectedBuilder, suggestions } = this.state;
        return (
            <div className={BuilderStyle.builderContainer}>
                <div className={BuilderStyle.builderContainerInner}>
                <Tooltip placement="right" trigger='focus' defaultVisible={true} overlay={<span>Enter the builder and project name Example: DLF BUILDING INDIA - COMMANDERS COURT</span>}>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionSelected={this.handleBuilderSelection}
                        shouldRenderSuggestions={(value) => value.trim().length > 2}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={() => this.setState({suggestions: []})}
                        getSuggestionValue={suggestion => suggestion}
                        renderSuggestion={(suggestion) => (<div>{suggestion}</div>)}
                        inputProps={{value: selectedBuilder, onChange: this.onUserTypingValue}}
                    />
                </Tooltip>
                </div>
            </div>
        );
    }

    handleBuilderSelection = (event, {suggestion, suggestionValue}) => {
        this.setState({selectedBuilder: suggestionValue}, () => {this.notifyCompletion()});
    }

    onUserTypingValue = (event, { newValue }) => {
        this.setState({selectedBuilder: newValue});
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();

        //TODO: Hack to get the data to work in standalone mode. When integrating with Struts this should be made as /autoComplete.html
        let url = 'https://www.bankbazaar.com/autoComplete.html?ajax=true&type=BUILDER&jsonp_callback=bbCallback&query=' + inputValue;
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
        return this.state.selectedBuilder;
    }

    validate() {
        if (this.state.selectedBuilder) {
            return true;            
        } else {
            this.props.handler.showError("Uh-oh! Please pick an Builder");
            return false;
        }
    }    
}