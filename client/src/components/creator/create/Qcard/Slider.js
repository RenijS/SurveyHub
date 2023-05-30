import React, {  } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Slider({question, handleMaxField, handleMinField}){

    return (
        <>
        <Row>
            <Col xs={1} className="me-2 d-flex align-items-center">
                <Form.Label>Min:</Form.Label>   
            </Col>
            <Col>
                <Form.Control type="number" placeholder="Min value" value={question.options[0]} onChange={handleMinField}/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col xs={1} className="me-2 d-flex align-items-center">
                <Form.Label>Max:</Form.Label>   
            </Col>
            <Col>
                <Form.Control type="number" placeholder="Max value" value={question.options[1]} onChange={handleMaxField}/>                        
            </Col>
        </Row>
        </>
    )
}