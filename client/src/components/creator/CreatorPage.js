import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { SurveysContext } from "../../context/SurveysContext";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SurveyCard from "../SurveyCard";
import BaseAxios from "../../api/BaseAxios";
import { LoadContext } from "../../context/LoadContext";

export default function CreatorPage(props){
    const {surveys, handleRemoveSurvey} = useContext(SurveysContext);
    const {setLoadInfo} = useContext(LoadContext);

    const handleDeleteSurvey = async (surveyId, index) => {
        setLoadInfo({status: "loading", msg: "Deleting survey data..."});

        await BaseAxios.delete(`/surveys/${surveyId}/questions`)
        .then(async () => {
            console.log("All the question are deleted")
            try{
                const result = await BaseAxios.delete(`/surveys/${surveyId}`)
                console.log("Survey deleted", result);
                handleRemoveSurvey(index)

                setLoadInfo({status: "success", msg: "Survey Deleted."})
                //delaying
                setTimeout(()=>{
                    setLoadInfo({status: "closed", msg: ""})
                }, 800)
            }catch(err){
                console.log("Error deleting survey", err);

                setLoadInfo({status: "error", msg: "Error deleting questions."})
                //delaying
                setTimeout(()=>{
                    setLoadInfo({status: "closed", msg: ""})
                }, 800)
            }
        })
        .catch(err => {
            console.log("Error deleting questions", err)
            
            setLoadInfo({status: "error", msg: "Error deleting survey."})
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