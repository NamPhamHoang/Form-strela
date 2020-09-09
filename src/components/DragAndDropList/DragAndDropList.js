import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DragAndDropList = ({ data, onChangeOrder, onDelete, listItem, containerClass = '' }) => {
    return (
        <DragDropContext
            onDragEnd={onChangeOrder}
        >
            {
                data.columnOrder.map(columnId => {
                    const column = data.columns[columnId];
                    const items = column.ids.map(id => data.items[id]);
                    return (
                        <div key={columnId} className={`w-100 ${containerClass}`}>
                            <Droppable droppableId={columnId}>
                                {provided => (
                                    <ul
                                        className="list-group"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {items.map((item, index) => (
                                            <Draggable draggableId={item.id} index={index} key={item.id}>
                                                {(provided) => (
                                                    <li
                                                        className="list-group-item"
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {listItem(item, onDelete)}
                                                    </li>
                                                )}
                                            </Draggable>),
                                        )}
                                        {provided.placeholder}
                                    </ul>

                                )}
                            </Droppable>
                        </div>
                    );
                })
            }
        </DragDropContext>
    );
};

DragAndDropList.defaultProps = {
    containerClass: '',
};

DragAndDropList.propTypes = {
    data: PropTypes.object.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    listItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default DragAndDropList;