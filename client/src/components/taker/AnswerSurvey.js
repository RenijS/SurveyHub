import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import BaseAxios from "../../api/BaseAxios";
import SurveyInfoCard from "../creator/create/SurveyInfoCard";
import { useParams } from "react-router-dom";
import QuestionCard from "./answer/QuestionCard";
import Button from "react-bootstrap/esm/Button";
import {useNavigate} from 'react-router-dom'


export default function AnswerSurvey(){
    const {id} = useParams();
    const [survey, setSurvey] = useState({title:"", description: ""})

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchSurveyData = async () =>{
            try{
                const result = await BaseAxios(`/surveys/${id}`);
                setSurvey({...result.data.data.survey})
            }catch(err){
                console.log("Error fetching survey data: ", err);
            }
        }
        fetchSurveyData();
    },[id])

    //collection of questions
    const [questions, setQuestions] = useState([])

    const [answers, setAnswers] = useState([]);

    const handleAnswersChange = (index, event, type) =>{
        const ansArr = [...answers];
        const ans = ansArr[index];
        if(type === "checkbox"){
            ans.answer = `${ans.answer},${event.target.getAttribute('value')}`;
        } else if(type === "slider" || type === "comment box"){
            ans.answer = event.target.value;
        } else{
            ans.answer = event.target.getAttribute('value');
        }
        ansArr[index] = ans;
        setAnswers(ansArr);
        console.log(ansArr)
        console.log(answers)
    }

    const resetAnswers = () => {setAnswers([])}

    useEffect(() => {
        const fetchSurveyQuestions = async () => {
            try{
                const result = await BaseAxios(`/surveys/${id}/questions`);
                setQuestions([...result.data.questions])
                //making base for answers
                const initialAnswers = result.data.questions.map((question) => ({
                    question_id: question.id,
                    type: question.type,
                    answer: "",
                }));
                setAnswers(initialAnswers);
                console.log(answers)
            }catch(err){
                console.log("Error fetching survey questions", err);
            }
        }
        fetchSurveyQuestions();
    }, [id])

    const handleSubmitAnswer = async () =>{
        console.log("answers: ", answers)
        try{
            const answersPromises = answers.map( async (answer) => {
                try{
                    const result = await BaseAxios.post(`/surveys/${id}/answers`,{...answer});
                }catch(err){
                    console.log("Error adding answers: ", err);
                }   
            });
            await Promise.all(answersPromises);
            console.log("All answers added successfully", answersPromises)
            resetAnswers()
            navigate("/", {replace: true})
        }catch(err){
            console.log(err);
        }

    }


    return (
        <>
            <Container className="mt-4">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title style={{position:"relative"}}>
                        <SurveyInfoCard survey={survey}/>
                        <Row className="invisibleWall" style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}></Row>
                    </Card.Title>
                    <Card.Text>Please answer all the questions given below for your answer to be recorded.</Card.Text>
                </Card.Body>
            </Card>
                    {questions && questions.map((question, index) => {
                            return <Card className="mb-3" key={question.id}>
                                        <Card.Body>
                                            <Card.Title style={{position:"relative"}}>
                                                <QuestionCard index= {index} question={question} answers={answers} handleAnswersChange={handleAnswersChange}/>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                        })}   
                        {questions && <Button onClick={handleSubmitAnswer}>Submit answer</Button>}  
        </Container>

        </>
    )
}