import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SurveysContext } from "../../context/SurveysContext";
import SurveyCard from "../SurveyCard";

export default function TakerPage(props){
    const {surveys} = useContext(SurveysContext);
    return <Container className="p-2 mt-3">
        <Col>
            <Row><h6>Available Surveys: </h6></Row>
            {surveys && surveys.map(survey => {
                return <Row key={survey.id}><SurveyCard survey={survey} isCreator={props.isCreator}/></Row>
            })}
        </Col>
    </Container>
}