import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Table,Container,Form, FormGroup, Label, Input, Button} from "reactstrap";
import { findVisitors, editVisitors } from '../../helpers/api_helper';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import  withRouter from "../../components/Common/withRouter"
import Breadcrumbs from "../../components/Common/Breadcrumb";

import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"


const user = JSON.parse(localStorage.getItem("user"));


const ReceptionPage = props => {

    document.title=" Reception | Minible - Responsive Bootstrap 5 Admin Dashboard"
  
  
    const dispatch = useDispatch();
    const [vistData,setVisitData] = useState([]);
    
    
  //  const visitors = async()=>{return await  findVisitors('/visitors')};

    // const manage = async () =>{
    //  await editVisitors().then(data => )
    // }

    findVisitors('/visitors').then(data => setVisitData(data))
    // console.log(vistData)
   
    useEffect(() => {
    //   document.body.className = "authentication-bg";
      // remove classname when component will unmount
      return function cleanup() {
        document.body.className = "";
      };
    });

    
  
    return (
      <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="VISITORS" />
          
        </Container>
        <Table striped>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        First Name
      </th>
      <th>
        Last Name
      </th>
      <th>
        Email
      </th>
      <th>
        Phone
      </th>
      <th>
        Status
      </th>
      <th>
        Edit
      </th>
    </tr>
  </thead>
  <tbody>
    {vistData.length ? (
      vistData.map((item,id) => (
        <tr>
        <th scope="row">
        {id+1}
      </th>
      <td>
        {item.firstName}
      </td>
      <td>
        {item.lastName}
      </td>
      <td>
        {item.email}
      </td>
      <td>
        {item.phone}
      </td>
      <td>
        {item.status + ''}
      </td>
      <td>
        
      {/* <Label> */}
        {/* <Input
          type="switch"
          checked={state}
          onClick={() => {
            setState(!state);
          }}
        />
        <span>true</span>
        <span>false</span> */}
      {/* </Label> */}
        
      <Button color='primary'>
        change status
      </Button>
      </td>
        </tr>
      )
        
      ))
    :(<></>)}

    
    
    
    
    

    {/* <tr>
      <th scope="row">
        1
      </th>
      <td>
        Mark
      </td>
      <td>
        Otto
      </td>
      <td>
        @mdo
      </td>
    </tr>
    <tr>
      <th scope="row">
        2
      </th>
      <td>
        Jacob
      </td>
      <td>
        Thornton
      </td>
      <td>
        @fat
      </td>
    </tr>
    <tr>
      <th scope="row">
        3
      </th>
      <td>
        Larry
      </td>
      <td>
        the Bird
      </td>
      <td>
        @twitter
      </td>
    </tr> */}
  </tbody>
        </Table>
        </div>
      
        
        
      </React.Fragment>
     
    )
  }
  
  ReceptionPage.propTypes = {
    // forgetError: PropTypes.any,
    // forgetSuccessMsg: PropTypes.any,
    history: PropTypes.object,
    // userForgetPassword: PropTypes.func
  }
  
  export default withRouter(ReceptionPage);