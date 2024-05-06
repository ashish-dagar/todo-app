import React from 'react';

import '../Todo/index.css';

type Item = {
    label: String;
    isActive: boolean;
    id: number;
}

interface ITodoListProps {
    item: Item;
    handleClick: (args: Item) => void;
}

const TodoList = ({item, handleClick}: ITodoListProps) => {

    return (
        <li className="item">
            <input type='checkbox' checked={item.isActive} onChange={() => handleClick(item)} data-testid='checkbox' />
            <span className={`${item.isActive ? "strike" : ''}`}>{item.label}</span>
        </li>
    )
}

export default TodoList;
