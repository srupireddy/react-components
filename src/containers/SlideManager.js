import * as Components from '../components/';
import StateMachine from '../fsm/state-machine.js';
import { connect } from 'react-redux';

import SlideView from './SlideView.js';

const augmentToModelAction = (key, payload) => {
    return {type: 'AUGMENT_MODEL', modelKey: name, value: payload};
}

const previousSlideAction = () => {
    return {type: 'PREVIOUS_SLIDE'};
}

const nextSlideAction = () => {
    return {type: 'NEXT_SLIDE'};
}

export const slideStateReducer = (state = {}, action) => {
    console.log("In Reducer: State = " + state + " : Action = " + action);
    switch (action.type) {
        case 'AUGMENT_MODEL':
            return state;
        case 'PREVIOUS_SLIDE':
            return state;
        case 'NEXT_SLIDE':
            return state;
        default:
            return state;
    }
}

const slideManager = new class {
    constructor() {
        this.fsm = StateMachine.create(slideTransitionRules);
        this.fsm.init();
    }

    currentSlideComponent = () => {
        //TODO: Configure the properties of the Component.
        return Components.Gender;
    }

    currentSlideTitle = () => {
        return "My Gender";
    }
};

const mapStateToProps = (state) => {
    return {
        modelKey: 'Gender',
        title: slideManager.currentSlideTitle(),
        component: slideManager.currentSlideComponent()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        augmentModel: (modelKey, payload) => {
            dispatch(augmentToModelAction(modelKey, payload))
        }
    }
}

const Slide = connect(mapStateToProps, mapDispatchToProps)(SlideView);
export default Slide
