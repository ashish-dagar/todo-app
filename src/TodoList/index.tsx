import React from "react";

import "../Todo/index.css";

type Item = {
  label: String;
  isActive: boolean;
  id: number;
  text: string;
};

interface ITodoListProps {
  item: Item;
  handleClick: (args: Item) => void;
}

const TodoList = ({ item, handleClick }: ITodoListProps) => {
  return (
    <li className="item">
      <div className="title">
        <input
          type="checkbox"
          checked={item.isActive}
          onChange={() => handleClick(item)}
          data-testid="checkbox"
        />
        <span className={`${item.isActive ? "strike" : ""} text`}>
          {item.label}
        </span>
      </div>
      <p className={`${item.isActive ? "strike" : ""}`}>{item.text}</p>
    </li>
  );
};

export default TodoList;
