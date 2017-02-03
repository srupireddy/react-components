/**
 * Created by srikanth on 2/2/17.
 */
import Gender from './slide/Gender.js';
import City from './slide/City.js';
import Experience from './slide/Experience.js';
import Salary from './slide/Salary.js';
import StateMachine from '../fsm/state-machine.js'
import getDisplayName from 'react-display-name';

const slideTransitionRules = "{\"initial\":{ \"state\": \"City\", \"event\": \"init\", \"defer\": \"true\" },\"events\":[{\"name\":\"next\",\"from\":\"City\",\"to\":\"Gender\"},{\"name\":\"next\",\"from\":\"Gender\",\"to\":\"Experience\"},{\"name\":\"next\",\"from\":\"Experience\",\"to\":\"Salary\"},{\"name\":\"previous\",\"from\":\"Gender\",\"to\":\"City\"},{\"name\":\"previous\",\"from\":\"Salary\",\"to\":\"Experience\"},{\"name\":\"previous\",\"from\":\"Salary\",\"to\":\"Gender\"}]}";

const slideTransitionObj = JSON.parse(slideTransitionRules);

var fsm = StateMachine.create(slideTransitionObj);

export function initSlide() {
    return moveSlide('', 'init', {});
}

export function moveSlide(currentSlide, event, data) {
    // invoke the function associated with event
    if(!fsm[event]()) {
        console.log("Error in slide transition from "+currentSlide);
    }
    var nextComponent = fsm.current;
    return getComponent(nextComponent, data);
}


//TODO: is there a better way than this like reflection API?
function getComponent(name, data) {
    var component = null;
    var label = '';

    switch (name) {
        case 'City':
            component = City;
            label = 'Where do you live currently?';
            break;
        case 'Gender':
            component = Gender;
            label = "My gender";
            break;
        case 'Experience':
            component = Experience;
            label = "Your joining date and total work experience";
            break;
        default:
            component = City;
            label = 'Where do you live currently?';
    }
    return {activeComponent:component, activeComponentLabel:label, formData : data};
}