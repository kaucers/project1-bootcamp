import Task from '../Task';
import styles from './CookingTasks.module.css';
import RegisterTime from '../Register/RegisterTime';
import { Stack } from 'react-bootstrap';

export default function CookingTasks({
  toDoList,
  onChange,
  onAddTask,
  onDeleteTask,
  onStartTask,
}) {
  return (
    <div className={styles.container}>
      <h1> Recipe Task List</h1>
      {/* Register Time */}
      <Stack gap={3}>
        <RegisterTime onChange={onChange} onAddTask={onAddTask} />
        <div className={styles.tasklist}>
          {toDoList.map((task) => {
            return (
              <Task
                {...task}
                id={task.id}
                deleteTask={onDeleteTask(task.id)}
                started={task.started}
                startTask={onStartTask}
              />
            );
          })}
        </div>
      </Stack>
    </div>
  );
}
