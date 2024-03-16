import React from 'react';

class Event extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            event: this.props.event
        }
    }
    
    render(){

        // console.log(this.props.event)
        // console.log(this.state.event.title)
        return(
            <div className="event">
                <div className="event-colors">
                    {this.state.event.colors.map((el, index) => (
                        <div key={index} style={{backgroundColor: el}}></div>
                    ))}
                </div>
                <div className="event-title">{this.state.event.title}</div>
            </div>
        )
    }

}

export default Event