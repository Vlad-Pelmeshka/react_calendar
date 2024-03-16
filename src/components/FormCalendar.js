import React from 'react';
import Header from './Header';
import HeaderCalendar from './HeaderCalendar';
import CalendarItem from './CalendarItem';
// import React, { useState } from 'react';

class Calendar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            // currentYear: new Date().getFullYear(),
            // currentMonth: new Date().getMonth(),
            currenDate: [
                new Date().getFullYear(),
                new Date().getMonth(),
                0
            ],
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
                currentMonth: (currentDate.getMonth() === this.state.currenDate.month),
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

        let weekDates = this.getWeekDatesForMonth(this.state.currenDate.year, this.state.currenDate.month)
        
        // console.log(weekDates)
        return (
            <div>
                <Header currentYear={this.state.currenDate.year} currentMonth={this.state.currenDate.month} onChangeMonth={this.changeMonth}/>
                <div className="calendar">
                    <HeaderCalendar />
                    <div className="calendar-list calendar-grid">
                        { weekDates.map((el, index) => {
                                this.setDate([
                                    el.year,
                                    el.month,
                                    el.day,
                                ])
                                return( <CalendarItem 
                                    key={el.year + '_' + el.month + '_' + el.day + '_' + el.index} 
                                    onCreateForm={(data) => this.createForm([data, el])}
                                    item={el} events={ this.state.events ? (this.state.events[this.state.currenDate.year] ? (this.state.events[this.state.currenDate.year][this.state.currenDate.month] ? (this.state.events[this.state.currenDate.year][this.state.currenDate.month][this.state.currenDate.day] ?? []) : []) : []) : []} 
                                />)
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    setDate(data){
        console.log(data)
        this.setState({
            currenDate:    [
                data.year,
                data.month,
                data.date
            ]
        })
    }

    changeMonth(data){
        console.log(data)
        this.setState({
            currentYear:    data.year,
            currentMonth:   data.month,
        })
    }

    createForm(data){
        let newEvents = this.state.events

        if(!this.state.events[data[1].year][data[1].month][data[1].day])
            this.state.events[data[1].year][data[1].month][data[1].day] = []


        // this.state.events[data[1].year][data[1].month][data[1].day].push(data[0])
        this.state.events[data[1].year][data[1].month][data[1].day].push(data[0])

        newEvents = this.state.events

        console.log(newEvents[data[1].year][data[1].month])

        // this.setState({
        //     events:    newEvents
        // })

        this.setState({ events: {}}, () => {
            this.setState({ events: newEvents })
        })
    }
}

export default Calendar;
