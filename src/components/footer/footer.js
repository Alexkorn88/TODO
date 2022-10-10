import React from 'react';

import './footer.css';

function Footer({ filter, onFilterChange, clearCompleted, todos }) {
  let buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  buttons = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button className={clazz} type="button" onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  const completedCount = todos.filter((el) => !el.completed).length;

  const arrCompletedId = todos.filter((el) => el.completed).map((el) => el.id);

  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <ul className="filters">{buttons}</ul>
      <button className="clear-completed" type="button" onClick={() => clearCompleted(arrCompletedId)}>
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
