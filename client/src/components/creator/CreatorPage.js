import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { SurveysContext } from "../../context/SurveysContext";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SurveyCard from "../SurveyCard";
import BaseAxios from "../../api/BaseAxios";

export default function CreatorPage(props){
    const {surveys, setSurveys, handleRemoveSurvey} = useContext(SurveysContext);

    const handleDeleteSurvey = async (surveyId, index) => {
        await BaseAxios.delete(`/surveys/${surveyId}/questions`)
        .then(async (res) => {
            console.log("All the question are deleted")
            try{
                const result = await BaseAxios.delete(`/surveys/${surveyId}`)
                console.log("Survey deleted", result);
                handleRemoveSurvey(index)
            }catch(err){
                console.log("Error deleting survey", err);
            }
        })
        .catch(err => {
            console.log("Error deleting questions", err)
        })
    }

    return (<Container className="p-2 mt-3"> 
        <Col>
            <Row><Link to="/surveys/add" style={{width:"fit-content"}}><Button>Post a survey</Button></Link></Row>
            <Row>
                <Row><h6>Your Surveys:</h6></Row>
                {surveys && surveys.map((survey, index) => {
                    return <Row key ={survey.id}><SurveyCard survey={survey} isCreator={props.isCreator} handleDeleteSurvey={handleDeleteSurvey} index={index}/></Row>
                })}
            </Row>
        </Col>
    </Container>)
}