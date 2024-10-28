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



const ReceptionPage = props => {

    document.title=" Profile | Minible - Responsive Bootstrap 5 Admin Dashboard"
  
  
    const dispatch = useDispatch();
    const [vistData,setVisitData] = useState([]);
    const [state, setState] = useState(true);
    
  //  const visitors = async()=>{return await  findVisitors('/visitors')};

    // getProfile('/visitors').then(data => setVisitData(data))
    // console.log(vistData)
   
    useEffect(() => {
    //   document.body.className = "authentication-bg";
      // remove classname when component will unmount
      return function cleanup() {
        document.body.className = "";
      };
    });
    
    // const selectForgotPasswordState = (state) => state.ForgetPassword;
    //   const ForgotPasswordProperties = createSelector(
    //     selectForgotPasswordState,
    //       (forgetPassword) => ({
    //         forgetError: forgetPassword.forgetError,
    //         forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
    //       })
    //   );
  
    //   const {
    //     forgetError,
    //     forgetSuccessMsg
    // } = useSelector(ForgotPasswordProperties);   
    
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Acme Corp',
      phone: '+123456789',
      email: 'john.doe@example.com',
      profilePicture: 'https://via.placeholder.com/150',
    };
  
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