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

import logo from "../../assets/images/firs_logo.png"
import logolight from "../../assets/images/logo-light.png"

const user = JSON.parse(localStorage.getItem("user"));


const ReceptionPage = props => {

    document.title=" Profile | Minible - Responsive Bootstrap 5 Admin Dashboard"
  
  
    const dispatch = useDispatch();
    const [vistData,setVisitData] = useState([]);
    const [state, setState] = useState(true);
    
  //  const visitors = async()=>{return await  findVisitors('/visitors')};

    // getProfile('/visitors').then(data => setVisitData(data))
    // console.log(vistData)
   
    useEffect(() => {
   
      return function cleanup() {
        document.body.className = "";
      };
    });
    
    
    return (
      <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Profile" />
          <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody className="text-center">
              {/* Profile Picture */}
              <img
                src={user.profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-circle"
                width="150"
                height="150"
              />
              <CardTitle tag="h4" className="mt-3">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardText>
                <strong>Company:</strong> {user.companyName}
              </CardText>
              <CardText>
                <strong>Phone:</strong> {user.phone}
              </CardText>
              <CardText>
                <strong>Email:</strong> {user.email}
              </CardText>
            </CardBody>
          </Card>
        </Col>
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