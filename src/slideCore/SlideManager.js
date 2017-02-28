import { connect } from 'react-redux';

import * as Components from '../components/';
import StateMachine from '../vendor/state-machine.js';
import SlideView from './SlideView.js';
import {updateModelAndShowNextSlide, goBackToPreviousSlide} from './SlideActions.js';

const slideManager = new class {
    constructor() {
        this.fsm = this.createStateMachine();
    }

    initialSlide = () => {
        return this.fsm.current;
    }

    peekIntoNextSlide = (currentSlide, model) => {
        // Just peeks into the next possible state (slide) without affecting the State Machine (FSM).
        return this.fsm['peek.next'](currentSlide || this.fsm.current, model);
    }
    
    createStateMachine() {
        let fsm = StateMachine.create(slideTransitionRules);        
        fsm.init();
        return fsm;
    }
};

const mapStateToProps = (state) => {
    let activeSlide = state.slide.transitions.activeSlide || slideManager.initialSlide();
    let slideComponent = eval("(Components." + activeSlide + ")");
    let slideTitle = slideComponent.name;
    let slideModelKey = slideComponent.name;

    return {
        title: slideTitle,
        component: slideComponent,
        modelKey: slideModelKey,
        prefillData: state.slide.prefillData,
        navigateToPreviousSlide: slideManager.previousSlide,
        navigateToNextSlide: slideManager.nextSlide,
        navigateToNextSlideIfAllowed: slideManager.nextSlideIfAllowed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentDataCollected: (key, payload) => {
            dispatch(updateModelAndShowNextSlide(key, payload, slideManager));
        },
        goBackToPreviousSlide: () => {
            dispatch(goBackToPreviousSlide(slideManager));   
        }
    }
}

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideView);
export default Slide;
