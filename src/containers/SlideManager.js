import * as Components from '../components/';
import StateMachine from '../fsm/state-machine.js';

var slideTransitionRules;
var fsm;
var context;
var model;
var slideConfigs = {City:{label:'Where do you live currently?'}, Gender:{label:'My gender'}, Experience:{label:'Your joining date and total work experience'}, Employment:{label:'Type of employment'}, ProfitAfterTax:{label:'Latest year\'s profit after tax'}, Salary:{label:'Gross fixed monthly income'}};

export default class SlideManager {

    static loadSlideTransitionRules(context) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'transitions/sample-transition.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                slideTransitionRules = xhr.responseText;
            }
        };
        xhr.send(null);
    }

    static initialize(context, model) {
        this.context = context;
        this.model = model;
        SlideManager.loadSlideTransitionRules(context);
        var slideTransitions = SlideManager.convertToObject(slideTransitionRules);
        this.fsm = StateMachine.create(slideTransitions);
    }

    static firstSlide() {
        return SlideManager.moveSlide('','init');
    }

    static moveSlide(currentSlide, event) {
        // invoke the function associated with event
        if(!this.fsm[event]()) {
            console.log("Error in slide transition from "+currentSlide);
        }
        var nextComponent = SlideManager.convertToComponent(this.fsm.current);
        console.log("currentSlide:"+this.fsm.current);
        return SlideManager.getComponent(nextComponent);
    }

    static getComponent(component) {
        var label = slideConfigs[component.name].label;
        var nextComponent = {name:component, label:label};
        return nextComponent;
    }

    static previous() {
        var componentName = SlideManager.convertToComponent(this.fsm.previous());
        return SlideManager.getComponent(componentName);
    }

    static convertToObject(name) {
        return eval("("+name+")");
    }

    static convertToComponent(name) {
        return eval("(Components."+name+")");
    }

}
