import React from 'react';

import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';
import ActionHandler from '../components/ActionHandler';

export default class SlideView extends React.Component {
    constructor(props) {
        super(props);

        this.componentActionHandler = new class extends ActionHandler {
            constructor(props) {
                super(props);
                this.props = props;
            }

            onCompletion = (modelKey, payload) => {
                this.props.componentCompleteDataCollected(modelKey, payload);
                let activeModel = this.context.store.getState().slide.activeModel 
                this.props.navigateToNextSlide(activeModel);
                this.refreshView();
            }
        }(props);
    }

    previousSlide = () => {
        this.props.navigateToPreviousSlide();
        this.refreshView();
    }

    nextSlideIfAllowed = () => {
        this.props.navigateToNextSlideIfAllowed();
        this.refreshView();
    }

    refreshView = () => {
        // TODO: Figure out how we can update the SlideView when Slide Manager changes outside of dispatch. Thats why manually firing 
        // another dispatch action again and forceUpdate is also not working as the SlideManager state is not getting mapped to props. 
        this.props.componentCompleteDataCollected('test', 'test');
    }

    render() {
        let data = this.context.store.getState().slide.activeModel[this.props.component.name];
        return (
            <div className={SlideStyle.slideContainer}>
                <div className="container">
                    <div className={SlideStyle.slideHeader}>
                        {this.props.title}
                    </div>
                    <this.props.component ref={(instance) => this.activeComponentInstance = instance}
                            modelKey={this.props.modelKey}
                            handler={this.componentActionHandler}
                            data={data}
                            style={{margin: '20px auto'}}
                            />
                    <div className={SlideStyle.slideControlPrev}>
                        <button className={SlideStyle.icon} onClick={this.previousSlide}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button className={SlideStyle.icon} onClick={this.nextSlideIfAllowed}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <button className="btn" onClick={this.nextSlideIfAllowed}>
                        Continue
                    </button>
                </div>
            </div>
        )
    }
}

SlideView.contextTypes = {
  store: React.PropTypes.object.isRequired
};