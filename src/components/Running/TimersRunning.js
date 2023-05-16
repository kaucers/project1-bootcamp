import React from "react";
import Stopwatch from "./Stopwatch";
import styles from "./TimersRunning.module.css";

export default function TimersRunning({ toDoList, onDeleteTask }) {
  return (
    <div className={styles.container}>
      <h1>Timers Running</h1>
      <div className={styles.tasklist}>
        {toDoList.map((task) => {
          if (task.started) {
            // convert task.duration from minutes to seconds
            const timeInSeconds = task.duration * 60;

            return (
              <div key={task.id}>
                <Stopwatch id={task.id} name={task.name} setTime={timeInSeconds} onDelete={onDeleteTask(task.id)} />
              </div>
            );
          }
          return <React.Fragment />;
        })}
      </div>
    </div>
  );
}
