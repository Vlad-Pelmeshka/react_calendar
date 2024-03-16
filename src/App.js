import React from 'react';
import FormCalendar from './components/FormCalendar';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

class App extends React.Component {

    render(){
        return(
            <DndProvider backend={HTML5Backend}>
                <div>
                    <FormCalendar />
                </div>
            </DndProvider>

        )
    } 


}

export default App