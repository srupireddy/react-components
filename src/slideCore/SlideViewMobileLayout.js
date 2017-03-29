import React from 'react';

import SlideStyle from './SlideViewMobile.scss';
import Sprite from '../widgets/Sprite.scss';

const Layout = ({children, title, errorMessage, canGoBack, goBackToPreviousSlide, canGoForward, gotoNextSlideIfAllowed, forceNextButtonClick}) => {
    return (
        <div className={SlideStyle.slideContainer}>
            <div className={SlideStyle.slideHeader}>
                {title}
                {errorMessage &&
                    <span className={SlideStyle.errorContainer}>
                        <span className={SlideStyle.errorContainerInner}>
                            <span className={SlideStyle.errorImage}><img src="https://www.bankbazaar.com/images/icon-error.png"/></span>
                            <span className={SlideStyle.errorMessage}>{errorMessage}</span>
                        </span>
                    </span>
                }
            </div>
            <div className={["clearfix", SlideStyle.slideContainerInner].join(' ')} >
                {children}
            </div>
            <div className={SlideStyle.buttonsRow}>
                <button type="button" className="btn" onClick={goBackToPreviousSlide} style={{display: canGoBack ? "" : "none" }}>
                    Back
                </button>
                <button type="button" className="btn" onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Layout;