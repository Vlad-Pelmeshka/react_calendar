import React from 'react';
import Header from './Header';
import HeaderCalendar from './HeaderCalendar';
import CalendarItem from './CalendarItem';
// import React, { useState } from 'react';

class Calendar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            events: [
                {
                    id: 1,
                    title: 'Event 1',
                    colors: ['red','green','blue'],
                    date: [{
                        year: 2024,
                        month: 2,
                        day: 11
                    }],
                }
            ]
        }

        this.changeMonth    = this.changeMonth.bind(this)
    }

    getWeekDatesForMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0); 

        const firstWeekStartDate = new Date(firstDayOfMonth); 
        firstWeekStartDate.setDate(firstWeekStartDate.getDate() - firstDayOfMonth.getDay());
    
        const lastWeekEndDate = new Date(lastDayOfMonth); 
        lastWeekEndDate.setDate(lastWeekEndDate.getDate() + (6 - lastDayOfMonth.getDay())); 
    
        const weekDates = [];
        let currentDate = new Date(firstWeekStartDate);

        while (currentDate <= lastWeekEndDate) {
            weekDates.push({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                day: currentDate.getDate(),
                currentMonth: (currentDate.getMonth() === this.state.currentMonth),
                monthShortTitle: (currentDate.getDate() === 1 || currentDate.getTime() === lastDayOfMonth.getTime() || currentDate.getTime() === new Date(year, month, 0).getTime()) ? this.getShortMonthTitle(currentDate.getMonth()) : null
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return weekDates;
    }
    
    getShortMonthTitle(month) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[month];
    }
    
    render(){

        let weekDates = this.getWeekDatesForMonth(this.state.currentYear, this.state.currentMonth)
        
        // console.log(weekDates)
        return (
            <div>
                <Header currentYear={this.state.currentYear} currentMonth={this.state.currentMonth} onChangeMonth={this.changeMonth}/>
                <div className="calendar">
                    <HeaderCalendar />
                    <div className="calendar-list calendar-grid">
                        {weekDates.map((el, index) => (
                            <CalendarItem key={index} item={el} events={this.state.events} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    changeMonth(data){
        console.log(data)
        this.setState({
            currentYear:    data.year,
            currentMonth:   data.month,
        })
    }
}

export default Calendar;
