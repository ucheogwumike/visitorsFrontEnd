import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';

const VisitData = (props) => {

console.log(props)
 return (
    <React.Fragment>
        <Container fluid>
            <div  style={{textAlign:'center'}}>
                <p>Code: {props.data.code}</p>
                <p>Viist Date: {props.data.dateOfVisit}</p>
                <p>Rescheduled: {props.data.rescheduled}</p>
                <p>SignInTime: {props.data.signIn}</p>
                <p>SignOutTime: {props.data.signOut}</p>
                <p>Status: {props.data.status}</p>
            </div>
        </Container>
    </React.Fragment>
 )
}

export default VisitData;