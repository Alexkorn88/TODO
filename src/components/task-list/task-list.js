import React from 'react';

import './task-list.css';

import Task from '../task';

function TaskList({ todos, onDeleted, onToggleCompleted, onEdited, onItemEdit }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onEdited={() => onEdited(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onItemEdit={onItemEdit}
      />
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
}

export default TaskList;
