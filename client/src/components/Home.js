import React, {useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CreatorPage from "./creator/CreatorPage";
import TakerPage from "./taker/TakerPage";
import { SurveysContext } from "../context/SurveysContext";
import BaseAxios from "../api/BaseAxios";
import { LoadContext } from "../context/LoadContext";

export default function Home(){

    const {setLoadInfo} = useContext(LoadContext)

    const [isCreator, setIsCreator] = useState(true);

    const [surveys, setSurveys] = useState([])

    const handleRemoveSurvey = (index) => {
        const surveysArr = [...surveys];
        surveysArr.splice(index, 1);
        setSurveys(surveysArr)
    }

    useEffect( () => {
        const fetchData = async () =>{
            try{
                setLoadInfo({status: "loading", msg: "Retriving all the available surveys"})
                const result = await BaseAxios.get("/surveys/")
                console.log(result)
                setSurveys(result.data.data.surveys);
                setLoadInfo({status: "success", msg: "Surveys retrived"})
                //delaying
                setTimeout(() => {
                    setLoadInfo({ status: "closed", msg: "" });
                  }, 800);
            }catch(err){
                console.log(err)
                setLoadInfo({status: "error", msg: "Error retriving surveys"})
                //delaying
                setTimeout(() => {
                    setLoadInfo({ status: "closed", msg: "" });
                  }, 800);
            }
        }
        fetchData()
    }, [])


    return ( 
        <SurveysContext.Provider value={{surveys, setSurveys, handleRemoveSurvey}}>
            <Container>
                <Row className="mt-3">
                    <Col className="text-center"><Button variant={isCreator ? "primary": "secondary"} onClick={() => {setIsCreator(true)}}>Survey Creator</Button></Col>
                    <Col className="text-center"><Button variant={isCreator ? "secondary" : "primary"} onClick={() => {setIsCreator(false)}}>Survey Taker</Button></Col>      
                </Row>
                <Row>
                    {isCreator && <CreatorPage isCreator={isCreator}/>}
                    {!isCreator && <TakerPage isCreator={isCreator}/>}
                </Row>
            </Container>
        </SurveysContext.Provider>
    )
}