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
                {/* <textarea placeholder="Bio" value={this.state.bio} onChange={(e) => this.setState({bio: e.target.value})}></textarea> */}
                {/* <input placeholder="Age" value={this.state.age} type="number" onChange={(e) => this.setState({age: e.target.value})}/> */}
                {/* <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.checked})}/> */}
                <button type="button" onClick={() => {

                    this.eventSet = {
                        title: this.state.title,
                        colors: this.state.colors,
                        // bio: this.state.bio,
                        // age: this.state.age,
                        // isHappy: this.state.isHappy
                    }

                    this.props.onEvent(this.eventSet)
                    this.myForm.reset()
                }}>{this.props.user ? "Save" : "Add"}</button>
            </form>
        )
    }

}

export default EventForm