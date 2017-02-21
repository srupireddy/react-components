import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {reducer} from './reducers/reducer.js';
import Slide from './containers/Slide.js';
import SlideManager from './containers/SlideManager.js';

//structure of application state
//Eg. {currentState:{component:City,label:'Where do you live?'}, model:{City:Chennai, Gender:Male, EmploymentType: Salaried, Income : {currencyCode:INR, value:30000},
// contactInfo:{name:example, mobile:999999999,email:123@example.com}}}

var context;
//initialize the slide manager to load slide transitions rules
SlideManager.initialize(context);
//fetch the first slide
var initialState = {};
initialState = SlideManager.firstSlide(initialState);

//create the store with a reducer and the initial state that loads the first slide.
// As of now, it's only a single reducer, but we can have a combined reducer when need arises
let store = createStore(reducer, initialState);

ReactDOM.render(
    //This helps the container component Slide to use connect().
    // It's required to connect a react component to a store.
    <Provider store={store}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);