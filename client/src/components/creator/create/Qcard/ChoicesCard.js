import React, {  } from "react";
import InputField from "./InputField";

export default function ChoicesCard(props){

    return (
        <>
            {props.question.options && props.question.options.map((value, index) =>{
                return <InputField key={index} value={value} index={index} handleOnChangeFields={props.handleOnChangeFields} handleAddFields={props.handleAddFields} handleRemoveFields={props.handleRemoveFields}/>
            })}
        </>
    )
}