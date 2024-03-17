import React from 'react';
import { Tooltip } from 'react-tooltip';
import EventForm from './EventForm';
import 'react-tooltip/dist/react-tooltip.css';
import EventDropBox from './EventDropBox';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

class CalendarItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            uniqueCode: this.props.item.day + "-" + this.props.item.month + "-" + this.props.item.year 
        }

        this.handleClick    = this.handleClick.bind(this)
        this.createForm     = this.createForm.bind(this)
        this.hideTooltip    = this.hideTooltip.bind(this)
    }

    render(){
        const el = this.props.item
        return(
            <div
            className={"calendar-grid-item " + ((el.currentMonth) ? "calendar-current_month " : "") + (this.props.isToday ? "today" : "") } 
            data-tooltip-id={"my-tooltip_add_" + this.state.uniqueCode} 
            onContextMenu={ (e) => {this.handleClick(e, el) }} 
            data-tooltip-offset={0} 
            onMouseLeave={ (e) => {this.hideTooltip(e, el)}}
            >
                <div className="calendar-item-container">
                    <div className="calendar-item-head">
                    <b>{((el.monthShortTitle) && (el.monthShortTitle + " ")) + el.day}</b>
                    </div>
                    <DndProvider backend={HTML5Backend}>
                        <EventDropBox
                            obj={this}
                            onDrop={(data, obj) => this.props.onDrop(data, obj)}
                            events={this.props.events}
                            holidays={this.props.holidays}
                        />
                    </DndProvider>
                </div>
                <Tooltip
                    isOpen={this.state.isOpen}
                    id={"my-tooltip_add_" + this.state.uniqueCode} 
                    render={() => (
                        <EventForm
                            styleEl={this.state.opacityEl}
                            date={this.state.uniqueCode}
                            onEvent={(data) => this.createForm(data)}
                        />
                    )}
                    style={{ pointerVisible: this.state.pointerVisible }}
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

    editForm(data, index){
        this.props.onEditForm(data, index)
    }

    handleClick(event, el){
        if (!event.target.closest('.event')) {
            event.preventDefault()
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
    }

    hideTooltip(event, el){
        this.setState({
            isOpen: false
        })
    }
}

export default CalendarItem