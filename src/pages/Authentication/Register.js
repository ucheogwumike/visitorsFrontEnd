import PropTypes from "prop-types"
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions"

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";


// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import {useNavigate} from "react-router-dom"
import { CreateVisitor } from '../../helpers/api_helper';


const Register = props => {
  let userObject = null
  document.title=" Register | Minible - Responsive Bootstrap 5 Admin Dashboard"
  const navigate = useNavigate()
  const [user, setUser] = useState(userObject);
  const [failed, setFailed] = useState('')

  const dispatch = useDispatch();
 

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
      password: '',
      confirm_password: '',
      address: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstName: Yup.string().required("Please Enter Your first name"),
        lastName: Yup.string().required("Please Enter Your first name"),
        phone:Yup.string().required("Please Enter Your phone number"),
        company: Yup.string().required("Please Enter Your company name"),
        // middleName:Yup.string().notRequired(),
      password: Yup.string().required("Please Enter Your Password"),
      confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      values.status = true
      // dispatch(registerUser(values));
      CreateVisitor('/auth/register/visitor',values).then(response => {
        if(!response.error){
          // userObject = response.data.authUser
          // setUser(userObject)

         
          
          window.scrollTo(0,0)
          setTimeout(()=>{
            // console.log(user)
            navigate("/visitors")
          },3000)
        }
      }).catch(
        error => {
          setFailed(error.message)
        }
      )
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


  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(registerUser(values));
  // }

  useEffect(() => {
    dispatch(apiError(""));
    document.body.className = "authentication-bg";
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
                    <h5 className="text-primary">Register Account</h5>
                    <p className="text-muted">Get your free Minible account now.</p>
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
                      <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                     

                      <div className="mt-3 text-end">

                      <div className="mb-3">
                      <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirm_password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirm_password || ""}
                          invalid={
                            validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                          }
                        />
                        {validation.touched.confirm_password && validation.errors.confirm_password ? (
                          <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                        ) : null}
                      </div>
                        <button
                          className="btn btn-primary w-sm waves-effect waves-light w-100"
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
                <p>© {new Date().getFullYear()} Minible. Crafted with <i
                    className="mdi mdi-heart text-danger"></i> by Themesbrand
                        </p>
              </div>
            </Col>
          </Row>
          </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Register);

Register.propTypes = {
  registerUser: PropTypes.func,
  // registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}



