import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import BaseAxios from "../../api/BaseAxios";

export default function StatsPage(props){

    const {id} = useParams();

    const [questions, setQuestions] = useState([]);

    //getting questions
    useEffect(() => {
    const fetchData = async () => {
        try {
            //const questionsResponse = await BaseAxios.get(`/surveys/${id}/questions`);
            //setQuestions(questionsResponse.data.questions);
            //directly extracting 'questions' i.e, no need 'questionsResponse.data.questions'
            const { data: { questions } } = await BaseAxios.get(`/surveys/${id}/questions`);
            setQuestions(questions);
        } catch (error) {
            console.log("Error retrieving questions:", error);
        }
    };

    fetchData();
    }, []);

    const [answers, setAnswers] = useState([]);

    //getting answers after questions are set
    useEffect(() => {
    const fetchAnswers = async () => {
        questions.forEach(async (question) => {
            try {
                const answersResponse = await BaseAxios.get(`/surveys/${id}/answers/${question.id}`);
                console.log(answersResponse.data.answers)
                setAnswers((prevData) => [...prevData, ...answersResponse.data.answers]);
            } catch (error) {
                console.log("Error retrieving answers:", error);
            }
        });
    };

    fetchAnswers();
    }, [questions]);

    useEffect(()=>{
        console.log(questions);
        console.log(answers);
    }, [answers])

    const generateAnswerArray = (qId, option) => {
        return (answers.filter((ans => ans.question_id === qId && ans.answer.includes(option))))
    }

    const calculatePercentage = (qId, responsesArr) => {
        const totalResponses = filterAnswer(qId).length;
        const count = responsesArr.length
        const percentage = (count/totalResponses) * 100;
        return Math.round(percentage);
    }

    const filterAnswer = (qId) =>{
        return answers.filter((ans => {
            return ans.question_id === qId
        }))
    }


    return (
        <>
            <Container>
            <div>Analyze Results</div>
                {questions && questions.map((question) => {
                    return (<Card style={{marginTop: "1rem"}}>
                        <Card.Body>
                            <Card.Title>Q: {question.question}</Card.Title>
                        </Card.Body>
                        <Container>
                            <Row>
                                {(question.type === "multiple choice" || question.type === "dropdown" || question.type === "checkbox") ? (
                                    <Row>
                                        <Col xs={8}>
                                            <Row><p style={{textDecoration: "underline"}}>Answer Choice</p></Row>            
                                        </Col>
                                        <Col>
                                            <Row><p style={{textDecoration: "underline"}}>Responses</p></Row>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row>
                                        <Col>
                                            <Row><p style={{textDecoration: "underline"}}>Responses</p></Row>
                                        </Col>
                                    </Row>
                                )}
                                {(question.type === "multiple choice" || question.type === "dropdown" || question.type === "checkbox") ? (answers && question.options.map((option) => {
                                    return (
                                        <Row>
                                            <Col xs={8}>{option}</Col>
                                            <Col>{generateAnswerArray(question.id, option).length},    {calculatePercentage(question.id, generateAnswerArray(question.id, option))}%</Col>
                                        </Row>
                                    )
                                })) : (answers && filterAnswer(question.id).map((answer) => {
                                    return (
                                        <Row>
                                            <Col className="py-2">{answer.answer}</Col>
                                        </Row>
                                    )
                                }))}
                                <Row>
                                    <p style={{marginTop: "1rem"}}>Total Respondents: {filterAnswer(question.id).length}</p>
                                </Row>
                            </Row>
                        </Container>
                    </Card>)
                })}
            </Container>
        </>
    )
}