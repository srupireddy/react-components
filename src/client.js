import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Slide from './containers/Slide.js';
import SlideManager from './containers/SlideManager.js';

/*BB Global Style*/
import './styles/bootstrap.css';
import './styles/bbglobal.css';

/*React Component Style*/
import './styles/react-tooltip.css';
import './styles/react-rangeslider.css';
import './styles/react-datepicker.css';

var slideManager = new SlideManager(slideTransitionRules);

ReactDOM.render(
    //This helps the container component Slide to use connect().
    // It's required to connect a react component to a store.
    <Provider store={slideManager.datastore()}>
        <Slide />
    </Provider>,
    document.getElementById('root')
);