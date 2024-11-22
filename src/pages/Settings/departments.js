import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader,ModalFooter,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,Table
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { SketchPicker } from 'react-color';
import { findVisitors,CreateVisitor,editVisitors } from '../../helpers/api_helper';

const Departments = (props) => {

    const [formData, setFormData] = useState({
        floor: '',
        name: '',
        color: '',    
      });

      const [alertMessage, setAlertMessage] = useState('');
      const [alertType, setAlertType] = useState('');
    const [department, setDepartment] = useState(null)
    const [departmentData,setDepartmentData] = useState([]); 
    const [visible, setVisible] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [color, setColor] = useState("#fff");
    const [color2, setColor2] = useState("#fff");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [displayColorPicker2, setDisplayColorPicker2] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 100;
  


     const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleColorChange2 = (color2) => {
    setColor2(color2.hex);
  };

  const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const toggleColorPicker2 = () => {
    setDisplayColorPicker2(!displayColorPicker2);
  };
    const toggle2 = () => setModal2(!modal2);
    // const onPageChange = (page) => {
    //   setCurrentPage(page);
    //   console.log(`Current Page: ${page}`);
    //   findVisitors(`/visits?page=${page}`).then(data => {
    //     setUserVisits(data)})
    //   // Fetch new data based on the current page if necessary
    // };
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.defaultValue ? e.target.defaultValue: e.target.value
        });
      };

      const handleChange2 = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value === ''? e.target.defaultValue: e.target.value
        });
      };

    const onCodeSearch = (e) => {
        e.preventDefault();
        
      
        // console.log(formData)
        formData.color = color
        CreateVisitor(`/departments`,formData).then(response =>
        {//console.log(response)
          if(!response.error){
            // console.log(response)
            setAlertMessage(`Success! Department created`);
        setAlertType('success');
            
        setTimeout(() => {
            setVisible(false);
          }, 3000);
        
            findVisitors(`/departments`).then(data => {setDepartmentData(data)})

          }else{
            setAlertMessage(`Error: ${response?.data?.message || 'Something went wrong'}`);
        setAlertType('danger');
          }
        }
        )
       
        
      }

      const onEdit = (e) => {
        e.preventDefault();
        
        // console.log(e.target)
        formData.color = color2 === '#fff' ? formData.color: color2
        if(formData.color === '' && department.color ===''){
          formData.color=color2
        }
        if(formData.color === '' && department.color !==''){
          formData.color=department.color
        }
        formData.floor = formData.floor === '' ? department?.floor: formData.floor
        formData.name = formData.name === '' ? department?.name: formData.name
        // console.log(formData)
        editVisitors(`/departments?name=${department.name}`,formData).then(response =>
         {//console.log(response)
          if(!response.error){
            // console.log(response)
            setAlertMessage(`Success! Department created`);
        setAlertType('success');
            
        setTimeout(() => {
            setVisible(false);
          }, 3000);
        
            findVisitors(`/departments`).then(data => {setDepartmentData(data)})

          }else{
            setAlertMessage(`Error: ${response?.data?.message || 'Something went wrong'}`);
        setAlertType('danger');
          }
        }
        )
       
        
      }  

      useEffect(() => {
    
        
          findVisitors(`/departments`).then(data => {setDepartmentData(data)})

        
      }, []);
      


 return (
    <React.Fragment>
        {alertMessage && visible ? (
        <Alert color={alertType} className="mt-3">
          {alertMessage}
        </Alert>
      ): null}
        <Container fluid className='d-flex justify-content-space-between  w-100'>
        
                        <Row className='w-75 mt-0'>

                        <Row className='w-100 p-4'>
                {/* <>{console.log(userVisits)}</> */}
                <Table className='w-100' striped>
                  <thead>
                    <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Deparment Name
                    </th>
                    <th>
                      Color
                    </th>
                    <th>
                      Floor
                    </th>
                    <th>
                      Edit
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.length ? departmentData.map((department,id) => (
                      
                      <tr>
                          <th scope="row">
                            {id+1}
                          </th> 
                          <td>
                           {department?.name} 
                          </td>
                          <td>
                          {department?.color}
                          </td>
                          <td>
                            {department?.floor}
                          </td>
                          <td>
                            <Button  className='w-100' style={{backgroundColor:"#d63229",borderColor:"#d63229", color:'white'}} onClick={()=>{
                        
                        setDepartment(department)
                        // setEditData(users)
                        toggle2()
                      }}><i class="uil-pen"></i></Button>
                          </td>
                          
                      </tr>
                    )):<div>
                    No Visits Found
                    </div>}
                  </tbody>
              
                </Table>
      

              </Row>

                        </Row>
                        <Row  style={{width:"35%",marginLeft:'30px', marginTop:'20px'}}>
                        <Form onSubmit={onCodeSearch} className=' text-left p-2'>
                            <h4 style={{margin:'auto',textAlign:"center"}}>CREATE </h4>
                          {/* {department && department ? (
                              
                              <Alert color="success">
                                Department Created Successfully
                              </Alert>
                              
                            ) :  null} */}

                      
                            

                
                              <FormGroup >
                                <Label for="name">Name</Label>
                                <Input
                                  
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="enter department name"
                                  //value={formData.name}
                                onChange={handleChange}
                                />
                              </FormGroup>

                              {/* <FormGroup>
                                <Label for="color">Color</Label>
                                <Input
                                  type="text"
                                  name="color"
                                  id="color"
                                  placeholder="enter department color"
                                  // value={formData.color}
                                  onChange={handleChange}
                                />
                              </FormGroup> */}

                              <FormGroup>
                                    <Label for="colorPicker">Choose a Color</Label>
                                    
                                      <Input
                                        value={color}
                                        style={{
                                          backgroundColor: color,
                                          border: '1px solid #ccc',
                                          padding: '5px 20px',
                                          cursor: 'pointer',
                                        }}
                                        onClick={toggleColorPicker}
                                      />
                                        {color}
                                      
                                   
                                    {displayColorPicker && (
                                      <SketchPicker color={color} onChangeComplete={handleColorChange} />
                                    )}
                                  </FormGroup>

                              <FormGroup>
                                <Label for="floor">Floor</Label>
                                <Input
                                  type="number"
                                  name="floor"
                                  id="floor"
                                  placeholder="enter floor number"
                                  //value={formData.floor}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" style={{backgroundColor:"#d63229",borderColor:"#d63229", color:'white'}} className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </Row>

                        <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader className='' toggle={toggle2}>Edit Deparment</ModalHeader> 
        <ModalBody>
          {/* <h3 className='mb-3' style={{"textAlign":"center"}}>Edit Department</h3> */}

          
          <Form onSubmit={onEdit} className=' text-left p-2'>
                          {/* {department && department ? (
                              
                              <Alert color="success">
                                Department Created Successfully
                              </Alert>
                              
                            ) :  null} */}

                      
                            

                
                              <FormGroup >
                                <Label for="name">Name</Label>
                                <Input
                                  
                                  type="text"
                                  name="name"
                                  id="name"
                                  // placeholder={department?.name}//"enter department name"
                                  defaultValue={department?.name}
                                 onChange={handleChange2}
                                />
                              </FormGroup>

                              {/* <FormGroup>
                                <Label for="color">Color</Label>
                                <Input
                                  type="text"
                                  name="color"
                                  id="color"
                                  placeholder="enter department color"
                                  defaultValue={department?.color}
                                  onChange={handleChange}
                                />
                              </FormGroup> */}

