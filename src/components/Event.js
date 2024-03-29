import React from 'react';
import { Tooltip } from 'react-tooltip'
import EventForm from './EventForm';
import 'react-tooltip/dist/react-tooltip.css'

class Event extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            event: this.props.event,
            isOpen: false,
        }

        this.handleClick    = this.handleClick.bind(this)
        this.editForm       = this.editForm.bind(this)
        this.hideTooltip    = this.hideTooltip.bind(this)
    }
    
    render(){
        return(
            <div 
                className={"event " + (this.state.event.search ? "event-search-true " : "") + (this.props.isHoliday ? "event-holiday" : "")}
                data-tooltip-id={"my-tooltip_edit_" + this.props.uniqueDate + "_" + this.props.uniqueIndex} 
                onContextMenu={ (e) => {this.handleClick(e) }} 
                data-tooltip-offset={0} 
                onMouseLeave={ (e) => {this.hideTooltip(e)}}
            >
                <div className="event-colors">
                    {this.state.event.colors.map((el, index) => (
                        <div key={index} style={{backgroundColor: el}}></div>
                    ))}
                </div>
                <div className="event-title">{this.state.event.title}</div>

                { !this.props.isHoliday && <Tooltip 
                    isOpen={this.state.isOpen} 
                    id={"my-tooltip_edit_" + this.props.uniqueDate + "_" + this.props.uniqueIndex} 
                    render={() => <EventForm 
                        styleEl={this.state.opacityEl} 
                        date={this.state.uniqueDate} 
                        event={this.props.event}
                        onEvent={(data) => (this.editForm(data))}
                    />} 
                    style={{pointerVisible: this.state.pointerVisible}}
                />}
                
            </div>
        )
    }

    editForm(data){
        this.props.onEditForm(data)
        this.setState({
            isOpen: false
        })
    }

    handleClick(event){

        event.preventDefault()

        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    
    hideTooltip(event){
        this.setState({ 
            isOpen: false
        })
    }

}

export default Event