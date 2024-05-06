import React, { useEffect, useState } from "react";
import Filter from "./component/Filter";
//import TodoList from "../TodoList";

import "./index.css";
import TodoList from "../TodoList";
//import styles from "./index.module.css";

const INITIAL_STATE = { label: "", text: "", isActive: false, id: 0 };
type Item = {
  label: String;
  isActive: boolean;
  id: number;
  text: string;
};

const CreateTodo = () => {
  const [currentItem, setCurrentItem] = useState(INITIAL_STATE);
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [filter, setFilter] = useState({ value: "All", type: false });

  const addTodoItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({
      ...currentItem,
      label: event.currentTarget.value,
      isActive: false,
      id: todoList.length,
    });
  };

  const addTodoText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentItem({ ...currentItem, text: event.currentTarget.value });
  };

  const handleList = () => {
    setTodoList([...todoList, currentItem]);
    setCurrentItem(INITIAL_STATE);
  };

  const updateList = (item: Item) => {
    const el = todoList.map((el) => {
      if (el.id === item.id) {
        return { ...el, isActive: !el.isActive };
      } else {
        return el;
      }
    });
    setTodoList(el);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let el = { value: "All", type: false };
    switch (event.currentTarget.value) {
      case "All":
        el = { value: "All", type: false };
        break;
      case "Active":
        el = { value: "Active", type: false };
        break;
      case "Completed":
        el = { value: "Completed", type: true };
        break;
    }
    setFilter(el);
  };

  const getData = () => {
    try {
      return JSON.parse(localStorage.getItem("listItem") || "") || [];
    } catch (_er) {
      return [];
    }
  };

  useEffect(() => {
    const list = getData();
    if (list) {
      setTodoList(list);
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("listItem", JSON.stringify(todoList));
    }
  }, [todoList]);

  return (
    <>
      <div className="card">
        <>
          <div className="inputCard">
            <input
              type="text"
              placeholder="heading (max character allowed 60)"
              value={currentItem.label}
              onChange={addTodoItems}
              data-testid="input"
              maxLength={60}
            />
            <textarea
              placeholder="text"
              className="text"
              value={currentItem.text}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                e.key === "Enter" ? handleList() : null
              }
              data-testid="text-area"
              onChange={addTodoText}
            />
            <button
              onClick={handleList}
              disabled={currentItem.label.length === 0}
              className={`${currentItem.label.length === 0 ? "disabled" : ""}`}
            >
              Add todo
            </button>
            <Filter handleFilter={handleFilter} value={filter.value} />
          </div>
        </>
      </div>
      <div className="list">
        {todoList
          .filter((el) => el.isActive === filter.type || filter.value === "All")
          .map((item, index) => {
            return (
              <TodoList item={item} key={index} handleClick={updateList} />
            );
          })}
      </div>
    </>
  );
};

export default CreateTodo;
