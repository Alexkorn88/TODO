import React, { Component } from "react";

import "./footer.css";

export default class Footer extends Component {
    buttons = [
        { name: "all", label: "All" },
        { name: "active", label: "Active" },
        { name: "completed", label: "Completed" },
    ];

    render() {
        const { filter, onFilterChange, clearCompleted } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name;
            const clazz = isActive ? "selected" : "";
            return (
                <li key={name}>
                    <button className={clazz} onClick={() => onFilterChange(name)}>
                        {label}
                    </button>
                </li>
            );
        });

        const completedCount = this.props.todos.filter((el) => !el.completed).length;

        const arrCompletedId = this.props.todos
            .filter((el) => el.completed)
            .map((el) => el.id);

        return (
            <footer className="footer">
                <span className="todo-count">{completedCount} items left</span>
                <ul className="filters">{buttons}</ul>
                <button
                    className="clear-completed"
                    onClick={() => clearCompleted(arrCompletedId)}
                >
                    Clear completed
                </button>
            </footer>
        );
    }
}
