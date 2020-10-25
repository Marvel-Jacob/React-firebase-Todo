import { Button, Checkbox, ListItem, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import Modal from "@material-ui/core/Modal";

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const deleteTodo = (e) => {
    db.collection("todos").doc(props.todo.id).delete();
  };

  const editTodo = (e) => {
    setOpen(true);
  };
  const editedTodo = (e) => {
    setInput("");
    setOpen(false);
  };

  const updateTodo = (e) => {
    db.collection("todos").doc(props.todo.id).set(
      {
        text: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const body = (
    <div className="model_card">
      <h2 id="simple-modal-title">Edit Todo</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter new todo"
      ></input>
      <Button onClick={updateTodo} className="model_button">
        {" "}
        Update Todo
      </Button>
    </div>
  );

  return (
    <div>
      <ListItem className="todo_list">
        <ListItemText primary={props.todo.text} />
        <Checkbox edge="end" />
      </ListItem>
      <DeleteIcon onClick={deleteTodo}></DeleteIcon>
      <EditIcon onClick={editTodo}></EditIcon>
      <Modal open={open} onClose={editedTodo}>
        {body}
      </Modal>
    </div>
  );
}

export default Todo;
