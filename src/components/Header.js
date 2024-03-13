import React from 'react';

class Header extends React.Component {
    render(){
        return(
        <header className="container">
            {this.props.title} 
        </header>
        )
    }

}

export default Header