import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,
     Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';
import { CreateVisitor } from '../../helpers/api_helper';
import html2canvas from 'html2canvas';
import * as Yup from "yup";
import { useFormik } from "formik";
import { set } from 'lodash';

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

  // const [formData, setFormData] = useState({
  //   floor: '',
  //   room: '',
  //   department: '',
  //   signInTime: '',
    
  // });

  let visitObject = null

  const [visit, setVisit] = useState(visitObject);
  const [displayForm, setDisplayForm] = useState(false);
  const [passData, setPassData] = useState('');


  const location = useLocation()
  const imageurl = useRef()
//   const { user } = location.state

  

  // State to hold dynamic roles for the select input
  const [roles, setRoles] = useState([]);
  const [departmentData,setDepartmentData] = useState([]);
  const [userVisits,setUserVisits] = useState([]);
  const [dept, setDepartment] = useState('')
  const [flr, setFlr] = useState('')
  const [rom, setRom] = useState('')
  const [existVisit,setExistVisit] = useState(null)
  const [vdate, setVdate] = useState('')

  

  const exportAsImage = async (el, imageFileName) => {
    // console.log(1,el)
    const canvas = await html2canvas(document.getElementById('problem'),{scale:1})
     const imgData = await canvas.toDataURL('/image/png');
    //.then((canvas)=>{
       await setPassData(imgData);
       console.log(visit)
       console.log(visit.code)
   return await CreateVisitor('/mail',{picture:visit.code, code:await imgData}).then(response => console.log(response))
    //     const imgData = canvas.toDataURL('image/png');
    //     return imgData
    //     // console.log(imgData)
    //});
    // console.log(canvas)
    // const image = canvas.toDataURL("image/png", 1.0);
    // console.log(image)
    // download the image
    };

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
        
        findVisitors(`/visits/one?code=${values.code}`).then(response => {
          if(!response.error){
            console.log(response)
            // userObject = response.data
            // setUser(userObject)
            setExistVisit(response)
            // window.scrollTo(0,0)
            // setTimeout(()=>{
            //   // console.log(user)
            //   navigate("/visits",{state:response.data})
            // },3000)
          }
        })
       
        // dispatch(registerUser(values));
      }
    });  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    let obj = {...formData,...location.state}
    obj.visitorEmail = obj.email 
    obj.staffEmail = user.email
    obj.departmentName = obj.department
    obj.signIn = formData.signInTime;
    console.log(obj)
    
    // setVdate
    setRom(formData.room)
    setFlr(formData.floor)
    setDepartment(obj.departmentName)

    CreateVisitor('/visits',obj).then(response => {
        if(!response.error){
            console.log(response)
          visitObject = response.data.visit
          setVisit(visitObject)
          
        //   window.scrollTo(0,0)
          setTimeout(()=>{
            setDisplayForm(true)
            // console.log(user)
            // navigate("/visits",{state:response.data.visitor})
          },3000)
        }
      })
    // You can handle form submission (e.g., send data to API)
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
        console.log(response)
      }
    })
   
    
  }

  const onCodeSearch = (e) => {
    e.preventDefault();
    
  

    findVisitors(`/visits/one?code=${formData.code}`).then(response =>
    {
      if(!response.error){
        console.log(response)
      }
    }
    )
   
    
  }

  useEffect(() => {
    // Simulating API call or fetching dynamic data
   
    findVisitors('/departments').then(data => setDepartmentData(data))
  
    if(user.role.name === 'admin'){
      findVisitors(`visits`).then(data => {
        // console.log(data)
        setUserVisits(data)})

    }else{
      findVisitors(`visits/visits?email=${user.email}&type=${user.role.name}`).then(data => {
        console.log(data)
        setUserVisits(data)})
    }
    
    
    

    
  }, []);

  return (
    <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Visits" />
          </Container>

          <Container className="mt-5">
          <Row>
        
        {user.role?.name === 'admin' ? 
        <>
        <div  className="text-center0 d-flex justify-content-space-around p-2 bg-primary" style={{"width":'100%'}}>
            <div id='problem' className="ml-5 text-center0 d-flex justify-content-space-between p-2" style={{"width":'50%'}}>
            <Card   className="text-center d-flex justify-content-center align-items-center " style={{"backgroundColor":"bisque","width":"100%"}}>
            {console.log(existVisit)}
            <img
              src={existVisit && existVisit ? existVisit.visitor[0].profile_picture:location?.state?.profile_picture}
              alt={`user name`}
              className="rounded-circle mt-3"
              width="150"
              height="150"
              style={{ objectFit: 'cover' }}
            />
            <CardBody>
              <CardTitle tag="h4"> {existVisit && existVisit ? `${existVisit.visitor[0].firstName} ${existVisit.visitor[0].lastName} `: `${location?.state?.firstName}  ${location?.state?.lastName}`}</CardTitle>
              
              <CardText>
                <strong>Company:</strong> {location?.state?.company}
              </CardText>
              <CardText>
                <strong>Deparment:</strong> {dept}
              </CardText>
              <CardText>
                <strong>Floor:</strong> {flr}
              </CardText>
              <CardText>
                <strong>Room:</strong> {rom}
              </CardText>
              <CardText>
                <strong>Date:</strong> {new Date().getFullYear()}-{new Date().getMonth()+1}-{new Date().getDate()}
              </CardText>
            </CardBody>
          </Card>
          <div style={{
            "fontSize":"40px",
            "transform": "rotate(90deg)",
            "marginBottom":"auto",
            "marginTop":"auto",
            // "borderBottom":"4px solid black",
            "width":"20%",
            "transform-origin": "left top 0"}}>VISITOR</div>
            </div>
          {!location?.state && <div className='container w-50'>
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
                            validation2.touched.code && validation2.errors.code ? true : false
                          }
                        />
                        {validation2.touched.code && validation2.errors.code ? (
                          <FormFeedback type="invalid">{validation2.errors.code}</FormFeedback>
                        ) : null}
                            
                        
                          
                      </div>

                      <div className="mt-3 text-end">
                        <button
                          className="btn btn-secondary w-sm waves-effect waves-light w-100"
                          type="submit"
                        >
                          find visit
                        </button>
                      </div>  
                     </Form> 
                    </div>}
        {
            !displayForm && !displayForm ? (
                <Form onSubmit={handleSubmit} className='w-50 text-left'>
        {visit && visit ? (
                      
                      <Alert color="success">
                        Visit Created Successfully
                      </Alert>
                      
                    ) :  null}

        {/* Role Select Field - Populating dynamically */}
        <FormGroup>
          <Label for="department">Department</Label>
          <Input
            type="select"
            name="department"
            id="department"
            value={existVisit ? existVisit.department[0].name:formData.department}
            onChange={handleChange}
          >
            <option value="">{existVisit ? existVisit.department[0].name:'select department'}</option>
            
            {/* Dynamically populate options */}
            {departmentData.map((department, index) => (
                
              <option key={index} value={department?.name}>
                {department?.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        {/* Name Field */}
        <FormGroup>
          <Label for="floor">Floor</Label>
          <Input
            type="text"
            name="floor"
            id="floor"
            placeholder="Enter Floor Number"
            value={formData.floor}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Email Field */}
        <FormGroup>
          <Label for="room">Room</Label>
          <Input
            type="text"
            name="room"
            id="room"
            placeholder="Enter Room number"
            value={formData.room}
            onChange={handleChange}
          />
        </FormGroup>

        

        <FormGroup>
          <Label for="signInTime">Sign In</Label>
          <Input
            type="time"
            name="signInTime"
            id="signInTime"
            value={formData.signInTime}
            onChange={handleChange}
            required
          />
        </FormGroup>

        

        {/* Submit Button */}
        <Button type="submit"  className='w-100 text-bg-success'>
          Submit
        </Button>
      </Form>
            ):(
                <Button onClick={async function(e) {
                    
                   await exportAsImage(imageurl.current, "test")
                             
                  }} type="submit" color="success" style={{"width":"25%",height:"100%",margin:"auto","textAlign":"center"}}>
          send email
        </Button>
            )
        }
        </div>
        <div className="mt-4">
              <Row>
                <Col className="mb-4">
                
                <div className='d-flex w-100 justify-content-center'>
                    <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                      <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>BOOK A VISIT</p>
                        <div>
                        <Form onSubmit={onSubmit} className=' text-left'>
                          {visit && visit ? (
                              
                              <Alert color="success">
                                Visit Created Successfully
                              </Alert>
                              
                            ) :  null}

                            <FormGroup>
                                <Label for="visitorEmail">Email</Label>
                                <Input
                                  type="email"
                                  name="visitorEmail"
                                  id="visitorEmail"
                                  placeholder="enter visitor email"
                                  value={formData.visitorEmail}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                      
                            <FormGroup>
                              <Label for="department">Department</Label>
                                <Input
                                  type="select"
                                  name="department"
                                  id="department"
                                  value={formData.department}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Department</option>
                    
                  
                                  {departmentData.map((department, index) => (
                                      
                                    <option key={index} value={department?.name}>
                                      {department?.name}
                                    </option>
                                  ))}
                                </Input>
                            </FormGroup>

                
                              <FormGroup>
                                <Label for="dateOfVisit">Visit Date</Label>
                                <Input
                                  type="date"
                                  name="dateOfVisit"
                                  id="dateOfVisit"
                                  min="2024-10-29"
                                  placeholder="select date of visit"
                                  value={formData.dateOfVisit}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </div>
                      </div>

                      <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                      <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>FIND VISIT BY CODE</p>
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
                                  placeholder="enter visit code"
                                  value={formData.code}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </div>
                      </div>  


                  </div> 

                </Col>
              </Row>
            
              <Row className='mt-4 bg-primary p-4'>
                {/* <>{console.log(userVisits)}</> */}
                {userVisits.length ? userVisits.map((users) => (
                <Col md="4" key={users.id} className="mb-4">
        

                  <Card style={{backgroundColor:users?.department[0].color}}>
                    <CardImg width={'70px'} height={'70px'} top src={users?.picture} alt={users?.type} />
                    <CardBody>
                      <CardTitle tag="h5">{user.firstName} {user.lastName}</CardTitle>
                      <CardText>Visit Date : {users.dateOfVisit}</CardText>
                      <CardText>Visit Code: {users.code}</CardText>
                      <CardText>Visit status: {users.status}</CardText>
                      <Button color="primary" className='w-100'>View Visit</Button>
                    </CardBody>
                  </Card>
                </Col>
                  )):<div>
                    BOOK A VISIT TO SEE VISITS
                    </div>}
              </Row>
            </div>
        </>
        
           
        : user.role?.name === 'staff' ?  
          <div>
              <Row>
                <Col className="mb-4">
                
                <div className='d-flex w-100 justify-content-center'>
                    <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                      <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>BOOK A VISIT</p>
                        <div>
                        <Form onSubmit={onSubmit} className=' text-left'>
                          {visit && visit ? (
                              
                              <Alert color="success">
                                Visit Created Successfully
                              </Alert>
                              
                            ) :  null}

                            <FormGroup>
                                <Label for="visitorEmail">Email</Label>
                                <Input
                                  type="email"
                                  name="visitorEmail"
                                  id="visitorEmail"
                                  placeholder="enter visitor email"
                                  value={formData.visitorEmail}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                      
                            <FormGroup>
                              <Label for="department">Department</Label>
                                <Input
                                  type="select"
                                  name="department"
                                  id="department"
                                  value={formData.department}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Department</option>
                    
                  
                                  {departmentData.map((department, index) => (
                                      
                                    <option key={index} value={department?.name}>
                                      {department?.name}
                                    </option>
                                  ))}
                                </Input>
                            </FormGroup>

                
                              <FormGroup>
                                <Label for="dateOfVisit">Visit Date</Label>
                                <Input
                                  type="date"
                                  name="dateOfVisit"
                                  id="dateOfVisit"
                                  min="2024-10-29"
                                  placeholder="select date of visit"
                                  value={formData.dateOfVisit}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </div>
                      </div>

                      <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                      <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>FIND VISIT BY CODE</p>
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
                                  placeholder="enter visit code"
                                  value={formData.code}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </div>
                      </div>  


                  </div> 

                </Col>
              </Row>
            
              <Row className='mt-4'>
                {/* <>{console.log(userVisits)}</> */}
                {userVisits.length ? userVisits.map((users) => (
                <Col md="4" key={users.id} className="mb-4">
        

                  <Card style={{backgroundColor:users?.department[0].color}}>
                    <CardImg width={'70px'} height={'70px'} top src={users?.picture} alt={users?.type} />
                    <CardBody>
                      <CardTitle tag="h5">{user.firstName} {user.lastName}</CardTitle>
                      <CardText>Visit Date : {users.dateOfVisit}</CardText>
                      <CardText>Visit Code: {users.code}</CardText>
                      <CardText>Visit status: {users.status}</CardText>
                      <Button color="primary" className='w-100'>View Visit</Button>
                    </CardBody>
                  </Card>
                </Col>
                  )):<div>
                    BOOK A VISIT TO SEE VISITS
                    </div>}
              </Row>
            </div> :
         <div>
          <Row>
            <Col className="mb-4">
            
             <div className='d-flex w-100 justify-content-center'>
                <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                  <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>BOOK A VISIT</p>
                    <div>
                    <Form onSubmit={onSubmit} className=' text-left'>
                      {visit && visit ? (
                          
                          <Alert color="success">
                            Visit Created Successfully
                          </Alert>
                          
                        ) :  null}

                  
                        <FormGroup>
                          <Label for="department">Department</Label>
                            <Input
                              type="select"
                              name="department"
                              id="department"
                              value={formData.department}
                              onChange={handleChange}
                            >
                              <option value="">Select Department</option>
                
              
                              {departmentData.map((department, index) => (
                                  
                                <option key={index} value={department?.name}>
                                  {department?.name}
                                </option>
                              ))}
                            </Input>
                        </FormGroup>

            
                          <FormGroup>
                            <Label for="dateOfVisit">Visit Date</Label>
                            <Input
                              type="date"
                              name="dateOfVisit"
                              id="dateOfVisit"
                              min="2024-10-29"
                              placeholder="select date of visit"
                              value={formData.dateOfVisit}
                              onChange={handleChange}
                            />
                          </FormGroup>

                          <Button type="submit" color="primary" className='w-100'>
                            Submit
                          </Button>
                      </Form>
                    </div>
                  </div>

                  <div className='d-flex  justify-content-space-between' style={{flexDirection:'column', width:'40%', margin:'5px'}}>
                  <p className='font-bold text-primary' style={{"fontSize":"20px",fontWeight:700}}>FIND VISIT BY CODE</p>
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
                              placeholder="enter visit code"
                              value={formData.code}
                              onChange={handleChange}
                            />
                          </FormGroup>

                          <Button type="submit" color="primary" className='w-100'>
                            Submit
                          </Button>
                      </Form>
                    </div>
                  </div>  


              </div> 

            </Col>
          </Row>
        
        <Row className='mt-4'>
          {/* <>{console.log(userVisits)}</> */}
      {userVisits.length ? userVisits.map((users) => (
        <Col md="4" key={users.id} className="mb-4">
          <>{console.log(users?.department.color)}</>
          <Card style={{backgroundColor:users?.department[0].color}}>
            <CardImg width={'70px'} height={'70px'} top src={users?.picture} alt={users?.type} />
            <CardBody>
              <CardTitle tag="h5">{user.firstName} {user.lastName}</CardTitle>
              <CardText>Visit Date : {users.dateOfVisit}</CardText>
              <CardText>Visit Code: {users.code}</CardText>
              <CardText>Visit status: {users.status}</CardText>
              <Button color="primary" className='w-100'>View Visit</Button>
            </CardBody>
          </Card>
        </Col>
      )):<div>
        BOOK A VISIT TO SEE VISITS
        </div>}
    </Row>

        </div> }
        

       
      </Row>
      
   
    </Container>
    </div>          
    </React.Fragment>
  );
};

export default Visits;
