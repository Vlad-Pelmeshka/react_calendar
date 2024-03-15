import React from 'react';
import Event from './Event';

class CalendarItem extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            events: this.props.events
        }
    }

    render(){
        const el = this.props.item;

        return(
            <div className={"calendar-grid-item " + ((el.currentMonth) && 'calendar-current_month')} >
                <div className="calendar-item-container">
                    <div className="calendar-item-head">
                        <b>{((el.monthShortTitle) && (el.monthShortTitle + " ")) + el.day}</b>
                    </div>
                    <div className='calendar-item-event'>
                        { this.state.events.map((event, index) => (
                            <Event key={index + event.date.day} event={event}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}


export default CalendarItem