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
            // currentDay: 0,
            /*events: [
                {
                    2024: [ 
                        {
                            2: [
                                {
                                    11: [
                                        {
                                            id: 1,
                                            title: 'Event 1',
                                            colors: ['red','green','blue'],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]*/
            events: {
                2024: {
                    2: {
                        11: [
                            {
                                title: 'Event 1Event 1Event 1Event 1Event 1Event 1Event 1',
                                colors: ['#ff0000','#0000ff'],
                            },
                            {
                                title: 'Event 11',
                                colors: ['#ff9955','#00ff00'],
                            },
                            {
                                title: 'Event 21',
                                colors: ['#0000ff','#ff9955'],
                            }
                        ],
                        17: [
                            {
                                title: 'Event 17',
                                colors: ['#ff0000','#00ff00'],
                            }
                        ]
                    },
                    3: {
                        21: [
                            {
                                title: 'Event 2',
                                colors: ['#ff0000','#00ff00'],
                            }
                        ]
                    },
                    4: {
                        1: [
                            {
                                title: 'Event 3',
                                colors: ['#ff0000','#ff6f00'],
                            }
                        ]
                    },
                }
            }
        }

        this.changeMonth    = this.changeMonth.bind(this)
        // this.setDate        = this.setDate.bind(this)
        this.createForm     = this.createForm.bind(this)
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

        // console.log(this.state.currenDate)
        // console.log(this.state.currentYear)
        let weekDates = this.getWeekDatesForMonth(this.state.currentYear, this.state.currentMonth)
        
        // console.log(weekDates)
        return (
            <div>
                <Header currentYear={this.state.currentYear} currentMonth={this.state.currentMonth} onChangeMonth={this.changeMonth}/>
                <div className="calendar">
                    <HeaderCalendar />
                    <div className="calendar-list calendar-grid">
                        { weekDates.map((el, index) => {
                                // this.setDate([
                                //     el.year,
                                //     el.month,
                                //     el.day,
                                // ])
                                // this.setState({
                                    // currentYear: data.year,
                                    // currentMonth: data.month,
                                    // currentDay: el.day
                                // })
                                return( 
                                    /*<CalendarItem 
                                        key={el.year + '_' + el.month + '_' + el.day + '_' + el.index} item={el} 
                                        events={ this.state.events ? (this.state.events[el.year] ? (this.state.events[el.year][el.month] ? (this.state.events[el.year][ el.month][el.day] ?? []) : []) : []) : []} 
                                    />*/
                                    <CalendarItem 
                                        key={el.year + '_' + el.month + '_' + el.day + '_' + el.index} item={el} 
                                        onCreateForm={(data) => this.createForm([data, el])}
                                        onEditForm={(data, index) => this.editForm(data, index, el.year, el.month, el.day)}
                                        events={ this.state.events ? (this.state.events[this.state.currentYear] ? (this.state.events[this.state.currentYear][this.state.currentMonth] ? (this.state.events[this.state.currentYear][this.state.currentMonth][el.day] ?? []) : []) : []) : []} 
                                    />
                                )
                            })
                        }
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

    editForm(data, index, year, month, day){

        let events = this.state.events

        if(data.deleteEvent){
            delete events[year][month][day][index]
        }else
            events[year][month][day][index] = data

        this.setState({ events: {}}, () => {
            this.setState({ events: events })
        })
    }

    createForm(data){
        let events = this.state.events

        if(!events)
            events = []
        if(!events[data[1].year])
            events[data[1].year] = []
        if(!events[data[1].year][data[1].month])
            events[data[1].year][data[1].month] = []
        if(!events[data[1].year][data[1].month][data[1].day])
            events[data[1].year][data[1].month][data[1].day] = []

        events[data[1].year][data[1].month][data[1].day].push(data[0])

        // newEvents = this.state.events

        console.log(events[data[1].year][data[1].month])

        this.setState({ events: {}}, () => {
            this.setState({ events: events })
        })
    }
}

export default Calendar;
