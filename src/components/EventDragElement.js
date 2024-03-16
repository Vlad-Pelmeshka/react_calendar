import React from 'react';
import { useDrag } from 'react-dnd';
import Event from './Event';

function EventDragElement({ event, index, obj }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'event', 
        item: { event, index, obj }, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? '0.5' : '1',
                cursor: 'move',
            }}
        >
            <Event
                key={index + '_' + obj.state.uniqueCode}
                uniqueDate={obj.state.uniqueCode}
                uniqueIndex={index}
                event={event}
                onEditForm={(data) => obj.editForm(data, index)}
            />
        </div>
    );
}

export default EventDragElement;
