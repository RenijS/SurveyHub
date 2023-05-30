import React from "react";
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


export default function SurveyInfoCard({survey, handleSurveyChange}){
    return (
        <Card.Title>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Survey Title:</InputGroup.Text>
                        <FormControl placeholder="Enter Title" name="title" value={survey.title} onChange={(e)=>{handleSurveyChange(e)}}/>
                        <InputGroup className="mt-2">
                            <Form.Control as="textarea" placeholder="Enter survey description" name="desc" value={survey.desc || survey.description} onChange={(e)=>{handleSurveyChange(e)}}/>
                        </InputGroup>
                    </InputGroup>
                </Card.Title>
    )
}