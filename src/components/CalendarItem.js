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
        const el = this.props.item

        console.log(this.props.events)

        return(
            <div className={"calendar-grid-item " + ((el.currentMonth) && 'calendar-current_month')} onContextMenu={ (e) => {this.handleClick(e)}}>
                <div className="calendar-item-container">
                    <div className="calendar-item-head"  >
                        <b>{((el.monthShortTitle) && (el.monthShortTitle + " ")) + el.day}</b>
                    </div>
                    { this.getEvents(el) }
                    
                </div>
            </div>
        )
    }

    handleClick(event){
        if (!event.target.closest('.event')) {
            event.preventDefault()
            
            
        }
    }

    getEvents(el){
        if(this.state.events)
            return(<div className='calendar-item-event'>
                { this.state.events.map((event, index) => (
                    <Event key={index + '_' + el.day + '_' + el.month + '_' + el.year} event={event}/>
                ))}
            </div>)
    }

}


export default CalendarItem