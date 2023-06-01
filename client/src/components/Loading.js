import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";

export default function Loading({loadInfo, setLoadInfo}){
    return (
    <div className="popup">
        <Container style={{height: "50%"}}>
            <Card className="h-100">
                <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    {loadInfo.status == "loading" && 
                        <>
                            <Spinner animation="border" role="Info" style={{width: "8rem", height: "8rem", marginBottom: "2rem"}}></Spinner>
                            <h5>Please wait</h5>
                        </>
                    }
                    <h5>{loadInfo.msg}</h5>
                </Card.Body>
            </Card>
        </Container>
    </div>
    )
}