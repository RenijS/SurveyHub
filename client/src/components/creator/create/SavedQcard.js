import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function SavedQcard(props){
    return(
        <Container>
            <Col className="mb-2">
                <Row>
                    Q{props.index+1}: {props.question.q || props.question.question}
                </Row>
            </Col>
            <Col>
            {props.question.type === "dropdown" && (
                    <>
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button" disabled>
                            {props.question.options.map((option, index) => {
                                return <Dropdown.Item key={index}>{option}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    </>
                )}
                {props.question.type === "checkbox" && (
                    <>
                        {props.question.options.map((option, index) => {
                                return (
                                    <InputGroup className="mb-3" key={index}>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                        <Form.Control aria-label="Text input with checkbox" value ={option} readOnly/>
                                    </InputGroup>
                                )
                        })}
                    </>
                )}
                {props.question.type === "multiple choice" && (
                    <>
                        {props.question.options.map((option, index) => {
                            return (
                                <InputGroup className="mb-3" key={index}>
                                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                    <Form.Control aria-label="Text input with checkbox" value ={option} readOnly/>
                                </InputGroup>
                            )
                        })}
                    </>
                )}
                {props.question.type === "slider" && (
                    <>
                        <input
                            type="range"
                            min={props.question.options[0]}
                            max={props.question.options[1]}
                            className="w-100"
                            readOnly
                        />

                    </>
                )}
                {props.question.type === "comment box" && (
                    <>
                        <InputGroup className="mt-2">
                            <Form.Control as="textarea" placeholder="Enter answer" name="comment" readOnly/>
                        </InputGroup>
                    </>
                )}
            </Col>
        </Container>
        )
}