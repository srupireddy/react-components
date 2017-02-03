/**
 * Created by ramkumar on 2/2/17.
 */
import React from 'react';
import arrowstyle from './Arrow.css';

class Arrow extends React.Component {

    render(){
        return (
    <div className="arrow">
    <a className={[arrowstyle.left, arrowstyle.carouselControl].join(' ')} onClick={this.navigateToPreviousSlide}>
        <span className={[arrowstyle.spriteCarousel, arrowstyle.carouselArrowLeft].join(' ')}></span>
    </a>
    <a className={[arrowstyle.right, arrowstyle.carouselControl].join(' ')} onClick={this.navigateToNextSlideIfCurrSlideValid}>
        <span className={[arrowstyle.spriteCarousel, arrowstyle.carouselArrowRight].join(' ')}></span>
    </a>
    </div>
)
}
};

export default Arrow;
