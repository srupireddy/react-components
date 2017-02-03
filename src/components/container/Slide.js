import React, {Component} from 'react';
//TODO: Figure out a way to package all slides to avoid importing individual components
import Gender from '../slide/Gender.js';
import City from '../slide/City.js';
import Experience from '../slide/Experience.js';
import Arrow from '../../widgets/Arrow.js';
import Button from '../../widgets/Button.js';
import Salary from '../slide/Salary.js';
import slide from './Slide.css';
import sprite from '../Sprite.css';

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
        console.log(this.state);
        this.navigateToNextSlide();
    }

    // TODO: Hacky Way to manage Slide Transition Rules.
    navigateToNextSlide() {
        var nextComponent = null;
        var label = '';
        switch (this.state.activeComponent) {
            case City:
                nextComponent = Gender;
                label = "My gender";
                break;
            case Gender:
                nextComponent = Experience;
                label = "Your joining date and total work experience";
                break;
            case Experience:
                nextComponent = Salary;
                label = "Your monthly net salary";
                break;
            default:
                nextComponent = this.state.activeComponent;
                label = this.state.activeComponentLabel;
        }
        this.setState({activeComponent:  nextComponent, activeComponentLabel: label})
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
        var prevComponent = null;
        var label = '';
        switch (this.state.activeComponent) {
            case Gender:
                prevComponent = City;
                label = 'Where do you live currently?';
                break;
            case Experience:
                prevComponent = Gender;
                label = "My gender";
                break;
            case Salary:
                prevComponent = Experience;
                label = "Your joining date and total work experience";
                break;
            default:
                prevComponent = this.state.activeComponent;
                label = this.state.activeComponentLabel;
        }
        this.setState({activeComponent:  prevComponent, activeComponentLabel: label})
    }

    render() {
        var Component = this.state.activeComponent
        return (
            <div className={slide.slideblock}>
            <div className="container">
               <div className={slide.slideheader}>{this.state.activeComponentLabel}</div>
                <Component
                    ref={(instance) => this.activeComponentInstance = instance}
                    onCompletionOfAction={this.handleCompletionOfCurrSlideAction}
                    data={this.state.formData[this.state.activeComponent.name]}
                    />
            <Button onClick={this.navigateToNextSlideIfCurrSlideValid}>Continue</Button>
            <div>
            <Arrow/>
            </div>
             </div>
            </div>
        )
    }
}

export default Slide;