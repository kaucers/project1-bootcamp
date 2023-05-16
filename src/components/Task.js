import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

export default function Task(props) {
  return (
    <Card bg={props.started ? "warning" : "light"} style={{ width: "18rem", marginLeft: 20, marginBottom: 20 }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Duration: {`${props.duration} min${props.duration > 1 ? "s" : ""}`}</Card.Subtitle>
        {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
        <Stack direction="horizontal" gap={3}>
          <Button variant="primary" size="sm" disabled={props.started} onClick={() => props.startTask(props.id)}>
            Start Task
          </Button>
          <Button variant="danger" size="sm" onClick={() => props.deleteTask(props.id)}>
            Delete Task
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
