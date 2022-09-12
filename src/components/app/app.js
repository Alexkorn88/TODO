import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

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

  // eslint-disable-next-line react/sort-comp
  createTaskItem(label, id) {
    return {
      label,
      className: '',
      completed: false,
      id: id ?? this.maxId++,
      checked: false,
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

  onItemEdit = (text, id) => {
    const newItem = this.createTaskItem(text, id);
    this.setState(({ todoData }) => {
      // eslint-disable-next-line no-return-assign, no-param-reassign
      const newArray = todoData.map((el) => (el.id === id ? (el = newItem) : el));
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTaskItem(text);
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
