/**
 * This manages the slide transition NOT using any of the third party state machine.
 */

import Gender from './slide/Gender.js';
import City from './slide/City.js';
import Experience from './slide/Experience.js';
import Salary from './slide/Salary.js';
import Constants from './Constants';
import getDisplayName from 'react-display-name';


const slideTransitionRules = "{\"Start\":[{\"next\":[{\"slide\":\"City\",\"condition\":\"\"}]}],\"City\":[{\"next\":[{\"slide\":\"Gender\",\"condition\":\"\"}]}],\"Gender\":[{\"next\":[{\"slide\":\"Employment\",\"condition\":\"\"}]},{\"previous\":[{\"slide\":\"City\",\"condition\":\"\"}]}],\"Employment\":[{\"next\":[{\"slide\":\"Salary\",\"condition\":\"\"},{\"slide\":\"ProfitAfterTax\",\"condition\":\"\"}]},{\"previous\":[{\"slide\":\"Gender\",\"condition\":\"\"}]}],\"salary\":[{\"next\":[{\"slide\":\"End\",\"condition\":\"\"}]},{\"previous\":[{\"slide\":\"Employment\",\"condition\":\"\"}]}],\"profileAfterTax\":[{\"next\":[{\"slide\":\"End\",\"condition\":\"\"}]},{\"previous\":[{\"slide\":\"Employment\",\"condition\":\"\"}]}]}";

var slideTransitionRuleJsonObject = JSON.parse(slideTransitionRules);


/**
 * used by the slide container to move the slide either to next or previous.
 *
 * This function determines the slide that customer should navigate to based
 * on the transition rules for the given slide and
 *
 * @param current
 * @param actionType
 * @returns {*}
 */
export function moveSlide(current, actionType, data) {
    var nextComponent = null;
    var label = '';

    //slide navigation has just started
    if(current == undefined || current == '') {
        nextComponent = slideTransitionRuleJsonObject.Start[0].next.slide;
    } else {
        if(actionType == Constants.PREVIOUS) {
            nextComponent = getPreviousSlide(slideTransitionRuleJsonObject, current, data);
        } else if(actionType == Constants.NEXT) {
           nextComponent = getNextSlide(slideTransitionRuleJsonObject, current, data);
        }
    }
    console.log("nextComponentName:"+nextComponent);
    return getComponent(nextComponent);
}

/**
 * get the next slide for the given slide and data from the slide transition rules
 *
 * @param obj
 * @param current
 * @param data
 * @returns {*}
 */
function getNextSlide(obj, current, data) {
    var component;
    //handle a slide that has multiple paths
    var length = slideTransitionRuleJsonObject[current][0].next.length;
    console.log("length:"+length);
    console.log("current:"+current);
    if(length > 1) {
        for(var i=0;i<length;i++) {
            var condition = slideTransitionRuleJsonObject[current][0].next[i].condition;
            if(evaluate(condition, data)) {
                component = slideTransitionRuleJsonObject[current][0].next[i].slide;
                break;
            }
        }
    } else {
        component = slideTransitionRuleJsonObject[current][0].next[0].slide;
        console.log("component:"+component);
    }
    return component;
}

/**
 * get the previous slide for the given slide and data from the slide transition rules
 *
 * @param obj
 * @param current
 * @param data
 * @returns {*}
 */
function getPreviousSlide(obj, current, data) {
    var component;
    //handle a slide that has multiple paths
    var length = slideTransitionRuleJsonObject[current][1].previous.length;
    if(length > 1) {
        for(var i=0;i<length;i++) {
            var condition = slideTransitionRuleJsonObject[current][1].previous[i].condition;
            if(evaluate(condition, data)) {
                component = slideTransitionRuleJsonObject[current][1].previous[i].slide;
                break;
            }
        }
    } else {
        component = slideTransitionRuleJsonObject[current][1].previous[0].slide;
    }
    return component;
}

function evaluate(condition, data) {
    return true;
}

//TODO: is there a better way than this like reflection API?
function getComponent(name) {
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
    return {activeComponent:component, activeComponentLabel:label};
}
