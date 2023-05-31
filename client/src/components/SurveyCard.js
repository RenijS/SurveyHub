import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


export default function SurveyCard(props){
  const [optionsOn, setOptionOn] = useState(false);

    return (
        <Card className="surveyCard position-relative mt-3" key={props.survey.id} onMouseEnter={()=>{setOptionOn(true)}} onMouseLeave={()=>{setOptionOn(false)}}>
            {optionsOn && <Container className="btnContainer position-absolute top-0 bottom-0 end-0 m-auto" style={{backgroundColor: `rgba(250, 250, 250, 60%)`, display: 'inline'}}>
            <Row className="d-flex justify-content-end align-items-center h-100 gap-2 p-2">
                {window.innerWidth <= 820 && <Button variant="secondary" style={{ width: "fit-content", height:"100%" }} onClick={()=>{setOptionOn(false)}}>{">"}</Button>}
                {props.isCreator && <>
                  <Link to={`/surveys/${props.survey.id}/edit`} style={{ width: "fit-content", padding: 0 }}><Button variant="primary" className="w-100">Edit</Button></Link>
                  <Button variant="primary" style={{ width: "fit-content" }} onClick={()=>{props.handleDeleteSurvey(props.survey.id, props.index)}}>Delete</Button>
                  <Link to={`/surveys/${props.survey.id}/analyze`} style={{ width: "fit-content", padding: 0 }}><Button variant="primary" style={{ width: "fit-content" }}>Stats</Button></Link>
                </>}
                {!props.isCreator && (
                  <Link to={`/surveys/${props.survey.id}/answer`} style={{ width: "20%", padding: 0 }}><Button variant="primary" className="w-100">Answer</Button></Link>
                )}
            </Row>
            </Container>}
        <Card.Body className="d-flex justify-content-between">
          <Card.Body>
            <Card.Title>Card Title: {props.survey.title}</Card.Title>
            <Card.Text>
              Desc: {props.survey.description}
            </Card.Text>
          </Card.Body>
          {props.isCreator && window.innerWidth <= 820 && !optionsOn && <Button variant="secondary" className="sliderBtn" onClick={()=>{setOptionOn(true)}}>{"<"}</Button>}
        </Card.Body>
      </Card>
      
);
}