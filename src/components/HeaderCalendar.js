import React from 'react';

class HeaderCalendar extends React.Component {
    render(){

        const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return(
        <div className="calendar-head calendar-grid">
            {weekNames.map((el,index) => (
                <div className="calendar-head-item" key={index} key_name={el}>{el}</div>
            ))} 
        </div>
        )
    }


}

export default HeaderCalendar