import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, CardImg,FormFeedback,
    Button,Card, CardBody, CardTitle, CardText, Row, Col, Alert,Table,Modal,ModalBody,ModalHeader,ModalFooter
     } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { findVisitors,CreateVisitor, editVisitors } from '../../helpers/api_helper';

const Roles = (props) => {

    const [formData, setFormData] = useState({
        name: '',  
      });
    
    const [isCheck, setIscheck] = useState(false)
    const [checkData, setCheckData] = useState({});  
    const [roleperm, setRolePerm] = useState([])
    const [permission, setPermissionData] = useState([])   
    const [department, setDepartment] = useState(null)
    const [departmentData,setDepartmentData] = useState([]); 
    const [modal2, setModal2] = useState(false);
    const [roleName, setRoleName] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 100;
  
    // const onPageChange = (page) => {
    //   setCurrentPage(page);
    //   console.log(`Current Page: ${page}`);
    //   findVisitors(`/visits?page=${page}`).then(data => {
    //     setUserVisits(data)})
    //   // Fetch new data based on the current page if necessary
    // };
    const toggle2 = () => setModal2(!modal2);
    const handleChange = (e) => {
        
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleChangeCheckBox = (e) => {
        
        const { name, checked } = e.target;
        setCheckData({
          ...checkData,
          [name]: checked,
        });
      };

    const onCodeSearch = (e) => {
        e.preventDefault();
        
      
        
        CreateVisitor(`/roles`,formData).then(response =>
        {
          if(!response.error){
            
            
          }
        }
        )
       
        
      }

      const onCodeSearchRole = (e) => {
        e.preventDefault();

        let arr = []
        for(let i =0;i<7;i++){
            if(e.target[i]?.checked){
                arr.push(e.target[i].id)
            }
        }
       
        
    //     console.log()
    // const selectedOptions = Object.keys(checkData).map((key) => {
    //     console.log( checkData[key])
    //     return checkData[key]});
    // //const arr = Object.keys(checkData).filter((check)=>checkData[check] === true);
    // console.log("Selected Options:", selectedOptions);
    
    
      
        // console.log(checkData)
        editVisitors(`/roles/add?name=${roleName}`,{permissions:arr}).then(response =>
        {
          if(!response.error){
            // console.log(response)
            
          }
        }
        )
       
        
      }

      const newPerm = (name)=>{
        findVisitors(`/roles/one?name=${name}`).then(data => {
            let solution = []
            for (const dat of data.permissions) {
               
                solution.push(dat?.name)
            }
            
            setRolePerm(solution)})
      }
    //   findVisitors(`/roles/one?name=${department?.name}`).then(data => {
    //     let solution = []
    //     for (const dat of data.permissions) {
    //         console.log(dat)
    //         solution.push(dat?.name)
    //     }
        
    //     setRolePerm(solution)})

      useEffect(() => {
    
        
          findVisitors(`/roles`).then(data => {setDepartmentData(data)})
          findVisitors('/permissions').then(data => {setPermissionData(data)})     
        
          return ()=>{
            setPermissionData([])
          }
      }, [roleperm]);
      


 return (
    <React.Fragment>
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
                      Role Name
                    </th>
                    <th>
                      Edit
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.length ? departmentData.map((department,id) => (
                      
                      <tr>
                        {/* {console.log(department)} */}
                          <th scope="row">
                            {id+1}
                          </th> 
                          <td>
                           {department?.name} 
                          </td>
                          <td>
                            <Button style={{backgroundColor:"#e3242B", color:'white'}} className='w-50' onClick={()=>{
                        setRoleName(department?.name)
                        newPerm(department?.name)
                        toggle2()
                      }}>Manage permissions</Button>
                          </td>
                          
                      </tr>
                    )):<div>
                    No Roles Found
                    </div>}
                  </tbody>
              
                </Table>
      

              </Row>

                        </Row>
        <Row style={{width:"35%",marginLeft:'30px', marginTop:'20px'}}>
                        <Form onSubmit={onCodeSearch} className=' text-left p-2'>
                            <h4 style={{margin:'auto',textAlign:"center"}}>CREATE</h4>
                          {department && department ? (
                              
                              <Alert color="success">
                                Role Created Successfully
                              </Alert>
                              
                            ) :  null}

                      
                            

                
                              <FormGroup >
                                <Label for="name">Name</Label>
                                <Input
                                  onChange={handleChange}
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="enter role name"
                                  value={formData.code}
                                //   onChange={handleChange}
                                />
                              </FormGroup>

                              

                              

                              <Button type="submit" style={{backgroundColor:"#e3242B", color:'white'}} className='w-100'>
                                Submit
                              </Button>
                          </Form>
                        </Row>
                        
        </Container>
        <Modal isOpen={modal2} toggle={toggle2}>
        {/* <ModalHeader className='bg-primary' toggle={toggle}>Edit Visitor</ModalHeader> */}
        <ModalBody>
          <h3 className='mb-3' style={{"textAlign":"center"}}>Mange Permissions For {roleName}</h3>

          
          <Form onSubmit={onCodeSearchRole} className=' text-left p-2'>
                           
                          {/* {permission && permission ? (
                              
                              <Alert color="success">
                                permission added Successfully
                              </Alert>
                              
                            ) :  null} */}

                      
{permission.length ? permission.map((perm) => (
                    
                      <FormGroup check className='mb-2'>
                        
        <Input
          type="checkbox"
          name={perm.name}
          id={perm.name}
          value={perm.name}
        defaultChecked={roleperm?.includes(perm.name)}
        onClick={handleChangeCheckBox}
          style={{width:"20px",height:"20px",border:"1px solid",marginRight:"3px"}}
        />
        <Label for={perm.name} check >
          {perm.name}
        </Label>
      </FormGroup>
                    )):<div>
                    No permissions Found
                    </div>}

                
                              
                              <Button type="submit" style={{backgroundColor:"#e3242B", color:'white'}} className='w-100'>
                                APPLY
                              </Button>
                          </Form>
          
        </ModalBody>
        <ModalFooter className='d-flex align-items-center justify-content-center'>

          
          
          <Button  style={{backgroundColor:"#e3242B", color:'white'}} onClick={()=>{
            
            
            toggle2()
            //window.location.reload()
            }}>
            Close
          </Button>

          

            
        </ModalFooter>
      </Modal> 
    </React.Fragment>
 )
}

export default Roles;