import React, { useState } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';
import './appTimer.css';

function App() {
  let maxId = 100;
  const createTaskItem = (label, min, sec, id) => ({
    label,
    className: '',
    completed: false,
    id: id ?? maxId++,
    checked: false,
    min: min ?? '00',
    sec: sec ?? '59',
    timeSec: null,
  });
  const [todoData, setTodoData] = useState([
    createTaskItem('Complit task'),
    createTaskItem('Editing task'),
    createTaskItem('Active task'),
  ]);
  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const onItemEdit = (text, min, sec, id) => {
    const newItem = createTaskItem(text, min, sec, id);
    // eslint-disable-next-line arrow-body-style
    // eslint-disable-next-line no-return-assign, no-param-reassign
    setTodoData(() => todoData.map((el) => (el.id === id ? (el = newItem) : el)));
  };

  const getPadTime = (time) => time.toString().padStart(2, '0');

  const addItem = (text, timeSec) => {
    const min = getPadTime(Math.floor(timeSec / 60));
    const sec = getPadTime(timeSec - min * 60);
    const newItem = createTaskItem(text, min, sec);
    setTodoData(() => [...todoData, newItem]);
  };

  const chooseFilter = (items, filterChoose) => {
    switch (filterChoose) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  const onFilterChange = (filterChange) => {
    setFilter(filterChange);
  };

  const onToggleCompleted = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
      };
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const clearCompleted = (arr) => arr.map((item) => deleteItem(item));

  const visibleItems = chooseFilter(todoData, filter);

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onItemEdit={onItemEdit}
        />
        <Footer todos={todoData} filter={filter} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}

export default App;
