import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Form, Button, Col, Card } from "react-bootstrap";

export default function Students() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  function onSubmit(e) {
    e.preventDefault();
    if (house === "" || name === "") {
      setError("All field are required");
      return;
    }
    setStudents([{ name, house }, ...students]);
    setName("");
    setHouse("");
    setError("");
  }

  useEffect(() => {
    axios({
      url: "https://hg-teacher.herokuapp.com/students",
      method: "get",
    })
      .then(({ data }) => {
        setStudents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row className="d-flex flex-column align-items-center pt-4">
        <Col sm={12}>
          <h3>Daftar</h3>
          <Form onSubmit={onSubmit} role="form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicHouse">
              <Form.Label>House</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter House"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" role="button">
              Submit
            </Button>
            {error != "" && (
              <h5 style={{ color: "red" }} data-testid="form-error">
                {error}
              </h5>
            )}
          </Form>
          <h3 className="mt-5">Student Terdaftar</h3>
          <div
            className="w-100 d-flex flex-wrap"
            data-testid="students-container"
          >
            {students?.map((student, index) => (
              <Card
                style={{ margin: "5px", width: "200px" }}
                key={index}
                role="listitem"
              >
                <Card.Body>
                  <Card.Title>{student.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {student.house}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}
