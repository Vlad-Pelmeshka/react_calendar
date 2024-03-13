import React from 'react';

class CalendarItem extends React.Component {

    render(){
        const el = this.props.item;

        return(
            <div className={"calendar-grid-item " + ((el.currentMonth) && 'calendar-current_month')} >
                <div className="calendar-item-container">
                    <div className="calendar-item-head">
                        <b>{((el.monthShortTitle) && (el.monthShortTitle + " ")) + el.day}</b>
                    </div>
                </div>
            </div>
        )
    }

}


export default CalendarItem