import React from 'react';

import {Button, IconOnlyButton} from '../widgets/Button.js';
import SlideManager from './SlideManager.js';
import SlideStyle from './Slide.css';
import Sprite from '../widgets/Sprite.css';

export default class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeComponent: SlideManager.firstSlide(), activeComponentLabel: 'Where do you live currently?', formData: {}}
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

    navigateToPreviousSlide() {
        let prevComponent = SlideManager.previousSlide(this.state.activeComponent);
        let prevComponentHeader = SlideManager.slideHeader(prevComponent);
        this.setState({activeComponent: prevComponent, activeComponentLabel: prevComponentHeader});
    }

    navigateToNextSlide() {
        let nextComponent = SlideManager.nextSlide(this.state.activeComponent);
        let nextComponentHeader = SlideManager.slideHeader(nextComponent);
        this.setState({activeComponent: nextComponent, activeComponentLabel: nextComponentHeader});
    }

    navigateToNextSlideIfCurrSlideValid() {
        if (!this.activeComponentInstance.isInValidState()) {
            console.log("Oopss... You have not chosen anything");
            return;
        }
        this.navigateToNextSlide();
    }

    render() {
        var Component = this.state.activeComponent
        return (
            <div className={["container", SlideStyle.slideContainer].join(' ')}>
                <div className={SlideStyle.slideHeader}>
                    {this.state.activeComponentLabel}
                </div>
                <Component
                    ref={(instance) => this.activeComponentInstance = instance}
                    onCompletionOfAction={this.handleCompletionOfCurrSlideAction}
                    data={this.state.formData[this.state.activeComponent.name]}
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
        )
    }
}
