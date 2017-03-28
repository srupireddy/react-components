import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';
import ActionHandler from '../components/ActionHandler';
import {storeDataAndMoveToNextSlide} from './SlideActions.js';

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
        return (
            <div className={SlideStyle.slideContainer}>
                <div className={SlideStyle.slideLongHeader}><h2>Compare Home Loan Offers from Top Lenders. Apply Online and Get e-Approved Instantly.</h2></div>
                <div className="container">
                    <div className={SlideStyle.slideHeader}>
                        {this.props.title}
                        {this.state.errorMessage &&
                            <span className={SlideStyle.errorContainer}>
                                <span className={SlideStyle.errorContainerInner}>
                                <span className={SlideStyle.errorImage}><img src="https://www.bankbazaar.com/images/icon-error.png"/></span>
                                <span className={SlideStyle.errorMessage}>{this.state.errorMessage}</span>
                                </span>
                            </span>
                        }
                    </div>
                    {/*<ReactCSSTransitionGroup
                            transitionName="slide"
                            transitionEnterTimeout={1000}
                            component="div"
                            className="carousel__slide"
                            transitionLeaveTimeout={100}>*/}
                        <div className={["clearfix", SlideStyle.slideContainerInner].join(' ')} key={this.props.modelKey} >
                            <this.props.componentClass 
                                    ref={(instance) => this.activeComponentInstance = instance}
                                    {...this.props.componentProps}
                                    modelKey={this.props.modelKey}
                                    handler={this.componentActionHandler}
                                    value={value}
                                    style={{margin: '20px auto'}}
                                />
                        </div>
                    {/*</ReactCSSTransitionGroup>*/}
                    <div className={SlideStyle.slideControlPrev}>
                        <button type="button" className={SlideStyle.icon} onClick={this.props.goBackToPreviousSlide} style={{display: this.props.canGoBack ? "" : "none" }}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button type="button" className={SlideStyle.icon} onClick={this.gotoNextSlideIfAllowed} disabled={!this.props.canGoForward}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn" onClick={this.gotoNextSlideIfAllowed} disabled={!this.props.canGoForward}>
                            Continue
                        </button>
                        {this.props.forceNextButtonClick &&
                            <img src="https://www.bankbazaar.com/images/landing/pointing-arrow.gif" style={{position: 'absolute', marginTop: '-12px', overflow: 'hidden', display: 'inline'}}/>
                        }
                    </div>
                </div>
            </div>
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