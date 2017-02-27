import BaseStateMachine from '../vendor/base-state-machine.js';

//TODO: Version 3 of the 3rd Party Library is getting built. It has support for 
//History, Conditional Transition, etc., We should evaluate that when that Version
//is released. https://github.com/jakesgordon/javascript-state-machine/tree/v3


//TODO: This is dangerous as some other instance's usage of StateMachine will also be
//impacted. Unfortunately, the way the 3rd Party Library is created has forced us to
//do this. We should definitely refactor the 3rd Party Library when the usage of
//StateMachine is growing.

const originalSelectTarget = BaseStateMachine.selectTarget;
BaseStateMachine.selectTarget = function(from, map, context) {
    var possibleTransitions = map[from];
    if(possibleTransitions instanceof Array) {
        for(var i=0; i<possibleTransitions.length; i++) {
            var transition = possibleTransitions[i];
            var condition = transition.guard;
            if (!condition || (condition && condition(context, from))) {
                if (transition.target) {
                    return transition.target;
                }
            }
        }
    }

    return originalSelectTarget(from, map);
};

const originalCreate = BaseStateMachine.create;
BaseStateMachine.create = function(cfg, target) {
    if (cfg.transitions) {
        cfg.events = cfg.transitions;
        delete cfg.transitions;
    }
    return originalCreate(cfg, target);
};

export default BaseStateMachine;
