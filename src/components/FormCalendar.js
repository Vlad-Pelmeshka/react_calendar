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
                        29: [
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
        
        return (
            <div>
                <Header currentYear={this.state.currentYear} currentMonth={this.state.currentMonth} onChangeMonth={this.changeMonth}/>
                <div className="calendar">
                    <HeaderCalendar />
                    <div className="calendar-list calendar-grid">
                        { weekDates.map((el, index) => {
                                // this.setState({
                                    // currentYear: data.year,
                                    // currentMonth: data.month,
                                    // currentDay: el.day
                                // })
                                return( 
                                    <CalendarItem 
                                        key={el.year + '_' + el.month + '_' + el.day + '_' + el.index} item={el} 
                                        onCreateForm={(data) => this.createForm([data, el])}
                                        onDrop={(data, obj) => this.onDrop(data, obj)} 
                                        onEditForm={(data, index) => this.editForm(data, index, el.year, el.month, el.day)}
                                        events={ this.state.events ? (this.state.events[el.year] ? (this.state.events[el.year][el.month] ? (this.state.events[el.year][el.month][el.day] ?? []) : []) : []) : []} 
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
        // console.log(data)
        this.setState({
            currentYear:    data.year,
            currentMonth:   data.month,
        })
    }

    editForm(data, index, year, month, day){

        let events = this.state.events

        if(data.deleteEvent)
            delete events[year][month][day][index]
        else if(data.title)
            events[year][month][day][index] = data
        else
            alert("Title can`t be empty")
        

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

        if(data[0].title)
            events[data[1].year][data[1].month][data[1].day].push(data[0])
        else
            alert("Title can`t be empty")

        // console.log(events[data[1].year][data[1].month])

        this.setState({ events: {}}, () => {
            this.setState({ events: events })
        })
    }

    onDrop(data, obj){
        let events = this.state.events
        let date = obj.props.item
        let event_date = data.obj.props.item

        console.log(data);
        if(!events)
            events = []
        if(!events[date.year])
            events[date.year] = []
        if(!events[date.year][date.month])
            events[date.year][date.month] = []
        if(!events[date.year][date.month][date.day])
            events[date.year][date.month][date.day] = []

        delete events[event_date.year][event_date.month][event_date.day][data.index]
        events[date.year][date.month][date.day].unshift(data.event)

        this.setState({ events: {}}, () => {
            this.setState({ events: events })
        })
            
    }
}

export default Calendar;
