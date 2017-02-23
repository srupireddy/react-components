import * as Components from '../components/';
import StateMachine from '../fsm/state-machine.js';
import { createStore } from 'redux';
import {reducer} from '../reducers/reducer.js';

export default class SlideManager {
    constructor(rules) {
        this.fsm = StateMachine.create(rules);

        this.moveSlide({}, '', 'init');
        this.store = createStore(reducer, this.viewComponent());
    }

    datastore = () => {
        return this.store;
    }

    viewComponent = () => {
        let component = this.convertToComponent(this.fsm.current);
        return this.constructViewState(component);
    }

    moveSlide = (model, currentSlide, event) => {
        // invoke the function associated with event
        if(!this.fsm[event](model)) {
            console.log("Error in slide transition from "+currentSlide);
        }
        var nextComponent = this.convertToComponent(this.fsm.current);
        console.log("currentSlide:"+this.fsm.current);
        return this.constructViewState(nextComponent);
    }

    constructViewState = (component) => {
        var label = "Hello"; //slideConfigs[component.name].label;
        //construct the view state. As of now, this holds only one configurable property i.e. label.
        var nextComponent = {currentState: {component:component, label:label}, slideManager: this};
        return nextComponent;
    }

    previous = () => {
        var componentName = this.convertToComponent(this.fsm.previous());
        return this.constructViewState(componentName);
    }

    convertToComponent(name) {
        return eval("(Components."+name+")");
    }

}
