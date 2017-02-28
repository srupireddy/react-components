import { connect } from 'react-redux';

import * as Components from '../components/';
import StateMachine from '../utils/StateMachine.js';
import SlideView from './SlideView.js';
import {completeComponentDataCollectionAndConsequences, goBackToPreviousSlide} from './SlideActions.js';

const slideManager = new class {
    constructor() {
        this.fsm = StateMachine.create(slideTransitionRules);
        this.fsm.init();
        this.update();
    }

    nextSlide = (model) => {
        if(!this.fsm['next'](model)) {
            console.log("Error in transition the Slide from " + currentSlide);
        }
        console.log("Successfully transitioned to the new Slide " + this.fsm.current);
        this.update();
    }
    
    currentSlide() {
        return this.fsm.current;
    }

    setCurrentSlide(slide) {
        this.fsm.current = slide;
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
        prefillData: state.slide.prefillData,
        navigateToPreviousSlide: slideManager.previousSlide,
        navigateToNextSlide: slideManager.nextSlide,
        navigateToNextSlideIfAllowed: slideManager.nextSlideIfAllowed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentDataCollected: (key, payload) => {
            dispatch(completeComponentDataCollectionAndConsequences(key, payload, slideManager));
        },
        gotoNextSlideIfAllowed: () => {
            dispatch(completeComponentDataCollectionAndConsequences(key, payload, slideManager));
        },
        goBackToPreviousSlide: () => {
            dispatch(goBackToPreviousSlide(slideManager));
            
        }
    }
}

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideView);
export default Slide;
