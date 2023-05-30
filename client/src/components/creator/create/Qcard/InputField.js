import React from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import InputGroup from 'react-bootstrap/InputGroup';

export default function InputField(props){

    return (
        <InputGroup className="mt-1">
            <Form.Control
            placeholder="Choice value"
            aria-label="Recipient's username with two button addons"
            value={props.value}
            onChange={(event) => {props.handleOnChangeFields(event, props.index)}}
            />
            <Button variant="outline-secondary" onClick={props.handleAddFields}>Add</Button>
            <Button variant="outline-secondary" onClick={() => {props.handleRemoveFields(props.index)}}>Remove</Button>
      </InputGroup>
    )
}