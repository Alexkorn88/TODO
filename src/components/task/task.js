import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      label: '',
    };
    this.onEdited = () => {
      this.setState({ isEdit: true });
      this.setState({ label: this.props.label });
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
    this.onEdited = () => {
      this.setState({ isEdit: true });
      this.setState({ label: this.props.label });
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
  }

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
        onItemEdit(this.state.label, id);
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
            <span className="description">{label}</span>
            <span className="created">created {distance}</span>
          </label>
          <button className="icon icon-edit" type="button" onClick={this.onEdited} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
