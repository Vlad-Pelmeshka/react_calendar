import React from 'react';
import { useDrop } from 'react-dnd';
import EventDragElement from './EventDragElement';

function DropTargetComponent({ obj, onDrop }) {
    
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event', 
    drop: (item) => onDrop(item, obj), 
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div className='calendar-item-event'
      ref={drop} 
      style={{
        border: isOver ? '2px dashed gray' : 'none',
      }}
    >
        { obj.props.holidays.map((event, index) => (
            <EventDragElement event={event} index={index} obj={obj} key={index} isHoliday="true"/>
        ))}
        { obj.props.events.map((event, index) => (
            <EventDragElement event={event} index={index} obj={obj} key={index}/>
        ))}
    </div>
  );
}

export default DropTargetComponent;
