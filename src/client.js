import React from 'react';
import ReactDOM from 'react-dom';
import Slide from './containers/Slide.js';
import SlideManager from './containers/SlideManager.js';

var context;
var model;

SlideManager.initialize(context, model);

ReactDOM.render(
    <Slide />,
    document.getElementById('root')
);