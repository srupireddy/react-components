import React from 'react';

import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';
import ActionHandler from '../components/ActionHandler';

export default class SlideView extends React.Component {
    state = {
        errorMessage: null
    }

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

            onError = (message) => {
                console.log(message);
                this.setState({errorMessage: message});
            }
        }(props);
    }

    render() {
        let value = this.props.prefillData[this.props.modelKey];
        return (
            <div className={SlideStyle.slideContainer}>
                <div className="container">
                    <div className={SlideStyle.slideHeader}>
                        {this.props.title}
                        {this.state.errorMessage &&
                        <span className={SlideStyle.errorContainer}>
                            <img src="https://www.bankbazaar.com/images/icon-error.png"/>
                            <span className={SlideStyle.errorMessage}>{this.state.errorMessage}</span>
                        </span>
                        }
                    </div>
                    <this.props.componentClass ref={(instance) => this.activeComponentInstance = instance}
                            {...this.props.componentProps}
                            modelKey={this.props.modelKey}
                            handler={this.componentActionHandler}
                            value={value}
                            style={{margin: '20px auto'}}
                            />
                    <div className={SlideStyle.slideControlPrev}>
                        <button type="button" className={SlideStyle.icon} onClick={this.props.goBackToPreviousSlide} style={{display: this.props.canGoBack ? "" : "none" }}>
                            <span className={Sprite.iconLeft}/>
                        </button>
                    </div>
                    <div className={SlideStyle.slideControlNext}>
                        <button type="button" className={SlideStyle.icon} onClick={this.props.gotoNextSlideIfAllowed} disabled={!this.props.canGoForward}>
                            <span className={Sprite.iconRight}/>
                        </button>
                    </div>
                    <button type="button" className="btn" onClick={this.props.gotoNextSlideIfAllowed} disabled={!this.props.canGoForward}>
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
