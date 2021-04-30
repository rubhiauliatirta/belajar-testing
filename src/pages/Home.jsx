import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Jumbotron, Button } from "react-bootstrap";

export default function Home() {
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Jumbotron>
          <h1 role="caption">Hello, Jersey!</h1>
          <p>
            Selamat datang di Hogwarts8, disini kita akan belajar testing
            frontend menggunakan react-testing-library
          </p>
          <p>
            <Button
              variant="primary"
              role="button"
              onClick={() => history.push("/students")}
            >
              Lihat Students
            </Button>
          </p>
        </Jumbotron>
      </Row>
    </Container>
  );
}
