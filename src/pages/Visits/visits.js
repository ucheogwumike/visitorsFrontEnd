import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,Table,
  Modal,ModalBody,ModalFooter,Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';
import { CreateVisitor,editVisitors } from '../../helpers/api_helper';
import html2canvas from 'html2canvas';
import * as Yup from "yup";
import { useFormik } from "formik";
import { set } from 'lodash';
import logo from "../../assets/images/firs_logo.png"
import VisitData from './visitProfile';
import CustomPagination from '../Home/CustomPagination';
const user = JSON.parse(localStorage.getItem("user"));

// const [check, setCheck] = useState(JSON.parse(localStorage.getItem("user")))



 

const Visits = () => {

    // if(user){
    //     console.log(JSON.parse(user))
    // }

  const [formData, setFormData] = useState({
    floor: '',
    room: '',
    department: '',
    signInTime: '',
    dateOfVisit: '',
    code: '',
    visitorEmail: ''
    
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;

  const onPageChange = (page) => {
    setCurrentPage(page);
    // console.log(`Current Page: ${page}`);
    findVisitors(`/visits?page=${page}`).then(data => {
      setUserVisits(data)})
    // Fetch new data based on the current page if necessary
  };

  let visitObject = null

  const [visit, setVisit] = useState(visitObject);
  const [displayForm, setDisplayForm] = useState(false);
  const [passData, setPassData] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [editaData, setEditData] = useState(null)
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  let location = useLocation()
  const imageurl = useRef()
//   const { user } = location.state

  

  // State to hold dynamic roles for the select input
  const [roles, setRoles] = useState([]);
  const [departmentData,setDepartmentData] = useState([]);
  const [userVisits,setUserVisits] = useState([]);
  const [failed, setFailed] = useState('')
  const [dept, setDepartment] = useState('')
  const [flr, setFlr] = useState('')
  const [rom, setRom] = useState('')
  const [existVisit,setExistVisit] = useState(null)
  const [mail, setMail] = useState(false)

  


  const handleChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    let obj = {...formData}
    obj.type = 'visitor'
    obj.visitorEmail = user.email
    obj.status = 'pre-booked'
    obj.departmentName = obj.department
    CreateVisitor('/visits',obj).then(response => {
      if(!response.error){
        // console.log(response)
      }
    })
   
    
  }

  const updateVisit = async (obj) => {
    if(obj.signIn){
      editaData.signIn = obj.signIn
    }
    if(obj.signOut){
      editaData.signOut = obj.signOut
    }
    if(obj.status){
      editaData.status = obj.status
    }
    if(obj.reschedule){
      editaData.status = obj.reschedule
    }
    
    await editVisitors('/visits',editaData).then(response => {
      if(!response.error){



        findVisitors(`visits`).then(data => {
          // console.log(data)
          setUserVisits(data)})
  
      }
    })
  }


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      visitDate: '',
    },
    validationSchema: Yup.object({
        visitDate: Yup.date().required()
    }),
    onSubmit: async (values) => {
      values.status = true
      // console.log(values)
      // dispatch(registerUser(values));
        const {visitDate} = values
      await editVisitors('/visits/date',{date:visitDate,code:editaData.code}).then(response => {
        if(!response.error){
          // userObject = response.data.visitor
          // setUser(userObject)
          // console.log(response);
          findVisitors(`visits`).then(data => {
            // console.log(data)
            setUserVisits(data)})
          
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




  const onCodeSearch = (e) => {
    e.preventDefault();
    
  
    // console.log(formData)
    findVisitors(`/visits/one?code=${formData.code}`).then(response =>
    {//console.log(response)
      if(!response.error){
        //console.log(response)
        setEditData(response)
        toggle()
      }
    }
    )
   
    
  }

  useEffect(() => {
    // Simulating API call or fetching dynamic data
  setExistVisit(null)
    // findVisitors('/departments').then(data => setDepartmentData(data))
  
    if(user.role?.name === 'admin'){
      findVisitors(`visits`).then(data => {
        // console.log(data)
        setUserVisits(data)})

    }else{
      findVisitors(`visits/visits?email=${user.email}&type=admin`).then(data => {
        //console.log(data)
        setUserVisits(data)})
    }
    
    
    

    
  }, []);

  return (
    <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Visits" />
          </Container>

          <Container className="mt-3">
          <Row>
        
        {user.role?.name === 'admin' ? 
        <>
        
        <div className="mt-0">
              <Row>
                <Col className="mb-4">
                
                <div className='d-flex w-100 justify-content-center'>
     

                      <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                      <p className='font-bold' style={{"fontSize":"20px",fontWeight:700, color:"#d63229"}}>FIND VISIT BY CODE</p>
                        <div>
                        <Form onSubmit={onCodeSearch} className=' text-left'>
                          {visit && visit ? (
                              
                              <Alert color="success">
                                Visit Created Successfully
                              </Alert>
                              
                            ) :  null}

                      
                            

                
                              <FormGroup>
                                <Label for="code">Code</Label>
                                <Input
                                  type="text"
                                  name="code"
                                  id="code"
                                  placeholder="Enter Visit Code"
                                  value={formData.code}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" style={{backgroundColor:"#d63229",borderColor:"#d63229", color:'white'}} className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </div>
                      </div>  


                  </div> 

                </Col>
              </Row>
            
              <Row className='mt-4 style={{backgroundColor:"#d63229", }} p-4'>
                {/* <>{console.log(userVisits)}</> */}
                <Table striped>
                  <thead>
                    <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Visitor Name
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
                    <th>
                      View
                    </th>
                    <th>
                      Reschedule     
                    </th>

                    </tr>
                  </thead>
                  <tbody>
                    {userVisits.length ? userVisits.map((users,id) => (
                      
                      <tr>
                        {/* {console.log(users)} */}
                          <th scope="row">
                            {id+1}
                          </th> 
                          <td>
                           {users?.visitor[0]?.firstName} {users?.visitor[0]?.lastName}
                          </td>
                          <td>
                          {users.code}
                          </td>
                          <td>
                            {users.dateOfVisit.split('T')[0]}
                          </td>
                          <td>
                            {users.signIn}
                          </td>
                          <td>
                            {users.signOut}
                          </td>
                          <td>
                            {users.status}
                          </td>
                          <td>
                            {users?.department[0]?.name}
                          </td>
                          <td>
                            <Button  style={{backgroundColor:"#d63229", borderColor:"#d63229", color:'white'}}  className='w-100' onClick={()=>{
                        // console.log(users)
                        setEditData(users)
                        toggle()
                      }}>...</Button>
                          </td>
                          <td>
                            <Button onClick={()=>{
                        // console.log(users)
                        setEditData(users)
                        toggle2()
                      }}>
                        <i className="uil-calender"></i>
                            </Button>
                          </td>
                      </tr>
                    )):<div>
                    No Visits Found
                    </div>}
                  </tbody>
              
                </Table>
                <CustomPagination 
        totalItems={totalItems} 
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}/>

              </Row>
            </div>
        </>           
        : null }
        
       
        

       
      </Row>
      
   
    </Container>
    </div>    
    <Modal isOpen={modal} toggle={toggle}>
        {/* <ModalHeader className='bg-primary' toggle={toggle}>Edit Visitor</ModalHeader> */}
        <ModalBody>
          <h3 className='mb-3' style={{"textAlign":"center"}}> VISIT</h3>
          
          <VisitData data={editaData}/>
        </ModalBody>
        <ModalFooter className='d-flex align-items-center justify-content-center'>

          {!editaData?.signIn && <Button onClick={()=>{
              // console.log(editaData)
              updateVisit({signIn: new Date().toTimeString().split(' ')[0]})
          }}>
              Sign In
            </Button>}
          
          <Button   color="primary" onClick={()=>{
            
            
            toggle()
            //window.location.reload()
            }}>
            Continue
          </Button>

          {/* {editaData?.status === 'pre-booked'  && <Button color="danger" onClick={()=>{
              console.log(editaData)
              updateVisit({status: 'cancelled'})
          }}>
              Cancel
            </Button>} */}

            {(editaData?.status === 'ongoing' || editaData?.status === 'pre-booked')  && <Button color="danger" onClick={()=>{
              // console.log(editaData)
              updateVisit({signOut: new Date().toTimeString().split(' ')[0],status: 'completed' })
          }}>
              Sign Out
            </Button>}

            
        </ModalFooter>
      </Modal>  


      <Modal isOpen={modal2} toggle={toggle2}>
        {/* <ModalHeader className='bg-primary' toggle={toggle}>Edit Visitor</ModalHeader> */}
        <ModalBody>
          <h3 className='mb-3' style={{"textAlign":"center"}}> Reschedule</h3>

          <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text">Select Date</h5>
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
                     {/* {user && user ? (
                      
                        <Alert color="success">
                          <>{console.log(user)}</>
                          Register User Successfully
                        </Alert>
                        
                      ) : null}

                      {failed && failed ? (
                        <Alert color="danger">{failed}</Alert>
                      ) : null} */}

                      

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

                      

                        <button
                          className="btn  w-sm waves-effect waves-light w-100"
                          style={{backgroundColor:"#d63229", borderColor:"#d63229", color:'white'}}
                          type="submit"
                          onClick={()=>{
            
            
                            toggle2()
                            //window.location.reload()
                            }}
                        >
                          Reschedule
                        </button>
                      </div>

                      

                    </Form>

                  </div>
                  </CardBody>
              </Card>
          
          
        </ModalBody>
        {/* <ModalFooter className='d-flex align-items-center justify-content-center'>

          
          
          <Button   color="primary" onClick={()=>{
            
            
            toggle2()
            //window.location.reload()
            }}>
            Continue
          </Button>

          

            
        </ModalFooter> */}
      </Modal> 
    </React.Fragment>
  );
};

export default Visits;
