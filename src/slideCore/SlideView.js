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
                this.props.componentDataCollected(modelKey, payload);
            }
        }(props);
    }

    render() {
        let data = this.props.prefillData[this.props.modelKey];
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
                        <button className={SlideStyle.icon} onClick={this.props.goBackToPreviousSlide}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button className={SlideStyle.icon} onClick={this.props.gotoNextSlideIfAllowed}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <button className="btn" onClick={this.props.gotoNextSlideIfAllowed}>
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