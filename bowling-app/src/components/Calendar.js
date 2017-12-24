import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

const Year = 2017

const Months = [
  { id: 0, name: "January", numberOfDays: 31},
  { id: 1, name: "February", numberOfDays: 28},
  { id: 2, name: "March", numberOfDays: 31},
  { id: 3, name: "April", numberOfDays: 30},
  { id: 4, name: "May", numberOfDays: 31},
  { id: 5, name: "June", numberOfDays: 30},
  { id: 6, name: "July", numberOfDays: 31},
  { id: 7, name: "August", numberOfDays: 31},
  { id: 8, name: "September", numberOfDays: 30},
  { id: 9, name: "October", numberOfDays: 31},
  { id: 10, name: "November", numberOfDays: 30},
  { id: 11, name: "December", numberOfDays: 31}
];

class DaysOfWeek extends Component {
  render() {
    return <div className="weekdays">
    <span className='day-of-week'>
      Sunday
    </span>
          <span className='day-of-week'>
      Monday
    </span>
          <span className='day-of-week'>
      Tuesday
    </span>
          <span className='day-of-week'>
      Wednesday
    </span>
          <span className='day-of-week'>
      Thursday
    </span>
          <span className='day-of-week'>
      Friday
    </span>
          <span className='day-of-week'>
      Saturday
    </span>
      </div>
  }
}

class DaysOfMonth extends Component {
  firstWeekdayOfMonth(Year, Month) {
    var theDate = new Date(Year, Month, 1);

    switch (theDate.getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      default:
        return "Saturday";
    }
  }
  render() {
    const month = this.props.monthData;
    const firstDayOfMonth = this.firstWeekdayOfMonth(
      2017, month.id
    ).toLowerCase();
    
    let daysCollection = [];
    let i = 1;
    let numberOfDays = month.numberOfDays;
    while (i <= numberOfDays) {
      daysCollection.push(
        <span
          className={
            "day-of-month " + (i === 1 ? "first-day-" + firstDayOfMonth : null)
          }
        >
          {i}
        </span>
      );
      i++;
    }

    return (
      <div>
        {daysCollection}
      </div>
    );
  }
}

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      activeMonthIndex: 0
    };
    this.updateMonthView = this.updateMonthView.bind(this);
  }

  drawMonthSelector() {
    let buttonCollection = [];
    let counter = 0;

    Months.map(month => {
      const monthIndex = counter;
      buttonCollection.push(
        <option value={monthIndex}>
          {month.name}
        </option>
      );
      counter++;
    });

    return (
      <select onChange={(e) => this.updateMonthView(e)} className="month-selector">
        {buttonCollection}
      </select>
    );
  }

  updateMonthView(event) {
    this.setState({ activeMonthIndex: event.target.value });
  }

  render() {
    return (
      <div id='Calendar'>
        
        <h1>{Months[this.state.activeMonthIndex].name} {Year}</h1>
        {this.drawMonthSelector()}
        <DaysOfWeek />
        <DaysOfMonth
          monthData={Months[this.state.activeMonthIndex]} year={Year}
        />
      </div>
    );
  }
}

export default Calendar;