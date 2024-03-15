import React from 'react';

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

    render(){
        
        return(
            <form className="event-form" ref={(el) => this.myForm = el}>
                <input placeholder="Title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                {/* <input placeholder="Surname" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/> */}
                {/* <textarea placeholder="Bio" value={this.state.bio} onChange={(e) => this.setState({bio: e.target.value})}></textarea> */}
                {/* <input placeholder="Age" value={this.state.age} type="number" onChange={(e) => this.setState({age: e.target.value})}/> */}
                {/* <label htmlFor="isHappy">Are you happy?</label> */}
                {/* <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.checked})}/> */}
                <button type="button" onClick={() => {

                    this.eventSet = {
                        title: this.state.title,
                        // lastName: this.state.lastName,
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