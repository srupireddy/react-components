import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {Map} from 'immutable';

import * as Components from '../components/';
import StateMachine from '../vendor/state-machine.js';
import SlideView from './SlideView.js';
import {nextSlideAction} from './SlideActions.js';
import CollectionUtils from '../utils/CollectionUtils';
import FormUtils from '../utils/FormUtils';

const fsmEventName = 'next';
const fsmPeekEventName = 'peek.' + fsmEventName;

const slideManager = new class {
    constructor() {
        let config = slideManagerConfig;    // A Global Variable defined elsewhere

        this.firstSlideKey = config.firstSlide
        this.slidesConfig = this.createSlidesConfigMap(config.slides);
        this.fsm = this.createStateMachine(this.firstSlideKey, config.transitions);
    }

    peekIntoNextSlide = (currentSlide, model) => {
        var nextSlideKey = this.fsm[fsmPeekEventName](currentSlide || this.fsm.current, model);
        if(this.isLastSlide(nextSlideKey)) {
            FormUtils.submitFormAfterAppendingModel(document.getElementById('slideForm'), model);
        } else {
            return nextSlideKey;
        }
    }

    isLastSlide(state) {
        if(state == 'End') {
            return true;
        }
        return false;
    }

    createSlidesConfigMap(slides) {
        var config = {};
        slides.forEach(function(slide, index){
            config[slide.modelKey] = slide;
        });
        return config;
    }

    createStateMachine(firstSlideKey, transitions) {
        return StateMachine.create({initial: firstSlideKey, events: transitions});
    }

    configForSlideWithKey = (key, model) => {
        let config = Map(this.slidesConfig[key]).toJS();
        config.componentClass = eval("(Components." + config.componentName + ")");
        Object.keys(config.properties || []).forEach(function(prop, index) {
            if (typeof(config.properties[prop]) == 'function') {
                config.properties[prop] = config.properties[propkey](model);
            }
        });

        return config;
    }
};

const mapStateToProps = (state) => {
    let activeSlideKey = state.slide.main.present.activeSlide || slideManager.firstSlideKey;
    console.log("Going to render the Slide with ID = " + activeSlideKey);

    let activeModel = state.slide.main.present;
    let slideConfig = slideManager.configForSlideWithKey(activeSlideKey, activeModel);

    return {
        title: slideConfig.title,
        componentClass: slideConfig.componentClass,
        componentProps:  slideConfig.properties,
        modelKey: activeSlideKey,
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
