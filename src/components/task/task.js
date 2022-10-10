import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

function Task({ label, id, onDeleted, onToggleCompleted, completed, onItemEdit, min, sec }) {
  const [isEdit, setEdit] = useState(false);
  const [labelTask, setLabel] = useState('');
  const [timeSec, setTimeSec] = useState(+min * 60 + +sec);
  const [isTime, setTime] = useState(false);
  const getPadTime = (time) => time.toString().padStart(2, '0');

  const minTask = getPadTime(Math.floor(timeSec / 60));
  const secTask = getPadTime(timeSec - minTask * 60 >= 0 ? getPadTime(timeSec - minTask * 60) : 59);

  const onEdited = () => {
    setEdit(true);
    setLabel(label);
  };

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTime) {
        setTimeSec(() => (timeSec >= 1 ? timeSec - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleStart = () => {
    setTime(true);
  };
  const handleStop = () => {
    setTime(false);
  };

  let classNames = 'task';
  if (completed) {
    classNames += ' completed';
  }

  const distance = formatDistanceToNow(new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });

  const keyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      onItemEdit(labelTask, minTask, secTask, id);
      setEdit(false);
    }
  };

  if (isEdit) {
    return (
      <li className="editing">
        <div className="view">
          <input
            type="text"
            className="edit"
            onChange={onLabelChange}
            value={labelTask}
            key={id}
            onKeyPress={(e) => keyPress(e)}
          />
        </div>
      </li>
    );
  }
  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
        <div className="label">
          <span className="description">
            {label}
            <div className="btn__startStop">
              <button className="icon icon-play" onClick={handleStart} type="button" />
              <button className="icon icon-pause" onClick={handleStop} type="button" />
            </div>
            {minTask}:{secTask}
          </span>
          <span className="created">created {distance}</span>
        </div>
        <button className="icon icon-edit" type="button" onClick={onEdited} />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} />
      </div>
    </li>
  );
}
export default Task;
