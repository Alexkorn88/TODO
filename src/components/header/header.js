import React, { Component } from "react";

//import NewTaskForm from "../new-task-form";

import "./header.css";

export default class Header extends Component {
    state = {
        label: "",
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: "",
        });
    };

    render() {
        return (
            <div className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autoFocus
                        onChange={this.onLabelChange}
                        value={this.state.label}
                    ></input>
                </form>
            </div>
        );
    }
}
