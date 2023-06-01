import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SavedQcard from "./create/SavedQcard";
import BaseAxios from "../../api/BaseAxios";
import SurveyInfoCard from "./create/SurveyInfoCard";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import EditQpopup from "./edit/EditQpopup";
import { LoadContext } from "../../context/LoadContext";

export default function EditSurvey({setPopupActive, popupActive}){

    const {id} = useParams();
    const {setLoadInfo} = useContext(LoadContext)
    const [survey, setSurvey] = useState({title:"", description: ""})

    useEffect(()=>{
        const fetchSurveyData = async () =>{
            try{
                setLoadInfo({status: "loading", msg: "retriving survey data..."})
                const result = await BaseAxios(`/surveys/${id}`);
                setSurvey({...result.data.data.survey})
            }catch(err){
                console.log("Error fetching survey data: ", err);

                setTimeout({status: "error", msg: "error retriving survey data"})
                setTimeout(()=>{
                    setLoadInfo({status: "closed", msg: ""})
                }, 800)
            }
        }
        fetchSurveyData();
    },[id])

    //collection of questions
    const [questions, setQuestions] = useState([])

    const updateQuestions = (index, question) =>{
        const questionsArr = [...questions];
        questionsArr[index] = question;
        setQuestions(questionsArr);
    }

    useEffect(() => {
        const fetchSurveyQuestions = async () => {
            try{
                const result = await BaseAxios(`/surveys/${id}/questions`);
                setQuestions([...result.data.questions])
                setLoadInfo({status: "success", msg: "Success retriving survey data"})
                setTimeout(()=>{
                    setLoadInfo({status: "closed", msg: ""})
                }, 800)
            }catch(err){
                console.log("Error fetching survey questions", err);

                setLoadInfo({status: "error", msg: "Error retriving survey data"})
                setTimeout(()=>{
                    setLoadInfo({status: "closed", msg: ""})
                }, 800)
            }
        }
        fetchSurveyQuestions();
    }, [id])
    //question for editing
    const [question, setQuestion] = useState({questionsArrIndex: "", question: "", type: "", options:["","",""] });

    const handleEditClicked = (data) => {
        setQuestion({...data})
        setPopupActive(true);
    }

    //for scrolling effect after edit is clicked
    useEffect(()=>{
        //edit popup container
        let editContainer = document.querySelector(".editContainer");
        if(editContainer){
            let offsetTop = editContainer.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            })
        }
    }, [question, popupActive])

    const handleQuestionChange = (e) => {
        setQuestion((prevData) => {
            return {...prevData, question:e.target.value}
        })
    }

    const resetQuestion = () => {
        setQuestion({ question: "", type: "", options:["","",""] })
        setPopupActive(false)
    }

    const handleAddFields = () => {
        const values = [...question.options];
        values.push("");
        setQuestion(prevData => {
            return {...prevData, options:values}
        })
    }

    //for removing input field
    const handleRemoveFields = (index) => {
        const values = [...question.options];
        if(values.length > 2){
            values.splice(index,1);
        setQuestion(prevData => {
           return {...prevData, options:values}
        })
        }
    }

    const handleOnChangeFields = (e, index) => {
        const values = [...question.options];
        values[index] = e.target.value;
        setQuestion(prevData => {
            return {...prevData, options:values}
        })
    }

    //Using options for min max value of slider
    //index0 = min, index1 = max
    const handleMinField = (e) => {
        const values = [...question.options];
        values[0] = e.target.value;
        setQuestion(prevData => {
            return {...prevData, options:values}
        })
    }

    const handleMaxField = (e) => {
        const values = [...question.options];
        values[1] = e.target.value;
        setQuestion(prevData => {
            return {...prevData, options:values}
        })
    }

    const handleDeleteQuestion = async (qId, index) => {
        await BaseAxios.delete(`/surveys/${id}/questions/${qId}`)
            .then(()=>{
                const questionsArr = [...questions];
                questionsArr.splice(index, 1);
                setQuestions(questionsArr);
                resetQuestion();
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
        <Container className="mt-4">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title style={{position:"relative"}}>
                        <SurveyInfoCard survey={survey}/>
                        {/* Invisible Wall so that inputs are not editable */}
                        <Row className="invisibleWall"></Row>
                    </Card.Title>
                </Card.Body>
            </Card>
                    {questions && questions.map((question, index) => {
                            return <Card className="mb-3" key={question.id}>
                                        <Card.Body>
                                            <Card.Title style={{position:"relative"}}>
                                                <SavedQcard index= {index} question={question}/>
                                                {/* Invisible Wall so that inputs are not editable */}
                                                <Row className="invisibleWall"></Row>
                                            </Card.Title>
                                            <Card.Title><Button onClick={() => {handleEditClicked({questionsArrIndex: index, ...question})}}>Edit</Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                        })}     
        </Container>
        {(question.q !== "" && question.type !== "") && <EditQpopup id={id} updateQuestions={updateQuestions} question={question} handleQuestionChange={handleQuestionChange} resetQuestion={resetQuestion} handleAddFields={handleAddFields} handleRemoveFields={handleRemoveFields} handleOnChangeFields={handleOnChangeFields} handleMinField={handleMinField} handleMaxField={handleMaxField} handleDeleteQuestion={handleDeleteQuestion}/>}
        </>
    )
}