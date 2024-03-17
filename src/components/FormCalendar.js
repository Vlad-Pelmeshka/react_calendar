import React from 'react';
import Header from './Header';
import HeaderCalendar from './HeaderCalendar';
import CalendarItem from './CalendarItem';
import axios from 'axios';

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
                                title: 'Long description event. For test long title display on two lines.',
                                colors: ['#ff0000','#0000ff'],
                            }
                        ],
                        17: [
                            {
                                title: 'Event 1',
                                colors: ['#ff0000','#00ff00'],
                            },
                            {
                                title: 'Event 2',
                                colors: ['#ff9955','#00ff00'],
                            },
                            {
                                title: 'Event 3',
                                colors: ['#0000ff','#ff9955'],
                            }
                        ]
                    },
                    3: {
                        1: [
                            {
                                title: 'Event 3-1',
                                colors: ['#ff0000','#00ff00'],
                            }
                        ]
                    }
                }
            },
            countryCode: 'GB',
            today: {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate()
            }
        }

        this.changeMonth    = this.changeMonth.bind(this)
        this.createForm     = this.createForm.bind(this)
        this.getHolidays    = this.getHolidays.bind(this)

        this.getHolidays();
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
        
        return (
            <div>
                <Header 
                    currentYear={ this.state.currentYear } 
                    currentMonth={ this.state.currentMonth } 
                    onChangeMonth={ this.changeMonth }
                    onSearch={ (data) => this.setSearch(data) }
                />
                <div className="calendar">
                    <HeaderCalendar />
                    <div className="calendar-list calendar-grid">
                        { weekDates.map((el, index) => {
                                return( 
                                    <CalendarItem 
                                        key={el.year + '_' + el.month + '_' + el.day + '_' + el.index} item={el} 
                                        onCreateForm={(data) => this.createForm([data, el])}
                                        onDrop={(data, obj) => this.onDrop(data, obj)} 
                                        onEditForm={(data, index) => this.editForm(data, index, el.year, el.month, el.day)}
                                        events={ this.state.events ? (this.state.events[el.year] ? (this.state.events[el.year][el.month] ? (this.state.events[el.year][el.month][el.day] ?? []) : []) : []) : []} 
                                        holidays={ this.state.holidays ? (this.state.holidays[el.year] ? (this.state.holidays[el.year][el.month] ? (this.state.holidays[el.year][el.month][el.day] ?? []) : []) : []) : []}
                                        isToday={ (this.state.today.year === el.year && this.state.today.month === el.month && this.state.today.day === el.day) ? true : false}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    getHolidays(year = this.state.currentYear){

        let holidaysList = []
        for(let i = year - 1; i <= year + 1; i++){
            let baseUrl = "https://date.nager.at/api/v3/PublicHolidays/" + i + "/" + this.state.countryCode


            axios.get(baseUrl).then((res) => {
                let holidays = res.data

                holidays.map((event) => {
                    let date = new Date(event.date)
                    if(!holidaysList[date.getFullYear()])
                        holidaysList[date.getFullYear()] = []
                    if(!holidaysList[date.getFullYear()][date.getMonth()])
                        holidaysList[date.getFullYear()][date.getMonth()] = []
                    if(!holidaysList[date.getFullYear()][date.getMonth()][date.getDate()])
                        holidaysList[date.getFullYear()][date.getMonth()][date.getDate()] = []

                    holidaysList[date.getFullYear()][date.getMonth()][date.getDate()].push({
                        title: event.localName,
                        colors: ['#ffcccc']
                    })
                })
                this.setState({ holidays: holidaysList })
            })
        }
    }

    changeMonth(data){
        if(this.state.currentYear !== data.year)
            this.getHolidays(data.year)

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

    setSearch(search){
        
        let events   = this.serachInObj(search, this.state.events)
        let holidays = this.serachInObj(search, this.state.holidays)

        this.setState({ events: {}}, () => {
            this.setState({ events: events })
        })

        this.setState({ holidays: {}}, () => {
            this.setState({ holidays: holidays })
        })
    }

    serachInObj(searchQuery, events){
    
        for (const year in events) {
            for (const month in events[year]) {
                for (const day in events[year][month]) {
                    for (const event of events[year][month][day]) {
                        console.log(event)
                        if (searchQuery && event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                            event.search = true
                        }else{
                            if(event.search)
                                event.search = false
                        }
                    }
                }
            }
        }

        return events;
    }

    onDrop(data, obj){
        let events = this.state.events
        let date = obj.props.item
        let event_date = data.obj.props.item

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
