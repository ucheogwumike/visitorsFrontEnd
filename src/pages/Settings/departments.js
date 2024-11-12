import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader,ModalFooter,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,Table
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
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
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 100;
  

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

    const onCodeSearch = (e) => {
        e.preventDefault();
        
      
        console.log(formData)
        CreateVisitor(`/departments`,formData).then(response =>
        {console.log(response)
          if(!response.error){
            console.log(response)
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
        
        console.log(1)
        console.log(formData)
        editVisitors(`/departments?name=${department.name}`,formData).then(response =>
        {console.log(response)
          if(!response.error){
            console.log(response)
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
        <Container fluid className=''>
        <Row className='w-50' style={{margin:'auto'}}>
                        <Form onSubmit={onCodeSearch} className=' text-left p-2'>
                            <h3 style={{margin:'auto',textAlign:"center"}}>CREATE DEPARTMENT</h3>
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
                                  value={formData.name}
                                 onChange={handleChange}
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="color">Color</Label>
                                <Input
                                  type="text"
                                  name="color"
                                  id="color"
                                  placeholder="enter department color"
                                  value={formData.color}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="floor">Floor</Label>
                                <Input
                                  type="number"
                                  name="floor"
                                  id="floor"
                                  placeholder="enter floor number"
                                  value={formData.floor}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </Row>
                        <Row>
                        <Row className='mt-4 w-100 p-4'>
                {/* <>{console.log(userVisits)}</> */}
                <Table striped>
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
                        {console.log(department)}
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
                            <Button color="primary" className='w-100' onClick={()=>{
                        
                        setDepartment(department)
                        // setEditData(users)
                        toggle2()
                      }}>Edit</Button>
                          </td>
                          
                      </tr>
                    )):<div>
                    No Visits Found
                    </div>}
                  </tbody>
              
                </Table>
      

              </Row>

                        </Row>

                        <Modal isOpen={modal2} toggle={toggle2}>
        {/* <ModalHeader className='bg-primary' toggle={toggle}>Edit Visitor</ModalHeader> */}
        <ModalBody>
          <h3 className='mb-3' style={{"textAlign":"center"}}>Edit Department</h3>

          
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
                                  placeholder="enter department name"
                                  defaultValue={department?.name}
                                 onChange={handleChange}
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="color">Color</Label>
                                <Input
                                  type="text"
                                  name="color"
                                  id="color"
                                  placeholder="enter department color"
                                  defaultValue={department?.color}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="floor">Floor</Label>
                                <Input
                                  type="number"
                                  name="floor"
                                  id="floor"
                                  placeholder="enter floor number"
                                  defaultValue={department?.floor}
                                  onChange={handleChange}
                                />
                              </FormGroup>

                              <Button type="submit" color="primary" className='w-100'>
                                Submit
                              </Button>
                          </Form>
          
        </ModalBody>
        <ModalFooter className='d-flex align-items-center justify-content-center'>

          
          
          <Button   color="primary" onClick={()=>{
            
            
            toggle2()
            window.location.reload()
            }}>
            Close
          </Button>

          

            
        </ModalFooter>
      </Modal>                 
        </Container>
    </React.Fragment>
 )
}

export default Departments;