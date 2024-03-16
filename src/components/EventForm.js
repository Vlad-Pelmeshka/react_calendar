import React, { useState }  from 'react';
import InputColor from 'react-input-color';
import FormColor from './FormColor';

class EventForm extends React.Component {
    eventSet = {}
    constructor(props){
        super(props)
        
        this.state = this.props.event ?? {
            title: "",
            colors: [],
            day: this.props.day,
            month: this.props.month,
            year: this.props.year
        }
    }

    getDate(){
        if(this.props.date){
            return (
                <div className="tooltip-title">{this.props.date}</div>
            )
        }
    }

    render(){        
        
        return(
            <form className="event-form" ref={(el) => this.myForm = el}>
                { this.getDate() }
                <div className="event-form-line">
                    <input placeholder="Event Title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                </div>
                <div className="event-form-line">
                    <label htmlFor="color">Color:</label>
                    {/* <input id="color" type="color" value={this.state.colors[0]} /> */}
                    <FormColor color={this.state.colors[0] ?? '#00ff00'} onSetColor={(data) => {this.setState({colors: [data.hex]})}} />
                </div>
                <button type="button" onClick={() => {

                    this.eventSet = {
                        title: this.state.title,
                        colors: this.state.colors,
                    }

                    this.props.onEvent(this.eventSet)
                    this.myForm.reset()
                }}>
                    {this.props.event ? "Save" : "Add"}
                </button>
                
                {this.props.event && <button type="button" onClick={() => {
                    this.eventSet = {
                        deleteEvent: true
                    }

                    this.props.onEvent(this.eventSet)
                    this.myForm.reset()
                    }}>Delete
                </button>}
                
            </form>
        )
    }


}

export default EventForm