import React from "react";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import CookingTasks from "./components/Cooking/CookingTasks";
import TimersRunning from "./components/Running/TimersRunning";
import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]); // name task, duration, state, dictionary
  const [newTask, setNewTask] = useState({
    name: "",
    duration: 0,
  }); // to store values of new task in inputfield

  console.table(toDoList);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setNewTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleAddTask = () => {
    const task = {
      id: toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].id + 1,
      name: newTask.name,
      duration: newTask.duration,
      started: false,
    };

    setToDoList([...toDoList, task]); //append to setToDoList
  };

  const handleDeleteTask = (id) => () => {
    const newToDoList = toDoList.filter((task) => {
      return task.id !== id;
    });
    setToDoList(newToDoList);
  };

  const handleStartTask = (id) => {
    setToDoList(
      toDoList.map((task) => {
        if (task.id === id) {
          return { ...task, started: true };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <Container>
      <div id = "title-block">
      <h3>
        TimetoTaste Application🕑
      </h3>
      <p>
      This multiple asynchronous cooking timer app allows you to keep track of multiple dishes cooking at different times without the need for physical timers. With customizable alerts and timers, you can ensure each dish is cooked to perfection and served at the right time.
      <br />
      <br />
      Click "Add Task" to start creating your timer tasks and stage time for execution!
      </p>
      </div>
      <Stack gap={3} className="m-1">
        {/* Cooking Tasks */}
        <CookingTasks {...{ toDoList }} onDeleteTask={handleDeleteTask} onStartTask={handleStartTask} onChange={handleChange} onAddTask={handleAddTask} />
        {/* Timers Running */}
        <TimersRunning {...{ toDoList }} onDeleteTask={handleDeleteTask} />
      </Stack>
      <footer id = 'footer-block'>{`Copyright © Dexter & Karina 2023`}</footer>
    </Container>
  );
}

export default App;
