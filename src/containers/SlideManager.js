import * as Components from '../components/';
import StateMachine from '../fsm/state-machine.js';

var slideTransitionRules;
var fsm;
var context;
var prefillModel; //model loaded from the server, used as a fallback, it's not mutated
var model; //model cloned from prefillModel, gets updated as user changes the data, final object pushed to server
var slideConfigs = {
    City: {label:'Where do you live currently?'}, 
    Gender: {label:'My gender'}, 
    Experience: {label:'Your joining date and total work experience'}, 
    EmploymentType: {label:'Type of employment'},
    Employer: {label: 'Your company name'}, 
    ProfitAfterTax: {label:'Latest year\'s profit after tax'}, 
    Salary: {label:'Gross fixed monthly income'},
    OtherCity: {label: 'Temporary Component'}
};

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

    static initialize(context) {
        this.context = context;
        SlideManager.loadSlideTransitionRules(context);
        var slideTransitions = SlideManager.convertToObject(slideTransitionRules);
        this.fsm = StateMachine.create(slideTransitions);
    }

    static firstSlide(model) {
        return SlideManager.moveSlide(model,'','init');
    }

    static moveSlide(model, currentSlide, event) {
        // invoke the function associated with event
        if(!this.fsm[event](model)) {
            console.log("Error in slide transition from "+currentSlide);
        }
        var nextComponent = SlideManager.convertToComponent(this.fsm.current);
        console.log("currentSlide:"+this.fsm.current);
        return SlideManager.constructViewState(nextComponent);
    }

    static constructViewState(component) {
        var label = slideConfigs[component.name].label;
        //construct the view state. As of now, this holds only one configurable property i.e. label.
        var nextComponent = {viewState: {component:component, label:label}};
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
