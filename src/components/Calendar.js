import React from 'react';
import BaseComponent from './BaseComponent.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import GeneralUtils from '../utils/GeneralUtils';

import CalendarStyle from './Calendar.scss';

export default class Calendar extends BaseComponent {
    static propTypes = {
        variant: React.PropTypes.oneOf(['Default', 'YearAndMonthOnly']),
        headerSuffix: React.PropTypes.string
    };

    static defaultProps = {
        variant: 'Default',
        headerSuffix: ''
    };

    state = {
        selectedDate: null,
        selectedYear: null,
        selectedMonth: null,
        yearPresenterVisible: true,
        monthPresenterVisible: false,
        datePresenterVisible: false
    }

    render() {
        switch(this.props.variant) {
            case "YearAndMonthOnly": return this.renderVariantYearAndMonth();
        }
        return null;
    }

    renderVariantYearAndMonth() {
        return (
            <div className="row">
                {this.state.yearPresenterVisible &&
                    <YearPicker selectedYear={this.state.selectedYear} onClick={this.handleYearSelection} header={this.props.headerSuffix ? "Year of " + this.props.headerSuffix : "Year"}/>
                }
                {this.state.monthPresenterVisible &&
                    <MonthPicker selectedMonth={this.state.selectedMonth} onClick={this.handleMonthSelection} header={this.props.headerSuffix ? "Year of " + this.props.headerSuffix : "Year"}/>
                }
                {this.state.datePresenterVisible &&
                    <DatePicker inline selected={this.state.selectedDate} onChange={this.handleDateSelection} />
                }
            </div>
        )
    }

    handleYearSelection = (event) => {
        let selectedYear = parseInt(event.target.dataset.value);
        let showMonthPresenter = (moment().format('YYYY') - selectedYear) < 5;
        let showDatePresenter = showMonthPresenter && this.state.selectedMonth
        let selectedMonth = showMonthPresenter ? this.state.selectedMonth : null;
        
        this.setState({
            selectedYear: selectedYear,
            selectedMonth: selectedMonth,
            monthPresenterVisible: showMonthPresenter,
            datePresenterVisible: showDatePresenter,
            selectedDate: this.state.selectedMonth ? this.state.selectedDate.set('year', selectedYear) :  null
        })
    }

    handleMonthSelection = (event) => {
        let selectedMonth = parseInt(event.target.dataset.value);
        this.setState({
            selectedMonth: selectedMonth, 
            selectedDate: moment(this.state.selectedYear + "-" + selectedMonth + "-01"),
            datePresenterVisible: true
        })
    }

    handleDateSelection = (selectedMoment) => {
        this.setState({selectedDate: selectedMoment})
    }
}

const YearPicker = (props) => {
    let currentYear = moment().format('YYYY');
    let availableYears = [];
    for (var i=0; i<5; i++) {
        availableYears.push({value: currentYear - i, label: currentYear - i});
    }
    availableYears.push({value: currentYear - 5, label: "Before " + (currentYear - 4)});

    return (
        <div style={{width: "200px", display: "inline-block", padding: "0 10px"}}>
            <div className={CalendarStyle.tableHeading}>{props.header || 'Year'}</div>
            <table className={CalendarStyle.curvedTable}>
                <tbody>
                    {GeneralUtils.iterateArrayInGroupsOf(availableYears, 2).map(
                        (row, index) => (
                            <tr key={index}>
                                {row.map(
                                    (cell) => (
                                        <td key={cell.value} style={{width: "100px"}} className={props.selectedYear === cell.value ? CalendarStyle.selected :  ""}>
                                            <a data-value={cell.value} onClick={props.onClick}>{cell.label}</a>
                                        </td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

const MonthPicker = (props) => {
    let availableMonths = Array.apply(0, Array(12)).map(function(_, i) {return {value: i+1, label: moment().month(i).format('MMM')} });

    return (
        <div style={{width: "300px", display: "inline-block", padding: "0 10px"}}>
            <div className={CalendarStyle.tableHeading}>{props.header || 'Year'}</div>
            <table className={CalendarStyle.curvedTable}>
                <tbody>
                    {GeneralUtils.iterateArrayInGroupsOf(availableMonths, 3).map(
                        (row, index) => (
                            <tr key={index}>
                                {row.map(
                                    (cell) => (
                                        <td key={cell.value} style={{width: "100px"}} className={props.selectedMonth === cell.value ? CalendarStyle.selected :  ""}>
                                            <a data-value={cell.value} onClick={props.onClick}>{cell.label}</a>
                                        </td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}