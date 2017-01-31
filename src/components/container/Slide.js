import React, {Component} from 'react';
//TODO: Figure out a way to package all slides to avoid importing individual components
/*import Gender from '../slide/Gender.js';*/
import City from '../slide/City.js';
/*import Experience from '../slide/Experience.js';
import Salary from '../slide/Salary.js';*/
import slide from './Slide.css';
import sprite from '../Sprite.css';
import getDisplayName from 'react-display-name';
import {navigateToNextSlide, navigateToPreviousSlide} from '../SlideManager';
/**
 * The main Slide Manager as well as Container component. This component (as of now)
 * manages the Slide Transition Rules (in a hacky way) as well as manage the data
 * communicated by each Component.
 * There are three ways to navigate
 *   1. Using the Prev and Next arrows - Next arrow is allowed only if the Current Slide is in a Valid State. Otherwise prints a message on our log.
 *   2. Using the Continue Button - Allowed only if the Current Slide is in a Valid State. Otherwise prints a message on our log.
 *   3. The Component itself can decide whether to navigate or not. This is true for any single element components.
 *
 * State of the entire Eligibility Data collected from various slides is managed by this component through the callback method
 * handleCompletionOfCurrSlideAction.
 **/
class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {activeComponent: City, activeComponentLabel: 'Where do you live currently?', formData: {}}
        this.navigateToNextSlide = this.navigateToNextSlide.bind(this);
        this.navigateToPreviousSlide = this.navigateToPreviousSlide.bind(this);
        this.handleCompletionOfCurrSlideAction = this.handleCompletionOfCurrSlideAction.bind(this);
        this.navigateToNextSlideIfCurrSlideValid = this.navigateToNextSlideIfCurrSlideValid.bind(this);
    }

    handleCompletionOfCurrSlideAction(data) {
        this.state.formData[this.state.activeComponent.name] = data;
        this.navigateToNextSlide();
    }

    // TODO: Hacky Way to manage Slide Transition Rules.
    navigateToNextSlide() {
        this.setState(navigateToNextSlide(getDisplayName(this.state.activeComponent)));
    }

    navigateToNextSlideIfCurrSlideValid() {
        if (!this.activeComponentInstance.isInValidState()) {
            console.log("Oopss... You have not chosen anything");
            return;
        }
        this.navigateToNextSlide();
    }

    // TODO: Hacky Way to manage Slide Transition Rules.
    navigateToPreviousSlide() {
        this.setState(navigateToPreviousSlide(getDisplayName(this.state.activeComponent)));
    }

    render() {
        var Component = this.state.activeComponent
        return (
            <div styleName='slide.container'>
                <h3 styleName='slide.header'>{this.state.activeComponentLabel}</h3>
                <Component
                    ref={(instance) => this.activeComponentInstance = instance}
                    onCompletionOfAction={this.handleCompletionOfCurrSlideAction}
                    data={this.state.formData[this.state.activeComponent.name]}
                    />
                <div>
          <span>
            <a styleName="slide.controlLeft" onClick={this.navigateToPreviousSlide}>
                <span styleName="sprite.symbolChevronLeft"></span>
            </a>
            <a styleName="slide.controlRight" onClick={this.navigateToNextSlideIfCurrSlideValid}>
                <span styleName="sprite.symbolChevronRight"></span>
            </a>
          </span>
                    <button onClick={this.navigateToNextSlideIfCurrSlideValid}>Continue</button>
                </div>
            </div>
        )
    }
}

export default Slide;