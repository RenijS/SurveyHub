import React from "react";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "../create/Qcard/Slider";
import ChoicesCard from "../create/Qcard/ChoicesCard";
import BaseAxios from "../../../api/BaseAxios";


export default function EditQpopup({id, updateQuestions, question, handleQuestionChange, resetQuestion, handleAddFields, handleRemoveFields, handleOnChangeFields, handleMaxField, handleMinField, handleDeleteQuestion}){

    const handleOnSubmit = async () =>{
        await BaseAxios.put(`/surveys/${id}/questions/${question.id}`, {question: question.question, type: question.type, options: question.options})
        .then(res => {
            console.log("Updating success: ", res);
            console.log(question.questionsArrIndex, res.question)
            updateQuestions(question.questionsArrIndex, res.data.question)
            resetQuestion()
        })
        .catch(err => {console.log(err)})
    }

    return (
    <Container className="popup editContainer">
        <Card className="mt-5 py-2">
            <Card.Body>
                <Card.Title>Edit Question:</Card.Title>
                <Card.Title>
                    <InputGroup className="mb-3" id="addQuestion">
                        <Form.Control placeholder="Enter Question" onChange={handleQuestionChange} value={question.question}/>
                    </InputGroup> 
                </Card.Title>
                {question.q !== "" && question.type !== "" && (<Card.Title>
                        {(question.type === "checkbox" || question.type === "multiple choice" || question.type === "dropdown") &&
                            <ChoicesCard question={question} handleAddFields={handleAddFields} handleRemoveFields={handleRemoveFields} handleOnChangeFields={handleOnChangeFields}/>
                        }
                        {question.type === "slider" && (
                            <Slider question={question} handleMaxField={handleMaxField} handleMinField={handleMinField}/>
                        )}
                        <div className="mt-3" style={{display:"flex", flexDirection:"row", gap: "1.5rem"}}>
                            <Button variant="primary" style={{width:"fit-content"}} onClick={handleOnSubmit}> Save </Button>
                            <Button variant="warning" style={{width:"fit-content"}} onClick={() => {handleDeleteQuestion(question.id, question.questionsArrIndex)}}>Delete Question</Button>
                            <Button variant="secondary" style={{width:"fit-content"}} onClick={resetQuestion}> Cancel </Button>  
                        </div>
                    </Card.Title>)}
            </Card.Body>
        </Card>    
    </Container>
    )
}