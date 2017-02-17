import React from 'react';

import {Button, IconOnlyButton} from '../widgets/Button.js';
import SlideManager from './SlideManager.js';
import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';
import { connect } from 'react-redux';
import { addAttribute, loadSlide, previousSlide, nextSlide } from '../actions/actions.js';

class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToNextSlide = this.navigateToNextSlide.bind(this);
        this.navigateToPreviousSlide = this.navigateToPreviousSlide.bind(this);
        this.handleCompletionOfCurrSlideAction = this.handleCompletionOfCurrSlideAction.bind(this);
        this.navigateToNextSlideIfCurrSlideValid = this.navigateToNextSlideIfCurrSlideValid.bind(this);
    }

    handleCompletionOfCurrSlideAction(data) {
        this.props.dispatch(addAttribute(this.props.state.viewState.component.name, data));
        this.navigateToNextSlide(data);
    }

    navigateToPreviousSlide() {
        var data = this.props.state[this.props.state.viewState.component.name];
        this.props.dispatch(previousSlide(this.props.state.viewState.component.name, data));
    }

    navigateToNextSlide(data) {
        var data = this.props.state[this.props.state.viewState.component.name];
        this.props.dispatch(nextSlide(this.props.state.viewState.component.name, data));
    }

    navigateToNextSlideIfCurrSlideValid() {
        if (!this.activeComponentInstance.isInValidState()) {
            console.log("Oopss... You have not chosen anything");
            return;
        }
        this.navigateToNextSlide();
    }

    render() {
        var Component = this.props.state.viewState.component;
        var componentName = Component.name;
        var data = this.props.state[componentName];
        var slideHeader = this.props.state.viewState.label;
        return (
            <div className={SlideStyle.slideContainer}>
              <div className="container">
                <div className={SlideStyle.slideHeader}>
                    {slideHeader}
                </div>
                <Component
                    ref={(instance) => this.activeComponentInstance = instance}
                    onCompletionOfAction={this.handleCompletionOfCurrSlideAction}
                    data={data}
                />
                <div className={SlideStyle.slideControlPrev}>
                    <IconOnlyButton onClick={this.navigateToPreviousSlide}>
                        <span className={Sprite.iconLeft}/>
                    </IconOnlyButton>
                </div>
                <div className={SlideStyle.slideControlNext}>
                    <IconOnlyButton onClick={this.navigateToNextSlideIfCurrSlideValid}>
                        <span className={Sprite.iconRight}/>
                    </IconOnlyButton>
                </div>
                <Button onClick={this.navigateToNextSlideIfCurrSlideValid}>
                    Continue
                </Button>
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