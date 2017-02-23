import React from 'react';
import { connect } from 'react-redux';

import ActionHandler from '../components/ActionHandler';
import SlideManager from './SlideManager.js';
import {collectData, previousSlide} from '../actions/actions.js'

import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';

//TODO: Figure out how I can create an Anonymous Class definition inside Slide class itself rather
// than creating a named class.
class ComponentActionHandler extends ActionHandler {
    constructor(props) {
        super(props);
        this.props = props;
    }

    onCompletion = (modelKey, payload) => {
        console.log("Component with Model Key = " + modelKey + " involved the onCompletion Handler with the Payload = " + payload);
        this.props.dispatch(collectData(modelKey, payload));
    }
}

class Slide extends React.Component {
    componentActionHandler = new ComponentActionHandler(this.props);

    navigateToPreviousSlide = () => {
        var data = this.props.state[this.props.state.currentState.component.name];
        this.props.dispatch(previousSlide(this.props.state.currentState.component.name, data));
    }

    navigateToNextSlideIfAllowed = () => {
        //TODO: Check whether the current slide is in valid state.
        //TODO: There is no reducer to call the next slide. 
    }

    render() {
        var Component = this.props.state.currentState.component;
        var data = this.props.state.model != undefined ? this.props.state.model[Component.name] : '';
        var slideHeader = this.props.state.currentState.label;
        return (
            <div className={SlideStyle.slideContainer}>
                <div className="container">
                    <div className={SlideStyle.slideHeader}>
                        {slideHeader}
                    </div>
                    <Component ref={(instance) => this.activeComponentInstance = instance}
                            modelKey={Component.name}
                            handler={this.componentActionHandler}
                            data={data}
                            style={{margin: '20px auto'}}
                            />
                    <div className={SlideStyle.slideControlPrev}>
                        <button className={SlideStyle.icon} onClick={this.navigateToPreviousSlide}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button className={SlideStyle.icon} onClick={this.navigateToNextSlideIfAllowed}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <button className="btn" onClick={this.navigateToNextSlideIfAllowed}>
                        Continue
                    </button>
                </div>
            </div>
        )
    }
}

//pass application state as a property to the component
function mapStateToProps(state) {
    return {state:state};
}

export default connect(mapStateToProps)(Slide);
