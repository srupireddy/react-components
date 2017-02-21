import React from 'react';

import ReactDOM from 'react-dom';

import Slider from 'rc-slider';

import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip overlay={value} visible={dragging} placement="left" key={index}>
            <Handle {...restProps} />
        </Tooltip>
    );
};

export default class RangeSlider extends React.Component {
        isInValidState() {
            return true;
        }


        render() {
            return (
                    <div className="sliderHorizontal clearfix">
             <Slider min={0} max={120000} step={1000} handle={handle} />
            </div>
    )
    }
}