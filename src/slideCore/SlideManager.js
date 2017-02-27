import { connect } from 'react-redux';

import * as Components from '../components/';
import StateMachine from '../utils/StateMachine.js';
import SlideView from './SlideView.js';
import {componentCompleteDataCollectedAction} from './SlideActions.js';

const slideManager = new class {
    constructor() {
        this.transitionHistory = [];
        this.fsm = this.createStateMachine();
        this.fsm.init();
        this.update();
    }

    previousSlide = () => {
        this.fsm.goBack();
        this.update();
    }

    nextSlide = (model) => {
        if(!this.fsm['next'](model)) {
            console.log("Error in transition the Slide from " + currentSlide);
        }
        console.log("Successfully transitioned to the new Slide " + this.fsm.current);
        this.update();
    }

    nextSlideIfAllowed = (model) => {
        //TODO: Check the ALLOW
        this.nextSlide(model);
    }

    update() {
        //TODO: Configure the properties of the Component.
        this.slideComponent = eval("(Components." + this.fsm.current + ")");
        this.slideTitle = this.slideComponent.name;
        this.slideModelKey = this.slideComponent.name;
    }

    createStateMachine() {
        let fsm = StateMachine.create(slideTransitionRules);
        let transitionHistory = this.transitionHistory;
        fsm.onafterevent = function(event, from, to, args) {
            transitionHistory.push(from)            
        }
        fsm.goBack = function() {
            var previousState = transitionHistory.pop();
            this.current = previousState;
            return previousState;
        }

        return fsm;
    }
};

const mapStateToProps = (state) => {
    return {
        title: slideManager.slideTitle,
        component: slideManager.slideComponent,
        modelKey: slideManager.slideModelKey,
        navigateToPreviousSlide: slideManager.previousSlide,
        navigateToNextSlide: slideManager.nextSlide,
        navigateToNextSlideIfAllowed: slideManager.nextSlideIfAllowed
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
