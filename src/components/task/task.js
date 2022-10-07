/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-dupe-class-members */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  state = {
    isEdit: false,
    label: '',
    timeSec: +this.props.min * 60 + +this.props.sec,
    isTime: false,
    min: this.props.min,
    sec: this.props.sec,
  };

  // componentDidMount() {
  //   const userTimer = localStorage.getItem('timer');
  //   if (userTimer) {
  //     this.setState({ count: +userTimer });
  //   }
  // }
  // componentDidUpdate() {
  //   localStorage.setItem('timer', this.state.timeSec);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.timeId);
  // }
  // onEdited = () => {
  //   this.setState({ isEdit: true });
  //   this.setState({ label: this.props.label });
  // };

  // onLabelChange = (e) => {
  //   this.setState({
  //     label: e.target.value,
  //   });
  // };
  onEdited = () => {
    this.setState({ isEdit: true });
    this.setState({ label: this.props.label });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  getPadTime = (time) => time.toString().padStart(2, '0');

  handleStart = () => {
    if (this.state.isTime) return;
    this.setState({ isTime: true });
    this.setState({ timeSec: this.state.timeSec >= 1 ? this.state.timeSec - 1 : 0 });
    this.timeId = setInterval(() => {
      this.setState({ timeSec: this.state.timeSec >= 1 ? this.state.timeSec - 1 : 0 });
      this.setState({
        min: this.getPadTime(Math.floor(this.state.timeSec / 60)),
        sec:
          this.getPadTime(this.state.timeSec - this.state.min * 60) >= 0
            ? this.getPadTime(this.state.timeSec - this.state.min * 60)
            : 59,
      });
    }, 1000);
  };
  handleStop = () => {
    this.setState({ isTime: false });
    clearInterval(this.timeId);
  };
  render() {
    const { label, id, onDeleted, onToggleCompleted, completed, onItemEdit } = this.props;

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
        onItemEdit(this.state.label, this.state.min, this.state.sec, id);
        this.setState({ isEdit: false });
      }
    };

    if (this.state.isEdit) {
      return (
        <li className="editing">
          <div className="view">
            <input
              type="text"
              className="edit"
              onChange={this.onLabelChange}
              value={this.state.label}
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
          <label>
            <span className="description">
              {label}
              <button className="icon icon-play" onClick={this.handleStart} />
              <button className="icon icon-pause" onClick={this.handleStop} />
              {this.state.min}:{this.state.sec}
            </span>
            <span className="created">created {distance}</span>
          </label>
          <button className="icon icon-edit" type="button" onClick={this.onEdited} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
