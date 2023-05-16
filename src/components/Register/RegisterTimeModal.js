import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";

export default function RegisterTimeModal({ ModalProps, onClose, onChange, onAddTask }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    onAddTask();
  };

  return (
    <Modal {...ModalProps} onHide={onClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" required name={"name"} placeholder="Task Name" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Duration(min)</Form.Label>
            <NumericFormat
              required
              name="duration"
              isAllowed={(values) => {
                const { floatValue } = values;

                return floatValue === undefined || floatValue > 0;
              }}
              allowLeadingZeros={false}
              decimalScale={0}
              allowNegative={false}
              placeholder="Duration"
              onChange={onChange}
              customInput={Form.Control}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