<FormGroup>
                                    <Label for="colorPicker">Choose a Color</Label>
                                    
                                      <Input
                                        value={department?.color2}
                                        style={{
                                          backgroundColor: color2 !== '#fff' ? color2 :department?.color,
                                          border: '1px solid #ccc',
                                          padding: '5px 20px',
                                          cursor: 'pointer',
                                        }}
                                        onClick={toggleColorPicker2}
                                      />
                                    
                                      
                                   
                                    {displayColorPicker2 && (
                                      <SketchPicker color={color2} onChangeComplete={handleColorChange2} />
                                    )}
                                  </FormGroup>

                              <FormGroup>
                                <Label for="floor">Floor</Label>
                                <Input
                                  type="number"
                                  name="floor"
                                  id="floor"
                                  placeholder="enter floor number"
                                  defaultValue={department?.floor}
                                  onChange={handleChange2}
                                />
                              </FormGroup>

                              <Button type="submit" style={{backgroundColor:"#d63229",borderColor:"#d63229", color:'white'}} className='w-100'
                              onClick={()=>{ toggle2()
                                //  window.location.reload()
                                      }}
                              >
                                Submit
                              </Button>
                          </Form>
          
        </ModalBody>
        <ModalFooter className='d-flex align-items-center justify-content-center'>

          
          
          {/* <Button   style={{backgroundColor:"#d63229", color:'white'}} onClick={()=>{
            
            
            toggle2()
            window.location.reload()
            }}>
            Close
          </Button> */}

          

            
        </ModalFooter>
      </Modal>                 
        </Container>
    </React.Fragment>
 )
}

export default Departments;