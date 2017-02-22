import React from 'react';
import { connect } from 'react-redux';

import SlideManager from './SlideManager.js';
import { addAttribute, loadSlide, previousSlide, nextSlide } from '../actions/actions.js';

import SlideStyle from './Slide.scss';
import ButtonStyle from '../widgets/Button.scss';
import Sprite from '../widgets/Sprite.scss';

class Slide extends React.Component {
    handleCompletionOfCurrSlideAction = (data) => {
        this.props.dispatch(addAttribute(this.props.state.viewState.component.name, data));
        this.navigateToNextSlide(data);
    }

    navigateToPreviousSlide = () => {
        var data = this.props.state[this.props.state.viewState.component.name];
        this.props.dispatch(previousSlide(this.props.state.viewState.component.name, data));
    }

    navigateToNextSlide = (data) => {
        var data = this.props.state[this.props.state.viewState.component.name];
        this.props.dispatch(nextSlide(this.props.state.viewState.component.name, data));
    }

    navigateToNextSlideIfCurrSlideValid = () => {
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
                    <button className={ButtonStyle.icon} onClick={this.navigateToPreviousSlide}>
                        <span className={Sprite.iconLeft}/>
                    </button>
                </div>
                <div className={SlideStyle.slideControlNext}>
                    <button className={ButtonStyle.icon} onClick={this.navigateToNextSlideIfCurrSlideValid}>
                        <span className={Sprite.iconRight}/>
                    </button>
                </div>
                <button className={ButtonStyle.btn} onClick={this.navigateToNextSlideIfCurrSlideValid}>
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
