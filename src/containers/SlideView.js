import React from 'react';

import SlideStyle from './Slide.scss';
import ButtonStyle from '../widgets/Button.scss';
import Sprite from '../widgets/Sprite.scss';
import ActionHandler from '../components/ActionHandler';

export default class Slide extends React.Component {
    constructor(props) {
        super(props);

        this.componentActionHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (modelKey, payload) => {
                this.props.componentCompleteDataCollected(modelKey, payload);
                this.props.navigateToNextSlide();

                // TODO: Figure out how we can update the SlideView when Slide Manager changes outside of dispatch. Thats why manually firing 
                // another dispatch action again. 
                this.props.componentCompleteDataCollected();
            }
        }(props);
    }

    render() {
        return (
            <div className={SlideStyle.slideContainer}>
                <div className="container">
                    <div className={SlideStyle.slideHeader}>
                        {this.props.title}
                    </div>
                    <this.props.component ref={(instance) => this.activeComponentInstance = instance}
                            modelKey={this.props.modelKey}
                            handler={this.componentActionHandler}
                            style={{margin: '20px auto'}}
                            />
                    <div className={SlideStyle.slideControlPrev}>
                        <button className={ButtonStyle.icon} onClick={this.props.navigateToPreviousSlide}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button className={ButtonStyle.icon} onClick={this.props.navigateToNextSlideIfAllowed}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <button className={ButtonStyle.btn} onClick={this.props.navigateToNextSlideIfAllowed}>
                        Continue
                    </button>
                </div>
            </div>
        )
    }
}
