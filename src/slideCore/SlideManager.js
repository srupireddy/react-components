import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import * as Components from '../components/';
import StateMachine from '../vendor/state-machine.js';
import SlideView from './SlideView.js';
import {nextSlideAction} from './SlideActions.js';

const fsmEventName = 'next';
const fsmPeekEventName = 'peek.' + fsmEventName;

const slideManager = new class {
    constructor() {
        let config = slideManagerConfig;

        this.firstSlide = config.firstSlide;
        this.slidesConfig = this.createSlidesConfigMap(config.slides);
        this.fsm = this.createStateMachine(this.firstSlide, config.transitions);
    }

    configForSlide = (key) => {
        return this.slidesConfig[key];
    }

    peekIntoNextSlide = (currentSlide, model) => {
        // Just peeks into the next possible state (slide) without affecting the State Machine (FSM).
        var nextSlide = this.fsm[fsmPeekEventName](currentSlide || this.fsm.current, model);
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

    createSlidesConfigMap(slides) {
        var config = {};
        slides.forEach(function(slide, index){
            config[slide.modelKey] = slide;
        });
        return config;
    }

    createStateMachine(firstSlide, transitions) {
        let events = transitions.map((rule) => {rule['name'] = fsmEventName; return rule;});
        let fsmConfig = {initial: firstSlide, events: events};
        let fsm = StateMachine.create(fsmConfig);
        return fsm;
    }

    loadComponentClass(name) {
        return eval("(Components." + name + ")");
    }
};

const mapStateToProps = (state) => {
    let activeSlideId = state.slide.main.present.activeSlide || slideManager.firstSlide;
    console.log("Going to render the Slide with ID = " + activeSlideId);

    let slideConfig = slideManager.configForSlide(activeSlideId);
    let componentClass = slideManager.loadComponentClass(slideConfig.component);

    return {
        title: slideConfig.title,
        componentClass: componentClass,
        componentProps:  slideConfig.properties,
        modelKey: activeSlideId,
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
