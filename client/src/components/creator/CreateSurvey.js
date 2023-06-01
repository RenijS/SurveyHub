import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Qcard from "./create/Qcard";
import SavedQcard from "./create/SavedQcard";
import BaseAxios from "../../api/BaseAxios";
import SurveyInfoCard from "./create/SurveyInfoCard";
import { useNavigate } from "react-router-dom";

export default function CreateSurvey(){

    const navigate = useNavigate();

    const [survey, setSurvey] = useState({title: "", desc: ""});

    const handleSurveyChange = (e) => {
        setSurvey((prevData) => {
            return {...prevData, [e.target.name]: e.target.value};
        })
    }

    //collection of questions
    const [questions, setQuestions] = useState([])
    //single question for adding
    const [question, setQuestion] = useState({ q: "", type: "", options:["","",""] });

    const handleOptionSelect = (e) => {
        setQuestion((prevData) => {
            return {...prevData, type: e}
        })
    }
    const handleQuestionChange = (e) => {
        setQuestion((prevData) => {
            return {...prevData, q:e.target.value}
            
        })
    }

    //for adding input field
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

    const handleCancelQuestion = () => {
        setQuestion({q: "", type: "", options: ["","",""]});
    }
    const handleSaveQuestion = () => {
        setQuestions((prevData) => {
            return [...prevData, question];
        })

        setQuestion({q: "", type: "", options: ["","",""]});
    }

    const resetAllInputs = () => {
        setSurvey({title: "", desc: ""})
        setQuestions([])
        setQuestion({q: "", type: "", options: ["","",""]});
    }

    const handleOnSubmit = async () => {
        BaseAxios.post("/surveys", {
            title: survey.title,
            description: survey.desc
        }).then(async (res) => {
            const surveyInfo = res.data.data.survey
            console.log("Survey info", surveyInfo);
            const questionPromises = questions.map(async (question) => {
                try {
                    const questionResponse = await BaseAxios.post(
                        `/surveys/${surveyInfo.id}/questions`,
                        {
                            question: question.q,
                            type: question.type,
                            options: question.options,
                        }
                    );
                    console.log("Question added", questionResponse.data);
                } catch (err) {
                    console.log("Error adding question:", err);
                }
            });
            //Below code waits for all the promises in the questionPromises array to resolve
            await Promise.all(questionPromises);
            console.log("All questions added successfully");
            resetAllInputs()
            navigate("/", {replace: true});
        }).catch(err => {
            console.log("Error adding survey:", err);
        })
      };
      

    return (  
    <Container className="mt-4">
        <Card className="mb-3">
            <Card.Body>
                <SurveyInfoCard survey={survey} handleSurveyChange={handleSurveyChange}/>
                
                {questions && questions.map((question, index) => {
                    return <Card.Title key={index}>
                            <SavedQcard index= {index} question={question}/>
                        </Card.Title>;
                })}
                {questions.length !== 0 && survey.title !== "" && (
                    <Card.Title className="text-center">
                        <Button className="px-4 mt-2" onClick={handleOnSubmit}>Post the survey</Button> 
                    </Card.Title>
                )}             
            </Card.Body>
        </Card>

        <Qcard question={question} handleQuestionChange={handleQuestionChange} handleOptionSelect={handleOptionSelect} handleSaveQuestion={handleSaveQuestion} handleCancelQuestion={handleCancelQuestion} handleAddFields={handleAddFields} handleOnChangeFields={handleOnChangeFields} handleRemoveFields={handleRemoveFields} handleMinField={handleMinField} handleMaxField={handleMaxField}/>
    </Container>
    )
}