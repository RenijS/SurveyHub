import React from "react";
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import ChoicesCard from "./Qcard/ChoicesCard";
import Button from "react-bootstrap/esm/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "./Qcard/Slider";

export default function Qcard({ question, handleQuestionChange, handleOptionSelect, handleSaveQuestion, handleCancelQuestion, handleAddFields, handleOnChangeFields, handleRemoveFields, handleMinField, handleMaxField }){
    return(
    <Card>
        <Card.Body>
            <Card.Title>Add Question:</Card.Title>
            <Card.Title>
                <InputGroup className="mb-3" id="addQuestion">
                    {/* Add any additional form inputs here */}
                    <Form.Control aria-label="Text input with dropdown button" placeholder="Enter Question" onChange={handleQuestionChange} value={question.q} />

                    <DropdownButton
                    variant="outline-secondary"
                    title = {question.type === "" ? "Question Type":question.type}
                    id="input-group-dropdown-2"
                    align="end"
                    onSelect={handleOptionSelect}
                    >
                        <Dropdown.Item eventKey="multiple choice">Multiple Choice</Dropdown.Item>
                        <Dropdown.Item eventKey="checkbox">Checkbox</Dropdown.Item>
                        <Dropdown.Item eventKey="comment box">Comment Box</Dropdown.Item>
                        <Dropdown.Item eventKey="dropdown">Dropdown</Dropdown.Item>
                        <Dropdown.Item eventKey="slider">Slider</Dropdown.Item>
                    </DropdownButton>
                </InputGroup> 
            </Card.Title>
            {question.q !== "" && question.type !== "" && (<Card.Title>
                    {(question.type === "checkbox" || question.type === "multiple choice" || question.type === "dropdown") &&
                        <ChoicesCard question={question} handleAddFields={handleAddFields} handleOnChangeFields={handleOnChangeFields} handleRemoveFields={handleRemoveFields}/>
                    }
                    {question.type === "slider" && (
                        <Slider question={question} handleMaxField={handleMaxField} handleMinField={handleMinField}/>
                    )}
                    <Row>
                        <Col xs={2}>
                            <Button variant="primary" className="mt-3" onClick={handleSaveQuestion}> Save </Button>
                        </Col>
                        <Col>
                            <Button variant="secondary" className="mt-3" onClick={handleCancelQuestion}> Cancel </Button>  
                        </Col>
                    </Row>
                </Card.Title>)}
        </Card.Body>
    </Card>)
}