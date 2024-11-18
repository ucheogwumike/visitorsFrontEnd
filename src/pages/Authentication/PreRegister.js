import PropTypes from "prop-types"
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form,
     Input, FormFeedback, Label, Modal,ModalBody,ModalFooter,Button, ModalHeader } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions"
import { findVisitors } from '../../helpers/api_helper';


// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";


// import images
import logo from "../../assets/images/firs_logo.png"
import logolight from "../../assets/images/firs_logo.png"
import {useNavigate} from "react-router-dom"
import { CreateVisitor } from '../../helpers/api_helper';


const PreRegister = props => {
  let userObject = null
  document.title=" Pre Register "
  const navigate = useNavigate()
  const [user, setUser] = useState(userObject);
  const [failed, setFailed] = useState('')
  const [departmentData,setDepartmentData] = useState([]);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const toggle = () => setModal(!modal);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    //   middleName: '',
      phone:'',
        // password: '',
      company: '',
      department: '',
      visitDate: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstName: Yup.string().required("Please Enter Your first name"),
        lastName: Yup.string().required("Please Enter Your first name"),
        phone:Yup.string().required("Please Enter Your phone number"),
        company: Yup.string().required("Please Enter Your company name"),
        department: Yup.string().required(),
        visitDate: Yup.date().required()
        // middleName:Yup.string().notRequired(),
    }),
    onSubmit: async (values) => {
      values.status = true
      console.log(values)
      // dispatch(registerUser(values));
        const {email,status,firstName,lastName,company,phone,department,visitDate} = values
      await CreateVisitor('/visitors/temp',{email,status,firstName,lastName,company,phone}).then(response => {
        if(!response.error){
          userObject = response.data.visitor
          // setUser(userObject)
          console.log(response);

          CreateVisitor('/visits',{departmentName:department,dateOfVisit:visitDate,visitorEmail:userObject.email,type:'visitor'}).then(
            response => {
                toggle()
                console.log(response)}
          ).catch(
            error => {
                window.scrollTo(0,0)
                error?.response?.data?.message ?
              setFailed(error?.response?.data?.message) : setFailed(error.message)
            }
          )
        //   window.scrollTo(0,0)
        //   setTimeout(()=>{
        //     // console.log(user)
        //     navigate("/visitors")
        //   },3000)
        
        }
      }).catch(
        error => {
          setFailed(error.message)
        }
      )

    //   CreateVisitor().then().catch(
    //     error => {
    //       setFailed(error.message)
    //     }
    //   )

    
    }
  });

  const selectAccountState = (state) => state.Account;
    const AccountProperties = createSelector(
      selectAccountState,
        (account) => ({
          user: account.user,
          registrationError: account.registrationError,
          // loading: account.loading,
        })
    );

    const {
      // user,
      registrationError,
      // loading
  } = useSelector(AccountProperties);

  const captilize = (name) =>{
    let splitStr = name.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(registerUser(values));
  // }

  useEffect(() => {
    dispatch(apiError(""));
    document.body.className = "authentication-bg";
    findVisitors('/departments').then(data => setDepartmentData(data))
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/" className="mb-5 d-block auth-logo">
                  <img src={logo} alt="" height="22" className="logo logo-dark" />
                  <img src={logolight} alt="" height="22" className="logo logo-light" />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text">Pre Register A Visit</h5>
                    {/* <p className="text-muted">Get </p> */}
                  </div>
                  <div className="p-2 mt-4">
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
                          <>{console.log(user)}</>
                          Register User Successfully
                        </Alert>
                        
                      ) : null}

                      {failed && failed ? (
                        <Alert color="danger">{failed}</Alert>
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

                      {/* <div className="mb-3">
                      <Label className="form-label">MiddleName</Label>
                        <Input
                          name="middleName"
                          type="text"
                          placeholder="Enter lastname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.MiddleName || ""}
                          invalid={
                            validation.touched.MiddleName && validation.errors.MiddleName ? true : false
                          }
                        />
                        {validation.touched.MiddleName && validation.errors.MiddleName ? (
                          <FormFeedback type="invalid">{validation.errors.MiddleName}</FormFeedback>
                        ) : null}
                      </div>   */}


                    

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

                      <div className="mb-3">
                      
                      <Label for="visitDate">Visit Date</Label>
                            <Input
                              type="date"
                              name="visitDate"
                              id="dateOfVisit"
                              min="2024-10-29"
                              onChange={validation.handleChange}
                              placeholder="select date of visit"
                              value={validation.values.visitDate}
                              
                            />
                        {/* {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null} */}
                      </div>
                     

                      <div className="mt-3 text-end">

                      <div className="mb-3">
                      <Label for="department">Deparment</Label>
                      <Input
                              type="select"
                              name="department"
                              id="department"
                              onChange={validation.handleChange}
                              value={validation.values.department}
                              
                            >
                              <option value="">Select Department</option>
                
              
                              {departmentData.map((department, index) => (
                               
                                <option key={index} value={department?.name}>
                                  {captilize(department?.name)}
                                </option>
                              ))}
                            </Input>
                      </div>

                        <button
                          className="btn  w-sm waves-effect waves-light w-100"
                          style={{backgroundColor:"#d63229", color:'white'}}
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      

                    </Form>

                  </div>
                  </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} 
                        </p>
              </div>
            </Col>
          </Row>
          </Container>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        {/* <ModalHeader className='bg-primary' toggle={toggle}>Edit Visitor</ModalHeader> */}
        <ModalBody>
          <h3 className='mb-3' style={{"textAlign":"center"}}> Congratulations</h3>
          
          <p> You have successfully scheduled a visit please check your email for further instructions </p>
        </ModalBody>
        <ModalFooter>
          
          <Button style={{"margin":"auto", backgroundColor:"#d63229", color:'white'}} onClick={()=>{
            
            toggle()
            window.location.reload()}}>
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default withRouter(PreRegister);

PreRegister.propTypes = {
  registerUser: PropTypes.func,
  // registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}



