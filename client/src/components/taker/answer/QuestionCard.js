import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function QuestionCard(props){
    return (
        <>
        <Container>
            <Col className="mb-2">
                <Row>
                    Q{props.index+1}: {props.question.q || props.question.question}
                </Row>
            </Col>
            <Col>
            {props.question.type === "dropdown" && (
                    <>
                        <DropdownButton id="dropdown-basic-button" title={ props.answers[props.index].answer !== "" ? props.answers[props.index].answer : "Choose your answer"}>
                            {props.question.options.map((option, index) => {
                                return (
                                    option != "" && <Dropdown.Item key={index} onClick={(e)=>{props.handleAnswersChange(props.index, e, props.question.type)}} value={option}>{option}</Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </>
                )}
                {props.question.type === "checkbox" && (
                    <>
                        {props.question.options.map((option, index) => {
                            const isChecked = props.answers[props.index].answer.includes(option);
                                return (
                                    option != "" &&
                                    <InputGroup className="mb-3" key={index}>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" 
                                            checked={isChecked}
                                            value ={option}
                                            onChange={(e) => {
                                                if(e.target.checked){ props.handleAnswersChange(props.index, e, props.question.type)}
                                                else{props.handleAnswersRemove(props.index, option)}
                                                }}/>
                                        <Form.Control aria-label="Text input with checkbox" value ={option} readOnly/>
                                    </InputGroup>
                                )
                        })}
                    </>
                )}
                {props.question.type === "multiple choice" && (
                    <>
                        {props.question.options.map((option, index) => {
                            const isChecked = props.answers[props.index].answer === option;
                            return (
                                option != "" &&
                                <InputGroup className="mb-3" key={index}>
                                    <InputGroup.Checkbox aria-label="Checkbox for following text input" 
                                        checked={isChecked}
                                        value ={option}
                                        onChange={(e) => props.handleAnswersChange(props.index, e, props.question.type)}/>
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
                            min={props.question.options[0] || 0}
                            max={props.question.options[1] || 50}
                            className="w-100" 
                            value={props.answers[props.index].answer}
                            onChange={(e) => {props.handleAnswersChange(props.index, e, props.question.type)}}
                        />
                        <p style={{fontWeight: "350", fontSize: "1rem"}}>Current value is {props.answers[props.index].answer}</p>


                    </>
                )}
                {props.question.type === "comment box" && (
                    <>
                        <InputGroup className="mt-2">
                            <Form.Control as="textarea" placeholder="Enter answer" name="comment" value={props.answers[props.index].answer} onChange={(e) => {props.handleAnswersChange(props.index, e, props.question.type)}} />
                        </InputGroup>
                    </>
                )}
            </Col>
        </Container>
        </>
    )
}