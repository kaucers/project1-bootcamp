import { useState } from "react";
import Button from "react-bootstrap/Button";
import RegisterTimeModal from "./RegisterTimeModal";
import styles from "./RegisterTime.module.css";

export default function RegisterTime({ onChange, onAddTask }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.addTask}>
        <div className="fullWidth" />
        <Button
          size="lg"
          onClick={() => {
            setShow(true);
          }}
          className="btn"
        >
          Add Task
        </Button>
      </div>
      <RegisterTimeModal
        ModalProps={{ show: show }}
        onClose={() => {
          setShow(false);
        }}
        {...{ onChange }}
        onAddTask={() => {
          onAddTask();
          setShow(false);
        }}
      />
    </div>
  );
}
