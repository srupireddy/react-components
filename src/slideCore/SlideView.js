import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import DesktopLayout from './SlideViewDesktopLayout.js';
import ActionHandler from '../components/ActionHandler.js';
import { storeDataAndMoveToNextSlide } from './SlideActions.js';

class SlidePresenter extends React.Component {
    state = {
        errorMessage: null
    }

    constructor(props) {
        super(props);

        this.componentActionHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (data) => {
                this.componentActionHandler.clearError();
                if (!this.props.forceNextButtonClick) {
                    this.props.storeDataAndMoveToNextSlide(data);
                }
            }

            showError = (message) => {
                this.setState({errorMessage: message});
            }

            clearError = () => {
                this.setState({errorMessage: null});
            }
        }(props);
    }

    render() {
        let value = this.props.prefillData[this.props.modelKey];
        let component = (
            <this.props.componentClass 
                    ref={(instance) => this.activeComponentInstance = instance}
                    {...this.props.componentProps}
                    modelKey={this.props.modelKey}
                    handler={this.componentActionHandler}
                    value={value}
                    style={{margin: '20px auto'}}
                />
            );

        return (
            <DesktopLayout {...this.props} gotoNextSlideIfAllowed={this.gotoNextSlideIfAllowed} errorMessage={this.state.errorMessage}>
                {component}
            </DesktopLayout>
        )
    }

    gotoNextSlideIfAllowed = () => {
        if (this.activeComponentInstance.validate()) {
            this.props.storeDataAndMoveToNextSlide(this.activeComponentInstance.getData());
        } else {
            // Show the error message
            console.log("Oops... The current slide is not completed.");
        }
    }
}

const mapReduxStateToProps = (state, ownProps) => {
    let {activeSlide, model} = state.slide.main.present;
    console.log("Going to render the Slide with ID = " + activeSlide);

    let slideManager = ownProps.slideManager;
    let slideConfig = slideManager.configForSlideWithKey(activeSlide, model);

    return {
        title: slideConfig.title,
        componentClass: slideConfig.componentClass,
        componentProps:  slideConfig.componentProps,
        modelKey: activeSlide,
        prefillData: state.slide.prefillData,
        forceNextButtonClick: slideConfig.autoNext != undefined && !slideConfig.autoNext,
        canGoBack: state.slide.main.past.length > 0,
        canGoForward: true
    }
}

const mapReduxDispatchToProps = (dispatch, ownProps) => {
    return {
        storeDataAndMoveToNextSlide: (data) => {
            dispatch(storeDataAndMoveToNextSlide(data));
        },
        goBackToPreviousSlide: () => {
            dispatch(UndoActionCreators.undo());
        }
    }
}

const SlideView = connect(mapReduxStateToProps, mapReduxDispatchToProps)(SlidePresenter);
export default SlideView;