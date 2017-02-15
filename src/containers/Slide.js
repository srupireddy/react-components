import React from 'react';

import {Button, IconOnlyButton} from '../widgets/Button.js';
import SlideManager from './SlideManager.js';
import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';

export default class Slide extends React.Component {
    constructor(props) {
        super(props);
        var component = SlideManager.firstSlide();
        this.state = {activeComponent: component.name, activeComponentLabel: component.label, formData: {}};
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
        let prevComponent = SlideManager.previous();
        let name = prevComponent.name;
        let prevComponentHeader = prevComponent.label;
        this.setState({activeComponent: name, activeComponentLabel: prevComponentHeader});
    }

    navigateToNextSlide() {
        let nextComponent = SlideManager.moveSlide(this.state.activeComponent.name, "next");
        let name = nextComponent.name;
        let nextComponentHeader = nextComponent.label;
        console.log("name:"+name+",label:"+nextComponentHeader);
        this.setState({activeComponent: name, activeComponentLabel: nextComponentHeader});
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
            <div className={SlideStyle.slideContainer}>
              <div className="container">
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
        </div>
        )
    }
}
