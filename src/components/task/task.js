import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import "./task.css";

export default class Task extends Component {
    state = {
        isEdit: false,
        label: "",
    };

    onEdited = () => {
        this.setState({ isEdit: true });
        this.setState({ label: this.props.label });
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    render() {
        const { label, id, onDeleted, onToggleCompleted, completed, onItemEdit } =
            this.props;

        let classNames = "task";
        if (completed) {
            classNames += " completed";
        }

        const distance = formatDistanceToNow(new Date(), {
            includeSeconds: true,
            addSuffix: true,
        });

        const keyPress = (e) => {
            const code = e.keyCode || e.which;
            if (code === 13) {
                onItemEdit(this.state.label, id);
                //console.log(this.props);
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
                        ></input>
                    </div>
                </li>
            );
        } else {
            return (
                <li className={classNames}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            onChange={onToggleCompleted}
                            checked={completed}
                        ></input>
                        <label>
                            <span className="description">{label}</span>
                            <span className="created">created {distance}</span>
                        </label>
                        <button
                            className="icon icon-edit"
                            onClick={this.onEdited}
                        ></button>
                        <button
                            className="icon icon-destroy"
                            onClick={onDeleted}
                        ></button>
                    </div>
                </li>
            );
        }
    }
}
