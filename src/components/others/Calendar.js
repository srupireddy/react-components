import React from 'react';
import VendorDatePicker from 'react-datepicker';
import moment from 'moment';
import Slider from 'react-rangeslider';

import BaseComponent from '../BaseComponent.js';
import CollectionUtils from '../../utils/CollectionUtils';

import CalendarStyle from './Calendar.scss';

export default class Calendar extends BaseComponent {
    static propTypes = {
        ...BaseComponent.propTypes,
        variant: React.PropTypes.oneOf(['Default', 'Last5Years', 'DOB']).isRequired,
        titleSuffix: React.PropTypes.string
    };

    state = {
        selectedDate: this.props.value
    }

    render() {
        switch(this.props.variant) {
            case "Last5Years": return <Last5YearsVariant value={this.state.selectedDate} onDateSelected={this.onDateSelected} titleSuffix={this.props.titleSuffix}/>
            case "DOB": return <DOBVariant value={this.state.selectedDate} onDateSelected={this.onDateSelected}/>
        }

        return null;
    }

    onDateSelected = (date) => {
        this.setState({selectedDate: date.format('YYYY-MM-DD')}, () => {this.notifyCompletion()});
    }

    getData() {
        return this.state.selectedDate;
    }

    isStateValid() {
        return this.state.selectedDate ? true : false;
    }
    
}

class Last5YearsVariant extends React.Component {
    static limit = 5;
    state = {
        selectedYear: null,
        selectedMonth: null,
        monthPresenterVisible: false
    }

    constructor(props) {
        super(props);
        this.computeStateFromDate(this.props.value);
    }
    
    render() {
        return (
            <div className={CalendarStyle.calendarContainer}>
                <YearPicker selectedYear={this.state.selectedYear} onClick={this.handleYearSelection} title={this.props.titleSuffix ? "Year of " + this.props.titleSuffix : "Year"}/>
                {this.state.monthPresenterVisible &&
                    <MonthPicker selectedMonth={this.state.selectedMonth} onClick={this.handleMonthSelection} title={this.props.titleSuffix ? "Month of " + this.props.titleSuffix : "Month"}/>
                }
            </div>
        )
    }

    handleYearSelection = (event) => {
        let selectedYear = parseInt(event.target.dataset.value);        
        let monthPresenterVisible = (moment().format('YYYY') - selectedYear) < Last5YearsVariant.limit;
        this.setState({selectedYear, monthPresenterVisible});
        if (!monthPresenterVisible) {
            // We are done with collecting the data. Lets just assume the month and date to be 01-01.
            this.setState({selectedMonth: null});
            this.props.onDateSelected(moment(selectedYear + "-01-01"));
        }
    }

    handleMonthSelection = (event) => {
        let selectedMonth = event.target.dataset.value;
        this.setState({selectedMonth});
        this.props.onDateSelected(moment(this.state.selectedYear + "-" + selectedMonth + "-01"));
    }

    computeStateFromDate(date) {
        if (!date) {
            return;
        }

        let dateAsMoment = moment(date); 
        let selectedYear = dateAsMoment.format('YYYY');
        let selectedMonth = dateAsMoment.format('MM');
        this.state = {selectedYear, selectedMonth, monthPresenterVisible: true};
    }
}

class DOBVariant extends React.Component {
    state = {
        age: 18,
        selectedYear: null,
        selectedYearMonth: null,
        selectedDate: null,
        yearMonthPresenterVisible: false,
        datePresenterVisible: false
    }

    constructor(props) {
        super(props);
        this.computeStateFromDOB(this.props.value);
    }
    
    render() {
        let heading = ["what ", <span key="0" className={CalendarStyle.highlight}>month</span>, " and ", <span key="1" className={CalendarStyle.highlight}>year</span>, " were you born in?"];
        let startDateOfSelectedMonth = this.state.selectedYearMonth ? moment(this.state.selectedYearMonth + '-01') : moment();
        let birthdayText = this.state.selectedDate ? this.state.selectedDate.format('D MMM YYYY') : startDateOfSelectedMonth.format('MMM YYYY')

        return (
            <div className={CalendarStyle.calendarContainer}>
                <div className="slider-horizontal-ruler ruler-18-70">
                    <Slider value={this.state.age} min={18} max={70} step={1} onChange={this.computeYearFromAge}/>
                </div>
                <div className="row" style={{width: "700px", margin: "0 auto"}}>
                    <div className="col-md-6">
                        {this.state.yearMonthPresenterVisible &&
                            <YearMonthPicker selectedYear={this.state.selectedYear} selectedYearMonth={this.state.selectedYearMonth} onClick={this.handleYearMonthSelection} title={heading}/>
                        }
                        {this.state.datePresenterVisible &&
                            <div className={CalendarStyle.tableHeading} style={{width: "250px", textAlign: "left", paddingLeft: "20px"}}>
                                Your Birthday: <span className={CalendarStyle.highlight}>{birthdayText}</span>
                            </div>
                        }
                    </div>
                    <div className="col-md-6">
                        {this.state.datePresenterVisible &&
                            <DatePicker selectedDate={this.state.selectedDate} openToDate={startDateOfSelectedMonth} onChange={this.handleDateSelection}  title="...and what day were you born on?"/>
                        }
                    </div>
                </div>
            </div>
        )
    }

