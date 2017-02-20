import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {addAttribute} from './reducers/reducer.js';
import Slide from './containers/Slide.js';
import SlideManager from './containers/SlideManager.js';

//structure of application state
//Eg. {viewState:{component:City,label:'Where do you live?'},City:Chennai, Gender:Male, EmploymentType: Salaried, Income : {currencyCode:INR, value:30000},
// contactInfo:{name:example, mobile:999999999,email:123@example.com}}

var context;
//initialize the slide manager to load slide transitions rules
SlideManager.initialize(context);
//fetch the first slide
var initialState = SlideManager.firstSlide({});

//create the store with a reducer and the initial state that loads the first slide.
// As of now, it's only a single reducer, but we can have a combined reducer when need arises
let store = createStore(addAttribute, initialState);

ReactDOM.render(
    //This helps the container component Slide to use connect().
    // It's required to connect a react component to a store.
    <Provider store={store}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);