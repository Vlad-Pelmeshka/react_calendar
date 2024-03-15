import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            month: this.props.currentMonth,
            year: this.props.currentYear
        }

    }

    render(){

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return(
            <header className="container">
                <div className="button_list change_month_list">
                    <button  onClick={() => { this.changeMonth(-1) }}>
                        <IoIosArrowUp/>
                    </button>
                    <button onClick={() => { this.changeMonth(1) }}>
                        <IoIosArrowDown/>
                    </button>
                    
                </div>
                <div className="button_list change_display_list">
                    <button>
                        Month
                    </button>
                </div>

                <div className="title">{months[this.props.currentMonth] + " " + this.props.currentYear}</div>

            </header>
        )
    }

    changeMonth(data){
        if(data === -1 && this.state.month === 0){
            this.state.year--
            this.state.month = 11
        }else if(data === 1 && this.state.month === 11){
            this.state.year++
            this.state.month = 0
        }else{
            this.state.month += data
        }

        this.props.onChangeMonth({year: this.state.year, month: this.state.month})
    }

}

export default Header