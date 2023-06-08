import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import TopImg from "../../img/survey-hold.jpg";

export default function Top() {
  return (
    <div
      style={{
        minHeight: "20rem",
        backgroundColor: "#ededed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center ",
      }}
    >
      <Container>
        <Row className="text-center">
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center ",
            }}
          >
            <h4>Get answers with surveys</h4>
            <p>Surveys give you actionable insights and fresh perspectives.</p>
            <Button variant="primary">Sign up free</Button>
          </Col>
          <Col className="d-none d-lg-block">
            <img src={TopImg} alt="Image" style={{ height: "18rem" }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
