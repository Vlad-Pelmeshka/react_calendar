import React from 'react';
import Header from './components/Header';
import FormCalendar from './components/FormCalendar';

class App extends React.Component {

    render(){
        return(
            <div>
                <Header title="Calendar"/>
                <FormCalendar />
            </div>

        )
    }


}

export default App