    computeStateFromDOB = (dob) => {
        if (!dob) {
            return;
        }
        
        let dateAsMoment = moment(dob); 
        let age = moment().diff(dateAsMoment, 'years');
        let selectedYear = dateAsMoment.format('YYYY');
        let selectedYearMonth = dateAsMoment.format('YYYY-MM');
        this.state = {age, selectedYear, selectedYearMonth, selectedDate: dateAsMoment, yearMonthPresenterVisible: true, datePresenterVisible: true};
    }

    computeYearFromAge = (age) => {
        this.setState({age: age, selectedYear: moment().subtract(age+1, 'years').format('YYYY'), yearMonthPresenterVisible: true})
    }

    handleYearMonthSelection = (event) => {
        let selectedYearMonth = event.target.dataset.value;
        this.setState({selectedYearMonth, datePresenterVisible: true});
    }

    handleDateSelection = (moment) => {
        this.setState({selectedDate: moment});
    }
}

/**********************************************************************************************************
 *                                                                                                        *
 *                               PURE STATELESS PRESENTATION COMPONENTS.                                  *
 *     Therefore using the other simpler syntax to create these components. Refer to                      *
 *     https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components  *
 *     for more information.                                                                              *
 *                                                                                                        *
 **********************************************************************************************************/

const YearPicker = ({selectedYear, title, onClick}) => {
    let currentYear = moment().format('YYYY');
    let availableYears = [];
    for (var i=0; i<5; i++) {
        availableYears.push({value: currentYear - i, label: currentYear - i});
    }
    availableYears.push({value: currentYear - 5, label: "Before " + (currentYear - 4)});

    return (
        <TableCreator availableOptions={availableYears} selectedValue={selectedYear} tableWidth="200px" numberOfColumns={2} title={title} onClick={onClick}  style={{display: 'inline-block', padding: '0 10px'}}/>
    );
}

const MonthPicker = ({selectedMonth, title, onClick}) => {
    let availableMonths = Array.apply(0, Array(12)).map(function(_, i) {
        let value = i+1;
        value = ('0' + value).slice(-2);
        return {value, label: moment().month(i).format('MMM')}
    });

    return (
        <TableCreator availableOptions={availableMonths} selectedValue={selectedMonth} tableWidth="300px" numberOfColumns={3} title={title} onClick={onClick} style={{display: 'inline-block', padding: '0 10px'}}/>
    );
}

const YearMonthPicker = ({selectedYearMonth, selectedYear, title, onClick}) => {
    let currentMonth = moment().set('year', selectedYear);
    let availableMonths = Array.apply(0, Array(13)).map(function(_, i) {
        currentMonth.add(1, 'month');
        return {value: currentMonth.format('YYYY-MM'), label: currentMonth.format('MMM YYYY')}
    });
    // Lets round off the number of columns we render
    availableMonths.push({}, {})

    return (
        <TableCreator availableOptions={availableMonths} selectedValue={selectedYearMonth} tableWidth="320px" numberOfColumns={3} title={title} onClick={onClick}/>
    );
}

const DatePicker = ({title, openToDate, selectedDate, onChange}) => (
    <div style={{width: "350px"}}>
        <div className={CalendarStyle.tableHeading}>{title}</div>
        <VendorDatePicker inline openToDate={openToDate} selected={selectedDate} onChange={onChange} />
    </div>
);

const TableCreator = ({tableWidth, title, availableOptions, numberOfColumns, selectedValue, onClick, style={}}) => (
    <div style={{...style, width: tableWidth}}>
        <div className={CalendarStyle.tableHeading}>{title}</div>
        <table className={CalendarStyle.curvedTable}>
            <tbody>
                {CollectionUtils.iterateArrayInGroupsOf(availableOptions, numberOfColumns).map(
                    (row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <CellCreator cell={cell} selectedValue={selectedValue} onClick={onClick} key={cell.value || 'cell' + cellIndex}/>
                            ))}
                        </tr>
                    )
                )}
            </tbody>
        </table>
    </div>
);

const CellCreator = ({cell, selectedValue, onClick}) => {
    if (cell.value) {
        return (
            <td style={{width: "100px"}} className={selectedValue === cell.value ? CalendarStyle.selected :  ""}>
                <a data-value={cell.value} onClick={onClick}>{cell.label}</a>
            </td>
        )
    } else {
        return  <td style={{width: "100px"}}>&nbsp;</td>
    }
}
