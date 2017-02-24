import { connect } from 'react-redux';
import {Store} from 'redux';

import * as Components from '../components/';
import StateMachine from '../fsm/state-machine.js';
import SlideView from './SlideView.js';
import {componentCompleteDataCollectedAction} from './SlideActions.js';

const slideManager = new class {
    constructor() {
        this.fsm = StateMachine.create(slideTransitionRules);
        this.fsm.init();
        this.update();
    }

    previousSlide = () => {
        
    }

    nextSlide = () => {
        if(!this.fsm['next']({})) {
            console.log("Error in transition the Slide from " + currentSlide);
        }
        console.log("Successfully transitioned to the new Slide " + this.fsm.current);
        this.update();
    }

    update() {
        //TODO: Configure the properties of the Component.
        this.slideComponent = eval("(Components." + this.fsm.current + ")");
        this.slideTitle = this.slideComponent.name;
        this.slideModelKey = this.slideComponent.name;
    }
};

const mapStateToProps = (state) => {
    return {
        title: slideManager.slideTitle,
        component: slideManager.slideComponent,
        modelKey: slideManager.slideModelKey,
        navigateToPreviousSlide: slideManager.previousSlide,
        navigateToNextSlide: slideManager.nextSlide,
        navigateToNextSlideIfAllowed: slideManager.nextSlide
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentCompleteDataCollected: (modelKey, payload) => {
            dispatch(componentCompleteDataCollectedAction(modelKey, payload))
        }
    }
}

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideView);
export default Slide;
