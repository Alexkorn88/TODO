import React, { useState } from 'react';

import './header.css';

function Header({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sec') {
      setSec(value);
    }
    if (name === 'min') {
      setMin(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onItemAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };
  const onKeyUpInput = (e) => {
    const timeSec = +min * 60 + +sec;
    const isTime = min || sec;
    if (e.key === 'Enter' && label && isTime) {
      onItemAdded(label, timeSec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <div className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          name="task"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
          onKeyUp={onKeyUpInput}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          name="min"
          max="60"
          min="0"
          onChange={onTimeChange}
          value={min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          name="sec"
          max="60"
          min="0"
          onChange={onTimeChange}
          value={sec}
        />
      </form>
    </div>
  );
}
export default Header;
