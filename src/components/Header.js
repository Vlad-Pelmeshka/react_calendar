import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            month: this.props.currentMonth,
            year: this.props.currentYear
        }

        this.changeMonth = this.changeMonth.bind(this)
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

        let year    = this.state.year
        let month   = this.state.month
        
        if(data === -1 && this.state.month === 0){
            year--
            month = 11
            this.setState({ year: year })
            this.setState({ month: month })
        }else if(data === 1 && this.state.month === 11){
            year++
            month = 0
            this.setState({ year: year })
            this.setState({ month: month })
        }else{
            month += data
            this.setState({ month: this.state.month+data })
        }

        this.props.onChangeMonth({year: year, month: month})
    }

}

export default Header