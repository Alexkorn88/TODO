/* eslint-disable react/button-has-type */
import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';
import './appTimer.css';

export default class App extends Component {
  maxId = 100;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    todoData: [
      this.createTaskItem('Complit task'),
      this.createTaskItem('Editing task'),
      this.createTaskItem('Active task'),
    ],
    filter: 'all',
  };

  // componentDidMount() {
  //   // eslint-disable-next-line no-unused-expressions
  //   localStorage.getItem('state') && this.setState(() => JSON.parse(localStorage.getItem('state')));
  // }

  // componentDidUpdate() {
  //   localStorage.setItem('state', JSON.stringify(this.state));
  // }

  // eslint-disable-next-line react/sort-comp
  createTaskItem(label, min, sec, id) {
    return {
      label,
      className: '',
      completed: false,
      id: id ?? this.maxId++,
      checked: false,
      min: min ?? '00',
      sec: sec ?? '59',
      timeSec: null,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onItemEdit = (text, min, sec, id) => {
    const newItem = this.createTaskItem(text, min, sec, id);
    this.setState(({ todoData }) => {
      // eslint-disable-next-line no-return-assign, no-param-reassign
      const newArray = todoData.map((el) => (el.id === id ? (el = newItem) : el));
      return {
        todoData: newArray,
      };
    });
  };

  getPadTime = (time) => time.toString().padStart(2, '0');

  addItem = (text, timeSec) => {
    const min = this.getPadTime(Math.floor(timeSec / 60));
    const sec = this.getPadTime(timeSec - min * 60);
    const newItem = this.createTaskItem(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  chooseFilter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
      };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  clearCompleted = (arr) => {
    const newArr = arr.map((item) => this.deleteItem(item));
    return {
      todoData: newArr,
    };
  };

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.chooseFilter(todoData, filter);
    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onItemEdit={this.onItemEdit}
          />
          <Footer
            todos={todoData}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
