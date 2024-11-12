import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Table,Container,Card, CardBody, CardTitle, CardText,Row,Col, CardImg} from "reactstrap";
import { getProfile } from '../../helpers/api_helper';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import  withRouter from "../../components/Common/withRouter"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Departments from './departments';
import Roles from './roles';
import logo from "../../assets/images/firs_logo.png"
import logolight from "../../assets/images/logo-light.png"

const user = JSON.parse(localStorage.getItem("user"));


const ReceptionPage = props => {

    document.title=" Settings"
  
    const[department,SetDepartment] = useState(true)
    // const[permission, SetPermission] = useState(false)
    const[role, SetRole] = useState(false)
    // const dispatch = useDispatch();
    // const [vistData,setVisitData] = useState([]);
    // const [state, setState] = useState(true);
    
  //  const visitors = async()=>{return await  findVisitors('/visitors')};

    // getProfile('/visitors').then(data => setVisitData(data))
    // console.log(vistData)

    const views = (val)=>{
        console.log(val)
        if(val === 'dept'){
            SetDepartment(true)
            SetRole(false)
            console.log(department)
        }else{
            SetDepartment(false)
            SetRole(true)
            console.log(department)
        }

    }
   
    useEffect(() => {
   
      return function cleanup() {
        document.body.className = "";
      };
    },[department]);
    
    
    return (
      <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Settings" />
          <Row className='d-flex w-100'>
            <div className='' style={{width:"20%",borderTop:"1px solid black",padding:"3px"}}>
                <ul className="waves-effect list-unstyled" style={{fontSize:'larger'}} >
                <li className='mb-2' onClick={()=>{views('dept')}}>
                <i className="uil-home-alt "></i>
                
                <span>Mange Departments</span>
                </li>
                <li className='mb-2' onClick={()=>{views('role')}}>
                <i className="uil-home-alt"></i>
                
                <span>Mange Roles</span>
                </li>
                </ul>
            </div>
            {department ? 
            <div className='d-flex flex-column align-items-center justify-content-center' style={{width:"70%",marginLeft:"5px"}}>
                <Departments/>
            </div>
            : role ?<div className='d-flex flex-column align-items-center justify-content-center' style={{width:"70%",marginLeft:"5px"}}>
            <Roles/>
        </div>:null}
        
        </Row>

          
        </Container>
        
       
          
        
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