import PropTypes from 'prop-types'
import React, { useEffect, useState,useRef, useCallback } from "react"
import Webcam from "react-webcam"
import { Table,Container, Row, Col, CardBody, Card, Alert, Form, Input, 
  FormFeedback, Label,Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom"


// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import  withRouter from "../../components/Common/withRouter"
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { registerUser, apiError } from "../../store/actions"
import { CreateVisitor,findVisitors,editVisitors } from '../../helpers/api_helper';

import logo from "../../assets/images/firs_logo.png"
import logolight from "../../assets/images/logo-light.png"



const CapturePage = props => {

    document.title=" Capture | Minible - Responsive Bootstrap 5 Admin Dashboard"
  
    let userObject = null
  
    const dispatch = useDispatch();
    const [newVisitor,setNewVisitorData] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);
    const [modal, setModal] = useState(false);
    const [first, setFirst] = useState(true);
    const [user, setUser] = useState(userObject);
    const [registrationError,setRegistrationError] = useState(null)
    const navigate = useNavigate()
    const webCamRef = useRef(null);
    
    
    const toggle = () => setModal(!modal);

    const capture = useCallback(() => {
        const imageSrc = webCamRef.current.getScreenshot();
        
        setImgSrc(imageSrc);
        toggle()
    }, [webCamRef]);

    const retake = () => {
      setImgSrc(null);
    };

    // C('/visitors').then(data => setVisitData(data))


    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone:'',
        // password: '',
        company: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        firstName: Yup.string().required("Please Enter Your first name"),
        lastName: Yup.string().required("Please Enter Your first name"),
        phone:Yup.string().required("Please Enter Your phone number"),
        company: Yup.string().required("Please Enter Your company name"),
        middleName:Yup.string()
        // password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (values) => {
        values.profile_picture = imgSrc
        CreateVisitor('/visitors',values).then(response => {
          if(!response.error){
            userObject = response.data.visitor
            setUser(userObject)
            
            window.scrollTo(0,0)
            setTimeout(()=>{
           
              navigate("/bookvisits",{state:response.data.visitor})
            },3000)
          }
        })
       
        // dispatch(registerUser(values));
      }
    });


    const validation2 = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        code: '',
      },
      validationSchema: Yup.object({
        code: Yup.string().required("Please Enter visit code"),
        
        // password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (values) => {
        


        
        findVisitors(`/visits/visitor?code=${values.code}`).then(response => {
          if(!response.error){
           
            // update picture
            userObject = response.data
            setUser(userObject)
            editVisitors(`/visitors/profile`,{email:response.data.visitor.email,picture:imgSrc}).then(
              response2 => {
                if(!response2.error){
                  
                  response2.data.visit = response?.data?.visit
                
                  window.scrollTo(0,0)
            setTimeout(()=>{
              
              navigate("/bookvisits",{state:response2.data})
            },3000)
                }

              } 

      
            )
            
            
          }
        })
       
        // dispatch(registerUser(values));
      }
    });

    // const relocate = () => {
    //   history("/visitors")
    // }

    const videoConstraints = {
        width: 350,
        height: 350,
        deviceId: "default",
        // facingMode: "user"
        facingMode: { exact: "user" }
      };

      // const selectAccountState = (state) => state.Account;
      // const AccountProperties = createSelector(
      //   selectAccountState,
      //     (account) => ({
      //       user: account.user,
      //       registrationError: account.registrationError,
      //       // loading: account.loading,
      //     })
      // );

    //   const {
    //     user,
    //     registrationError,
    //     // loading
    // } = useSelector(AccountProperties);
  
    useEffect(() => {
    //   document.body.className = "authentication-bg";
      // remove classname when component will unmount
      setUser(userObject)

      return function cleanup() {
        document.body.className = "";
      };
    },[userObject]);
    
    
  
    return (
      <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Capture" />

          
        </Container>
          <div className='container w-100 d-flex justify-content-space-around'>
              <div className='container d-flex flex-column justify-content-start align-items-center mb-3' style={{"width":"12.5%"}}>
                  {imgSrc ? (
                    <div className=' d-flex justify-content-center align-items-start ml-2 ' style={{"width":"12.5%"}}>  <img src={imgSrc} alt="webcam" /> </div>
                  
                  ):(<div className=' d-flex justify-content-center align-items-center ml-2' style={{"width":"12.5%"}}>
                    <Webcam   ref={webCamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints}/>
                  </div>) }
                  <div className="w-25  d-flex align-items-center mt-2" style={{"justifyContent":"center"}}>
                  {!imgSrc && (<button className='btn  w-sm waves-effect waves-light' style={{backgroundColor:"#d63229", color:'white'}} onClick={capture}>Capture</button>)}  
                  </div>


            </div>
            <>
            {(imgSrc && !first) ? (<div className='container w-50'>

              <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                     {user && user ? (
                      
                        <Alert color="success">
                          
                          Register User Successfully
                        </Alert>
                        
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                      <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                      <Label className="form-label">Firstname</Label>
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="Enter firstname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName && validation.errors.firstName ? true : false
                          }
                        />
                        {validation.touched.firstName && validation.errors.firstName ? (
                          <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                      <Label className="form-label">Lastname</Label>
                        <Input
                          name="lastName"
                          type="text"
                          placeholder="Enter lastname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName && validation.errors.lastName ? true : false
                          }
                        />
                        {validation.touched.lastName && validation.errors.lastName ? (
                          <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback>
                        ) : null}
                      </div>  

                      <div className="mb-3">
                      <Label className="form-label">MiddleName</Label>
                        <Input
                          name="middleName"
                          type="text"
                          placeholder="Enter lastname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.middleName || ""}
                          invalid={
                            validation.touched.middleName && validation.errors.middleName ? true : false
                          }
                        />
                        {validation.touched.middleName && validation.errors.middleName ? (
                          <FormFeedback type="invalid">{validation.errors.middleName}</FormFeedback>
                        ) : null}
                      </div>  


                      <div className="mb-3">
                      <Label className="form-label">Phone Number</Label>
                        <Input
                          name="phone"
                          type="text"
                          placeholder="Enter Phone Number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone ? true : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                        ) : null}
                      </div>

                       <div className="mb-3">
                      <Label className="form-label">Phone Number</Label>
                        <Input
                          name="phone"
                          type="text"
                          placeholder="Enter Phone Number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone ? true : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                      <Label className="form-label">Company</Label>
                        <Input
                          name="company"
                          type="text"
                          placeholder="Enter Company Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.company || ""}
                          invalid={
                            validation.touched.company && validation.errors.company ? true : false
                          }
                        />
                        {validation.touched.company && validation.errors.company ? (
                          <FormFeedback type="invalid">{validation.errors.company}</FormFeedback>
                        ) : null}
                      </div>

                     
                     

                      <div className="mt-3 text-end">
                        <button
                          className="btn  w-sm waves-effect waves-light w-100"
                          style={{backgroundColor:"#d63229", color:'white'}}
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      

                    </Form>
                </div>):(imgSrc && first) ? (<div className='container w-50'>
                      <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation2.handleSubmit();
                        return false;
                      }}
                    >

                      <div className="mb-3">
                        <Label className="code">visit code</Label>
                          <Input
                            name="code"
                            type="text"
                            placeholder="Enter Visit Code"
                            onChange={validation2.handleChange}
                          onBlur={validation2.handleBlur}
                          value={validation2.values.code || ""}
                          invalid={
                            validation.touched.code && validation.errors.code ? true : false
                          }
                        />
                        {validation.touched.code && validation.errors.code ? (
                          <FormFeedback type="invalid">{validation.errors.code}</FormFeedback>
                        ) : null}
                            
                        
                          
                      </div>

                      <div className="mt-3 text-end">
                        <button
                          className="btn  w-sm waves-effect waves-light w-100"
                          style={{backgroundColor:"#d63229", color:'white'}}
                          type="submit"
                        >
                          Register
                        </button>
                      </div>  
                     </Form> 
                    </div>):null}
            </>
          </div>
    
          
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Select Visitor's Registration type</ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
        {/* <Button color="primary" className='m-2' onClick={()=>{
          toggle()
          }}>
            Recapture
          </Button>{' '} */}
        <Button style={{"margin":"auto", backgroundColor:"#d63229", color:'white'}} className='m-2'  onClick={()=>{
          toggle()
          setFirst(true)
          }}>
            Pre Registered Visitor
          </Button>{' '}
          <Button color="secondary" className='m-2' onClick={()=>{
          toggle()
          setFirst(false)
          }}>
            New Visitor Registration
          </Button>
        </ModalBody>
        </Modal>
        </div>
      
        
        
      </React.Fragment>
     
    )
  }
  
  CapturePage.propTypes = {
    // forgetError: PropTypes.any,
    // forgetSuccessMsg: PropTypes.any,
    history: PropTypes.object,
    // userForgetPassword: PropTypes.func
  }
  
  export default withRouter(CapturePage);