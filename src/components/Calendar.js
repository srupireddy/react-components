import React from 'react';
import Moment from 'moment';

import TableStyle from '../widgets/Table.scss';
import HeadingStyle from '../widgets/Heading.scss';

export default class Calendar extends React.Component {
    static propTypes = {
        variant: React.PropTypes.oneOf(['Default', 'YearAndMonthOnly']),
    };

    static defaultProps = {
        variant: 'Default'
    };

    constructor(props) {
        super(props);
        this.state = {selectedDate: new Date()}
    }

    isInValidState() {
        return true;
    }
    
    render() {
        switch(this.props.variant) {
            case "YearAndMonthOnly": return this.renderVariantYearAndMonth();
        }
        return null;
    }

    renderVariantYearAndMonth() {
        let currentYear = Moment().format('YYYY');
        let renderedYears = [];
        for (var i=0; i<5; i++) {
            renderedYears.push(currentYear - i);
        }
        renderedYears.push("Before " + (currentYear - 4));

        return (
            <div style={{width: "200px"}}>
                <div className={HeadingStyle.subHeading}>Year of Joining</div>
                <table className={TableStyle.curvedTable}>
                    <tbody>
                        {renderedYears.inGroupsOf(2).map(
                            (row, index) => (
                                <tr key={index}>
                                    {row.map(
                                        (cell) => (
                                            <td key={cell} style={{width: "100px"}}><a data-value={cell}>{cell}</a></td>
                                        )
                                    )}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}