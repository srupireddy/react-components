import {Map} from 'immutable';

import * as Components from '../components/';
import StateMachine from '../vendor/state-machine.js';

export default class SlideManager {
    static fsmEventName = 'next';
    static fsmPeekEventName = 'peek.' + SlideManager.fsmEventName;

    constructor(config) {
        this.slidesConfig = this.createSlidesConfigMap(config.slides);
        this.fsm = this.createStateMachine(config.firstSlide, config.transitions);
    }

    firstSlide() {
        return this.fsm.current;
    }

    peekIntoNextSlide(model, currentSlide) {
        let nextPossibleSlide = this.fsm[SlideManager.fsmPeekEventName](currentSlide, model);
        if(this.isLastSlide(nextPossibleSlide)) {
            this.handleFormSubmit(model);
        } else {
            return nextPossibleSlide;
        }
    }

    // navigateToNextSlide(model) {
    //     this.fsm[SlideManager.fsmEventName](model);
    // }

    createSlidesConfigMap(slides) {
        var config = {};
        slides.forEach(function(slide, index){
            config[slide.modelKey] = slide;
        });
        return config;
    }

    createStateMachine(firstSlideKey, transitions) {
        let events = transitions.map((e) => Object.assign({}, e, {name: e['trigger']}));
        return StateMachine.create({initial: firstSlideKey, events: events});
    }

    configForSlideWithKey = (key, model) => {
        let config = Map(this.slidesConfig[key]).toJS();
        config.componentClass = eval("(Components." + config.componentName + ")");
        Object.keys(config.componentProps || []).forEach(function(prop, index) {
            if (typeof(config.componentProps[prop]) == 'function') {
                config.componentProps[prop] = config.componentProps[prop](model);
            }
        });

        return config;
    }

    /***TODO: REFACTOR THESE METHODS ****/
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
                var elementName = this.configForSlideWithKey(key).mapping;
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
}
