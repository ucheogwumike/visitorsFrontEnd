import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';

const VisitData = (props) => {


 return (
    <React.Fragment>
        <Container fluid>
            <div className='d-flex flex-column' style={{textAlign:'center'}}>
                <img src={props.data?.picture} alt='' width={'75%'} style={{margin:'auto'}}/>
                <p>Code: {props.data.code}</p>
                <p>Visit Date: {props.data.dateOfVisit.split('T')[0]}</p>
                <p>Rescheduled: {props.data.rescheduled}</p>
                <p>Sign In Time: {props.data.signIn}</p>
                <p>Sign Out Time: {props.data.signOut}</p>
                <p>Status: {props.data.status}</p>
            </div>
        </Container>
    </React.Fragment>
 )
}

export default VisitData;