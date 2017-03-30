import React from 'react';

import SlideStyle from './SlideViewMobile.scss';
import ErrorMessageStyle from '../widgets/ErrorMessage.scss';
import Sprite from '../widgets/Sprite.scss';

const Layout = ({children, title, errorMessage, canGoBack, goBackToPreviousSlide, canGoForward, gotoNextSlideIfAllowed, forceNextButtonClick}) => {
    return (
        <div className={SlideStyle.slideContainer}>
            <div className={SlideStyle.slideHeader}>
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
            <div className={SlideStyle.buttonsRow}>
                <a className="btn" onClick={goBackToPreviousSlide} style={{display: canGoBack ? "" : "none" }}>
                    <span className={SlideStyle.previousArrow}></span> Previous
                </a>
                <a className="btn" onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
                    Next <span className={SlideStyle.nextArrow}></span>
                </a>
            </div>
        </div>
    )
}

export default Layout;