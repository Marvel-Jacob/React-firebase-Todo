import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
          }))
        );
      });
  }, []);

  const addTodo = (e) => {
    //This will fire when we click the button
    e.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodo([...todos, input]);
    setInput(""); //clear the input here
  };
  return (
    <div className="App">
      <h1>To do List</h1>
      <form>
        {/* <input value={input} onChange={(e) => setInput(e.target.value)}></input> */}
        <FormControl>
          <InputLabel>:Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>
          Add Todo
        </button> */}
        <ul>
          {todos.map((todo) => (
            <Todo todo={todo} setTodo={setTodo} input={input} />
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
