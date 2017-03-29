import React from 'react';

import SlideStyle from './SlideViewDesktop.scss';
import ErrorMessageStyle from '../widgets/ErrorMessage.scss';
import Sprite from '../widgets/Sprite.scss';

const Layout = ({children, title, errorMessage, canGoBack, goBackToPreviousSlide, canGoForward, gotoNextSlideIfAllowed, forceNextButtonClick}) => {
    return (
        <div className={SlideStyle.slideContainer}>
            <div className="container">
                <div className="font-xxlg mt-lg">
                    {title}
                    {errorMessage &&
                        <span className={ErrorMessageStyle.errorContainer}>
                            <span className={ErrorMessageStyle.errorContainerInner}>
                                <span className={ErrorMessageStyle.errorImage}><img src="https://www.bankbazaar.com/images/icon-error.png"/></span>
                                <span className={ErrorMessageStyle.errorMessage}>{errorMessage}</span>
                            </span>
                        </span>
                    }
                </div>
                <div className={["clearfix", SlideStyle.slideContainerInner].join(' ')} >
                    {children}
                </div>
                <div className={SlideStyle.slideControlPrev}>
                    <button type="button" className={SlideStyle.slideControlButtonIcon} onClick={goBackToPreviousSlide} style={{display: canGoBack ? "" : "none" }}>
                        <span className={Sprite.iconLeft}/>
                    </button>
                </div>
                <div className={SlideStyle.slideControlNext}>
                    <button type="button" className={SlideStyle.slideControlButtonIcon} onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
                        <span className={Sprite.iconRight}/>
                    </button>
                </div>
                <div>
                    <button type="button" className="btn btn-large" onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
                        Continue
                    </button>
                    {forceNextButtonClick &&
                        <img src="https://www.bankbazaar.com/images/landing/pointing-arrow.gif" style={{position: 'absolute', marginTop: '-12px', overflow: 'hidden', display: 'inline'}}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Layout;