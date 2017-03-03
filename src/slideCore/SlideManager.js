import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import * as Components from '../components/';
import StateMachine from '../vendor/state-machine.js';
import SlideView from './SlideView.js';
import {nextSlideAction} from './SlideActions.js';

const slideManager = new class {
    constructor() {
        this.fsm = this.createStateMachine();
    }

    initialSlide = () => {
        return this.fsm.current;
    }

    peekIntoNextSlide = (currentSlide, model) => {
        // Just peeks into the next possible state (slide) without affecting the State Machine (FSM).
        var nextSlide = this.fsm['peek.next'](currentSlide || this.fsm.current, model);
        if(this.isLastSlide(nextSlide)) {
            this.handleFormSubmit(model);
        } else {
            return nextSlide;
        }
    }

    isLastSlide(state) {
        if(state == 'End') {
            return true;
        }
        return false;
    }

    handleFormSubmit(model) {
        var formName = 'slideForm';
        this.addFormElements(formName, model);
        document.getElementById(formName).submit();
    }

    addFormElements(formName, model) {
        for(var key in model) {
            if(model.hasOwnProperty(key)) {
                var elementName = slideConfigs[key].mapping;
                var elementValue = model[key];
                var inputElement = this.addElementToForm(elementName, elementValue);

                document.getElementById(formName).appendChild(inputElement);
            }
        }
    }

    addElementToForm(modelPath, value) {
        var inputElement = document.createElement("input");
        inputElement.setAttribute("name", modelPath);
        inputElement.setAttribute("value", value);
        inputElement.setAttribute("type", "hidden");
        return inputElement;
    }

    createStateMachine() {
        let fsm = StateMachine.create(slideTransitionRules);
        fsm.init();
        return fsm;
    }
};

const mapStateToProps = (state) => {
    let activeSlide = state.slide.main.present.activeSlide || slideManager.initialSlide();
    let slideComponent = eval("(Components." + activeSlide + ")");
    let slideTitle = slideComponent.name;
    let slideModelKey = slideComponent.name;

    return {
        title: slideTitle,
        component: slideComponent,
        modelKey: slideModelKey,
        prefillData: state.slide.prefillData,
        canGoBack: state.slide.main.past.length > 0,
        canGoForward: true
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentDataCollected: (key, payload) => {
            dispatch(nextSlideAction(key, payload, slideManager));
        },
        goBackToPreviousSlide: () => {
            dispatch(UndoActionCreators.undo());
        }
    }
}

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideView);
export default Slide;
