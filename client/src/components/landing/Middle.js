import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import screenImg from "../../img/survey-screen.png";

export default function Middle() {
  return (
    <div className="mt-5">
      <Container>
        <Row className="d-flex flex-lg-row flex-column g-5">
          <Col>
            <img
              src={screenImg}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h4>Everything you need to get the best out of surveys</h4>
            <ul>
              <li>
                Get access to survey templates that speak to customers,
                employees, or your target audience.
              </li>
              <li>
                Score your surveys to estimate their success rates with
                SurveyMonkey Genius.
              </li>
              <li>
                Explore our best practices for creating the even the most
                sophisticated surveys.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
