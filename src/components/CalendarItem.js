import React, { useState } from 'react';
import Event from './Event';
import { Tooltip } from 'react-tooltip'
import EventForm from './EventForm';
import 'react-tooltip/dist/react-tooltip.css'


class CalendarItem extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            events: this.props.events,
            isOpen: false,
            
        }

        this.handleClick    = this.handleClick.bind(this)
    }

    render(){
        const el = this.props.item

        return(
            <div 
                className={"calendar-grid-item " + ((el.currentMonth) && 'calendar-current_month')} 
                data-tooltip-id={"my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year} 
                events={['click']}
                onContextMenu={ (e) => {this.handleClick(e, el) }} 
                data-tooltip-offset={0} 
                onMouseLeave={ (e) => {this.hideTooltip(e, el)}}
                data-tooltip-delay-hide={1000}
            >
                <div className="calendar-item-container">
                    <div className="calendar-item-head"  >
                        <b>{((el.monthShortTitle) && (el.monthShortTitle + " ")) + el.day}</b>
                    </div>
                    { this.getEvents(el) }
                </div>

                <Tooltip 
                    isOpen={this.state.isOpen} 
                    id={"my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year} 
                    render={() => <EventForm 
                        styleEl={this.state.opacityEl} date={el.year + "-" + el.month + "-" + el.day} 
                        onEvent={(data) => (this.createForm(data))}
                    />} 
                    style={{pointerVisible: this.state.pointerVisible}}
                />
            </div>
        )
    }

    createForm(data){
        this.props.onCreateForm(data)
        this.setState({
            isOpen: false
        })
    }

    handleClick(event, el){
        if (!event.target.closest('.event')) {
            event.preventDefault()

            this.setState({
                isOpen: !this.state.isOpen
            })
            // console.log("my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year)
            // console.log(document.getElementById("my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year))
            // document.getElementById("my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year).classList.add('event-pointer')
            // console.log(document.getElementById("my-tooltip_add" + '_' + el.day + '_' + el.month + '_' + el.year))
            
        }
    }

    hideTooltip(event, el){
        this.setState({ 
            isOpen: false
        })
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