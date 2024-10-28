import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input,
     Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors } from '../../helpers/api_helper';
import { CreateVisitor } from '../../helpers/api_helper';
import html2canvas from 'html2canvas';
import { set } from 'lodash';

const user = localStorage.getItem("user");

const guest = {
    name: 'John Doe',
    id: 'G12345',
    company: 'Acme Corp',
    visitDate: 'October 18, 2024',
    photo: 'https://via.placeholder.com/150', // Guest's photo URL
  };

const Visits = () => {

    if(user){
        console.log(JSON.parse(user))
    }

  const [formData, setFormData] = useState({
    floor: '',
    room: '',
    department: '',
    signInTime: '',
    
  });

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
  findVisitors('/departments').then(data => setDepartmentData(data))

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

    // const mail = async (passData)=>{
        
    //     CreateVisitor('/mail',{code:visit.code, picture: passData}).then(response => console.log(response))
           
    // }

  // Fetch or set roles dynamically (could be from an API or static array)
  useEffect(() => {
    // Simulating API call or fetching dynamic data
    const fetchedRoles = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
      { value: 'guest', label: 'Guest' }
    ];

    setRoles(fetchedRoles);
  }, []); // Empty dependency array to run the effect once on component mount

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
    obj.staffEmail = 'ucheogwumike@gmail.com'
    obj.departmentName = obj.department
    obj.signIn = formData.signInTime;
    console.log(obj)
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

  return (
    <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="Visits" />
          </Container>

          <Container className="mt-5">
          <Row>
        

        <div  className="text-center0 d-flex justify-content-space-around p-2 bg-danger" style={{"width":'100%'}}>
            <div id='problem' className="text-center0 d-flex justify-content-space-between p-2" style={{"width":'120%'}}>
            <Card   className="text-center d-flex justify-content-center align-items-center " style={{"backgroundColor":"bisque","width":"37.5%"}}>
            {/* Guest Profile Picture */}
            <img
              src={location.state.profile_picture}
              alt={`${guest.name}`}
              className="rounded-circle mt-3"
              width="150"
              height="150"
              style={{ objectFit: 'cover' }}
            />
            <CardBody>
              <CardTitle tag="h4">{location.state.firstName}  {location.state.lastName}</CardTitle>
              
              <CardText>
                <strong>Company:</strong> {location.state.company}
              </CardText>
              <CardText>
                <strong>Deparment:</strong> Taxation
              </CardText>
              <CardText>
                <strong>Floor:</strong> 2nd Floor
              </CardText>
              <CardText>
                <strong>Room:</strong> 206
              </CardText>
              <CardText>
                <strong>Visit Date:</strong> {guest.visitDate}
              </CardText>
            </CardBody>
          </Card>
          <div style={{
            "fontSize":"40px",
            "transform": "rotate(90deg)",
            "marginBottom":"auto",
            "marginTop":"auto",
            "borderBottom":"4px solid black",
            "width":"20%",
            "transform-origin": "left top 0"}}>VISITOR</div>
            </div>
          
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
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            
            {/* Dynamically populate options */}
            {departmentData.map((department, index) => (
                
              <option key={index} value={department.name}>
                {department.name}
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
            placeholder="Enter your email"
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
        <Button type="submit" color="primary" className='w-100'>
          Submit
        </Button>
      </Form>
            ):(
                <Button onClick={async function(e) {
                    
                   await exportAsImage(imageurl.current, "test")
                             
                  }} type="submit" color="primary" style={{"width":"25%",height:"40px",margin:"auto","textAlign":"center"}}>
          Print
        </Button>
            )
        }

        </div>

       
      </Row>
      
   
    </Container>
    </div>          
    </React.Fragment>
  );
};

export default Visits;
