import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,Table
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';

const VisitHistory = (props) => {

console.log(props.data)
 return (
    <React.Fragment>
        <Container fluid>
            <Table>
            <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Code
      </th>
      <th>
        Visit Date
      </th>
      <th>
        Sign In
      </th>
      <th>
        Sign Out
      </th>
      <th>
        Status
      </th>
      <th>
        Deparment
      </th>
    </tr>
  </thead>
  <tbody>
  {props.data.map((visit,id)=>
  (

<tr>
<th scope="row">
{id+1}
</th>
<td>
{visit.code}
</td>
<td>
{visit.dateOfVisit}
</td>
<td>
{visit.signIn}
</td>
<td>
{visit.signOut}
</td>
<td>

{visit.status + ''}
</td>
<td>
{visit.department[0].name}
</td>
</tr>
))}

  </tbody>

 

            </Table>
            
            
        </Container>
    </React.Fragment>
 )
}

export default VisitHistory;