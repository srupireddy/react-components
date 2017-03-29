import React from 'react';

import SlideStyle from './Slide.scss';
import Sprite from '../widgets/Sprite.scss';

const Layout = ({children, title, errorMessage, canGoBack, goBackToPreviousSlide, canGoForward, gotoNextSlideIfAllowed, forceNextButtonClick}) => {
    return (
        <div className={SlideStyle.slideContainer}>
            <div className={SlideStyle.slideLongHeader}><h2>Compare Home Loan Offers from Top Lenders. Apply Online and Get e-Approved Instantly.</h2></div>
            <div className="container">
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
                <div className={SlideStyle.slideControlPrev}>
                    <button type="button" className={SlideStyle.icon} onClick={goBackToPreviousSlide} style={{display: canGoBack ? "" : "none" }}>
                        <span className={Sprite.iconLeft}/>
                    </button>
                </div>
                <div className={SlideStyle.slideControlNext}>
                    <button type="button" className={SlideStyle.icon} onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
                        <span className={Sprite.iconRight}/>
                    </button>
                </div>
                <div>
                    <button type="button" className="btn" onClick={gotoNextSlideIfAllowed} disabled={!canGoForward}>
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