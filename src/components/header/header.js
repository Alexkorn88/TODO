import React, { Component } from 'react';

// import NewTaskForm from "../new-task-form";

import './header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onTimeChange = (e) => {
      const { name, value } = e.target;
      if (name === 'sec') {
        this.setState({
          sec: value,
        });
      }
      if (name === 'min') {
        this.setState({
          min: value,
        });
      }
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onItemAdded(this.state.label, this.state.min, this.state.sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    };
    this.onKeyUpInput = (e) => {
      const timeSec = +this.state.min * 60 + +this.state.sec;
      const isTime = this.state.min || this.state.sec;
      if (e.key === 'Enter' && this.state.label && isTime) {
        this.props.onItemAdded(this.state.label, timeSec);
        this.setState({
          label: '',
          min: '',
          sec: '',
        });
      }
    };
  }

  render() {
    return (
      <div className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            type="text"
            className="new-todo"
            name="task"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
            onKeyUp={this.onKeyUpInput}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            name="min"
            max="60"
            min="0"
            onChange={this.onTimeChange}
            value={this.state.min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            name="sec"
            max="60"
            min="0"
            onChange={this.onTimeChange}
            value={this.state.sec}
          />
        </form>
      </div>
    );
  }
}
